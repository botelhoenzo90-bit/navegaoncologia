import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Eye, RefreshCw, Trash2, Users, Building2, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listSubmissions, deleteSubmission, verifyAdminPassword } from "@/lib/submissions.functions";

type Submission = {
  id: string;
  type: "patient" | "company";
  created_at: string;
  nome: string | null;
  telefone: string | null;
  diagnostico: string | null;
  tempo: string | null;
  suporte: string | null;
  pacientes: string | null;
  localizacao: string | null;
  data: Record<string, string> | null;
};

const LABELS: Record<string, string> = {
  nome: "Nome",
  telefone: "Telefone",
  diagnostico: "Diagnóstico / perfil",
  tempo: "Tempo do diagnóstico",
  suporte: "Suporte familiar",
  pacientes: "Número de pacientes",
  localizacao: "Localização",
};

const FIELDS = ["nome", "telefone", "diagnostico", "tempo", "suporte", "pacientes", "localizacao"] as const;

export function AdminSubmissions() {
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<string | null>(null);
  const [items, setItems] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<"all" | "patient" | "company">("all");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("navega_admin_pw");
    if (stored) setSession(stored);
  }, []);

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const rows = await listSubmissions({ data: { password: pw } });
      setItems(rows as Submission[]);
    } catch {
      setError("Não foi possível carregar os formulários. Verifique a senha e tente novamente.");
      sessionStorage.removeItem("navega_admin_pw");
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (session) void load(session); }, [session, load]);

  const filtered = useMemo(() => filter === "all" ? items : items.filter(i => i.type === filter), [items, filter]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await verifyAdminPassword({ data: { password } });
      sessionStorage.setItem("navega_admin_pw", password);
      setSession(password);
      setPassword("");
    } catch {
      setError("Senha de administração incorreta.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!session || !confirm("Excluir este formulário? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteSubmission({ data: { password: session, id } });
      setItems(prev => prev.filter(i => i.id !== id));
      setSelected(null);
    } catch {
      setError("Não foi possível excluir este formulário.");
    }
  };

  const exportCsv = () => {
    if (!filtered.length) return;
    const headers = ["Tipo", "Data", ...FIELDS.map(f => LABELS[f]!)];
    const rows = filtered.map(item => [
      item.type === "patient" ? "Paciente/Família" : "Empresa",
      new Date(item.created_at).toLocaleString("pt-BR"),
      ...FIELDS.map(f => item[f] ?? item.data?.[f] ?? ""),
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `navega-onco-formularios-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!session) return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <form onSubmit={login} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><LockKeyhole /></div>
        <h1 className="mt-6 text-center text-3xl font-bold">Admin • Navega Onco</h1>
        <p className="mt-2 text-center text-muted-foreground">Acesso aos formulários recebidos.</p>
        <label className="mt-7 block">
          <span className="mb-2 block font-semibold">Senha</span>
          <input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} className="h-14 w-full rounded-xl border px-4 text-lg outline-none focus:ring-2 focus:ring-primary" />
        </label>
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-base font-semibold text-red-600">{error}</p>}
        <Button disabled={loading} className="mt-5 h-14 w-full rounded-xl text-lg">{loading ? "Verificando..." : "Entrar"}</Button>
        <Link to="/" className="mt-5 block text-center text-base font-semibold text-primary">Voltar ao site</Link>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-base font-semibold text-primary">NAVEGA ONCO</p>
            <h1 className="text-2xl font-bold">Formulários recebidos</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={loading} onClick={() => void load(session)}><RefreshCw className="mr-2 h-4 w-4" />Atualizar</Button>
            <Button variant="outline" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Exportar CSV</Button>
            <Link to="/"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Site</Button></Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl p-5 lg:p-8">
        {error && <p className="mb-5 rounded-xl bg-red-50 p-4 font-semibold text-red-600">{error}</p>}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-base text-muted-foreground">Total</p><p className="mt-2 text-3xl font-bold">{items.length}</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-base text-muted-foreground">Pacientes/Famílias</p><p className="mt-2 text-3xl font-bold">{items.filter(i => i.type === "patient").length}</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-base text-muted-foreground">Empresas</p><p className="mt-2 text-3xl font-bold">{items.filter(i => i.type === "company").length}</p></div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>Todos</Button>
          <Button variant={filter === "patient" ? "default" : "outline"} onClick={() => setFilter("patient")}><Users className="mr-2 h-4 w-4" />Pacientes</Button>
          <Button variant={filter === "company" ? "default" : "outline"} onClick={() => setFilter("company")}><Building2 className="mr-2 h-4 w-4" />Empresas</Button>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50 text-base"><tr><th className="p-4">Tipo</th><th className="p-4">Identificação</th><th className="p-4">Telefone</th><th className="p-4">Data</th><th className="p-4 text-right">Ações</th></tr></thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4"><Badge>{item.type === "patient" ? "Paciente/Família" : "Empresa"}</Badge></td>
                    <td className="p-4 font-semibold">{item.nome || item.localizacao || "—"}</td>
                    <td className="p-4">{item.telefone || "—"}</td>
                    <td className="p-4 text-muted-foreground">{new Date(item.created_at).toLocaleString("pt-BR")}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelected(item)}><Eye className="mr-2 h-4 w-4" />Ver</Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => void remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length && <tr><td colSpan={5} className="p-12 text-center text-muted-foreground">{loading ? "Carregando..." : "Nenhum formulário recebido ainda."}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onMouseDown={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl" onMouseDown={e => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge>{selected.type === "patient" ? "Paciente/Família" : "Empresa"}</Badge>
                <h2 className="mt-3 text-2xl font-bold">Detalhes do formulário</h2>
                <p className="mt-1 text-base text-muted-foreground">Recebido em {new Date(selected.created_at).toLocaleString("pt-BR")}</p>
              </div>
              <Button variant="outline" onClick={() => setSelected(null)}>Fechar</Button>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {FIELDS.filter(f => selected[f] || selected.data?.[f]).map(f => (
                <div key={f} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{LABELS[f]}</p>
                  <p className="mt-1 break-words text-lg font-semibold">{selected[f] || selected.data?.[f]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
