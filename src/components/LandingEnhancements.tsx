import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Accessibility, Eye, Minus, Plus } from "lucide-react";
import { NavegaLanding } from "@/components/NavegaLanding";

export type NavegaSubmission = {
  id: string;
  type: "patient" | "company";
  createdAt: string;
  data: Record<string, string>;
};

const STORAGE_KEY = "navega_onco_submissions";

export function saveSubmission(type: NavegaSubmission["type"], data: Record<string, string>) {
  const current: NavegaSubmission[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const next: NavegaSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    createdAt: new Date().toISOString(),
    data,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([next, ...current]));
}

export function readSubmissions(): NavegaSubmission[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function FoundersSection() {
  return <section id="fundadores" className="bg-white py-16 lg:py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mx-auto mb-14 max-w-4xl text-center">
        <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">Nossa história</div>
        <h2 className="text-4xl font-bold md:text-5xl">Conheça os fundadores</h2>
        <p className="mx-auto mt-5 max-w-3xl text-xl leading-relaxed text-muted-foreground">Conheça quem está por trás da Navega Onco, sua trajetória profissional e o propósito que deu origem à plataforma.</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <article className="group flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-slate-50 text-center shadow-xl">
          <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Imagem do fundador da Navega Onco" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
          <div className="relative z-10 -mt-10 flex w-[90%] flex-col items-center rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">Fundador(a)</div>
            <h3 className="text-2xl font-bold">Nome do fundador</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">Espaço para apresentar a formação, trajetória profissional, experiência na área de oncologia e a motivação que levou à criação da Navega Onco.</p>
          </div>
        </article>
        <article className="group flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-slate-50 text-center shadow-xl">
          <div className="aspect-[4/5] w-full overflow-hidden bg-slate-200"><img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" alt="Enfermeiro responsável pelo cuidado da Navega Onco" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
          <div className="relative z-10 -mt-10 flex w-[90%] flex-col items-center rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">Enfermagem</div>
            <h3 className="text-2xl font-bold">Nome do enfermeiro</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">Descrição profissional do enfermeiro, experiência, especialização e como participa do cuidado individualizado e do telemonitoramento da Navega Onco.</p>
          </div>
        </article>
      </div>
    </div>
  </section>;
}

export function LandingEnhancements() {
  const [fontScale, setFontScale] = useState(1);
  const [contrast, setContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [foundersTarget, setFoundersTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;
      const data: Record<string, string> = {};
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input[name], select[name], textarea[name]").forEach((field) => {
        if (field.name) data[field.name] = field.value;
      });
      if (!Object.keys(data).length) return;
      saveSubmission(data.nome ? "patient" : "company", data);
    };
    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--navega-font-scale", String(fontScale));
    document.documentElement.classList.toggle("navega-high-contrast", contrast);
    document.documentElement.classList.toggle("navega-reduced-motion", reducedMotion);
    return () => document.documentElement.classList.remove("navega-high-contrast", "navega-reduced-motion");
  }, [fontScale, contrast, reducedMotion]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const section = Array.from(document.querySelectorAll("section")).find((el) => el.textContent?.includes("Corpo Clínico Especializado"));
      if (!section) return;
      section.setAttribute("aria-hidden", "true");
      section.classList.add("hidden");
      const host = document.createElement("div");
      host.id = "fundadores-host";
      section.parentElement?.insertBefore(host, section);
      setFoundersTarget(host);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <a href="#main-content" className="fixed left-3 top-3 z-[300] -translate-y-24 rounded-lg bg-slate-950 px-4 py-3 text-white focus:translate-y-0">Pular para o conteúdo</a>
    <div id="main-content"><NavegaLanding /></div>
    {foundersTarget && createPortal(<FoundersSection />, foundersTarget)}
    <button onClick={() => setToolsOpen(v => !v)} className="fixed bottom-28 left-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl" aria-label="Abrir ferramentas de acessibilidade"><Accessibility /></button>
    {toolsOpen && <div className="fixed bottom-44 left-5 z-[120] w-72 rounded-2xl border bg-white p-4 shadow-2xl" role="dialog" aria-label="Ferramentas de acessibilidade">
      <div className="mb-3 flex items-center gap-2 font-bold"><Accessibility className="h-5 w-5 text-primary" /> Acessibilidade</div>
      <div className="grid grid-cols-3 gap-2">
        <button className="rounded-lg border p-2" onClick={() => setFontScale(v => Math.min(1.5, +(v + .1).toFixed(1)))}><Plus className="mx-auto"/><span className="text-xs">Aumentar</span></button>
        <button className="rounded-lg border p-2" onClick={() => setFontScale(v => Math.max(1, +(v - .1).toFixed(1)))}><Minus className="mx-auto"/><span className="text-xs">Diminuir</span></button>
        <button className={`rounded-lg border p-2 ${contrast ? "bg-slate-950 text-white" : ""}`} onClick={() => setContrast(v => !v)}><Eye className="mx-auto"/><span className="text-xs">Contraste</span></button>
      </div>
      <button className="mt-2 w-full rounded-lg border p-2 text-left text-sm" onClick={() => setReducedMotion(v => !v)}>Reduzir animações: {reducedMotion ? "ON" : "OFF"}</button>
      <p className="mt-3 text-xs text-muted-foreground">Para vídeos, utilize legendas e, quando disponível, interpretação em Libras.</p>
      <Link to="/admin" className="mt-3 block text-center text-xs font-semibold text-primary underline">Acessar administração</Link>
    </div>}
    <style>{`
      html { font-size: calc(100% * var(--navega-font-scale, 1)); }
      html.navega-high-contrast body { filter: contrast(1.18); }
      html.navega-reduced-motion *, html.navega-reduced-motion *::before, html.navega-reduced-motion *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
    `}</style>
  </>;
}
