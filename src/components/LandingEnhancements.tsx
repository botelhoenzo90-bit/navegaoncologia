import { useEffect } from "react";
import { NavegaLanding } from "@/components/NavegaLanding";
import { ConteudoInstitucional } from "@/components/ConteudoInstitucional";

export function LandingEnhancements() {
  useEffect(() => {
    // Remove the old standalone clinical-team block so the institutional
    // presentation has one consolidated founders section below the landing.
    const removeLegacyBlocks = () => {
      const sections = Array.from(document.querySelectorAll("section"));
      sections.forEach((section) => {
        const text = section.textContent || "";
        if (text.includes("Corpo Clínico Especializado") || text.includes("Conheça os fundadores")) {
          if (!section.id || section.id !== "fundadores-nova") section.remove();
        }
      });
    };

    const timer = window.setTimeout(removeLegacyBlocks, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[300] -translate-y-24 rounded-lg bg-slate-950 px-4 py-3 text-white focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <div id="main-content">
        <NavegaLanding />
        <ConteudoInstitucional />
      </div>
    </>
  );
}
