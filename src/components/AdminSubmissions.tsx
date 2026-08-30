import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Eye, RefreshCw, Trash2, Users, Building2, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { readSubmissions, type NavegaSubmission } from "@/components/LandingEnhancements";

const ADMIN_PASSWORD = import.meta.env['VITE_ADMIN_PASSWORD'] || "navega-admin";

export function AdminSubmissions() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<NavegaSubmission[]>([]);
  const [filter, setFilter] = useState<"all" | "patient" | "company">("all");
  const [selected, setSelected] = useState<NavegaSubmission | null>(null);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem("navega_admin") === "1");
    setItems(readSubmissions());
  }, []);

  const filtered = useMemo(() => filter === "all" ? items : items.filter(item => item.type === filter), [items, filter]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("navega_admin", "1");
      setAuthenticated(true);
      setPassword("");
    } else alert("Senha de administração incorreta.");
  };

  const refresh = () => setItems(readSubmissions());
  const remove = (id: string) => {
    if (!confirm("Excluir este formulário? Esta ação não pode ser desfeita.")) return;
    const next = items.filter(item => item.id !== id);
    localStorage.setItem("navega_onco_submissions", JSON.stringify(next));
    setItems(next);
    setSelected(null);
  };
  const clearAll = () => {
    if (!confirm("Excluir TODOS os formulários salvos neste navegador?")) return;
    localStorage.removeItem("navega_onco_submissions");
    setItems([]);
  };
  const exportCsv = () => {
    const rows = filtered.map(item => ({ tipo: item.type === "patient" ? "Paciente/Família" : "Empresa", data: new Date(item.createdAt).toLocaleString("pt-BR"), ...item.data }));
    if (!rows.length) return;
    const headers = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
    const csv = [headers.join(";"), ...rows.map(row => headers.map(h => `"${String((row as Record<string,string>)[h] ?? "").replaceAll('"','""')}"`).join(";"))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "navega-onco-formularios.csv"; a.click(); URL.revokeObjectURL(url);
  };

  if (!authenticated) return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6"><form onSubmit={login} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><LockKeyhole /></div><h1 className="mt-6 text-center text-3xl font-bold">Admin • Navega Onco</h1><p className="mt-2 text-center text-muted-foreground">Acesso aos formulários recebidos.</p><label className="mt-7 block"><span className="mb-2 block font-semibold">Senha</span><input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} className="h-14 w-full rounded-xl border px-4 text-lg outline-none focus:ring-2 focus:ring-primary" /></label><Button className="mt-5 h-14 w-full rounded-xl text-lg">Entrar</Button><p className="mt-4 text-xs text-muted-foreground">Configure VITE_ADMIN_PASSWORD no ambiente de produção. O armazenamento atual é local do navegador.</p><Link to="/" className="mt-5 block text-center text-sm font-semibold text-primary">Voltar ao site</Link></form></main>;

  return <main className="min-h-screen bg-slate-50"><header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-semibold text-primary">NAVEGA ONCO</p><h1 className="text-2xl font-bold">Formulários recebidos</h1></div><div className="flex gap-2"><Button variant="outline" onClick={refresh}><RefreshCw className="mr-2 h-4 w-4"/>Atualizar</Button><Button variant="outline" onClick={exportCsv}><Download className="mr-2 h-4 w-4"/>Exportar CSV</Button><Link to="/"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/>Site</Button></Link></div></div></header><div className="mx-auto max-w-7xl p-5 lg:p-8"><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-muted-foreground">Total</p><p className="mt-2 text-3xl font-bold">{items.length}</p></div><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-muted-foreground">Pacientes/Famílias</p><p className="mt-2 text-3xl font-bold">{items.filter(i=>i.type==="patient").length}</p></div><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-muted-foreground">Empresas</p><p className="mt-2 text-3xl font-bold">{items.filter(i=>i.type==="company").length}</p></div></div><div className="mt-8 flex flex-wrap items-center gap-2"><Button variant={filter==="all"?"default":"outline"} onClick={()=>setFilter("all")}>Todos</Button><Button variant={filter==="patient"?"default":"outline"} onClick={()=>setFilter("patient")}><Users className="mr-2 h-4 w-4"/>Pacientes</Button><Button variant={filter==="company"?"default":"outline"} onClick={()=>setFilter("company")}><Building2 className="mr-2 h-4 w-4"/>Empresas</Button><Button variant="ghost" className="ml-auto text-destructive" onClick={clearAll}>Limpar tudo</Button></div><div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-50 text-sm"><tr><th className="p-4">Tipo</th><th className="p-4">Identificação</th><th className="p-4">Data</th><th className="p-4 text-right">Ações</th></tr></thead><tbody>{filtered.map(item=><tr key={item.id} className="border-t"><td className="p-4"><Badge>{item.type === "patient" ? "Paciente/Família" : "Empresa"}</Badge></td><td className="p-4 font-semibold">{item.type === "patient" ? item.data['nome'] || "Sem nome" : item.data['localizacao'] || "Empresa"}</td><td className="p-4 text-muted-foreground">{new Date(item.createdAt).toLocaleString("pt-BR")}</td><td className="p-4"><div className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={()=>setSelected(item)}><Eye className="mr-2 h-4 w-4"/>Ver</Button><Button size="sm" variant="ghost" className="text-destructive" onClick={()=>remove(item.id)}><Trash2 className="h-4 w-4"/></Button></div></td></tr>)}{!filtered.length&&<tr><td colSpan={4} className="p-12 text-center text-muted-foreground">Nenhum formulário salvo neste navegador.</td></tr>}</tbody></table></div></div></div>{selected&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onMouseDown={()=>setSelected(null)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl" onMouseDown={e=>e.stopPropagation()}><div className="flex items-start justify-between"><div><Badge>{selected.type === "patient" ? "Paciente/Família" : "Empresa"}</Badge><h2 className="mt-3 text-2xl font-bold">Detalhes do formulário</h2><p className="mt-1 text-sm text-muted-foreground">Recebido em {new Date(selected.createdAt).toLocaleString("pt-BR")}</p></div><Button variant="outline" onClick={()=>setSelected(null)}>Fechar</Button></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{Object.entries(selected.data).map(([key,value])=><div key={key} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{key.replaceAll("_"," ")}</p><p className="mt-1 text-lg font-semibold break-words">{value || "—"}</p></div>)}</div></div></div>}</main>;
}
