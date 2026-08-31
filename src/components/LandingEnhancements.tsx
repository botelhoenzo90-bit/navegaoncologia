import { useEffect } from "react";
import { NavegaLanding } from "@/components/NavegaLanding";
import { ConteudoInstitucional } from "@/components/ConteudoInstitucional";
import { VLibrasWidget } from "@/components/VLibrasWidget";


export function LandingEnhancements() {
  useEffect(() => {
    const arrangePage = () => {
      const root = document.getElementById("main-content");
      if (!root) return;

      // Remove the old standalone clinical-team block so the institutional
      // presentation has one consolidated founders section.
      Array.from(root.querySelectorAll("section")).forEach((section) => {
        const text = section.textContent || "";
        if (text.includes("Corpo Clínico Especializado") || text.includes("Conheça os fundadores")) {
          if (!section.id || section.id !== "fundadores-nova") section.remove();
        }
      });

      const institutional = root.querySelector("#fundadores-nova")?.parentElement;
      const faq = root.querySelector("#faq");
      const contato = root.querySelector("#contato");
      const footer = root.querySelector("footer");

      if (institutional && faq && contato && footer) {
        // Ordem estratégica final: conteúdo institucional, depois FAQ e,
        // por último, a seção de contato antes do rodapé.
        footer.before(institutional);
        footer.before(faq);
        footer.before(contato);
      }

    };

    const timer = window.setTimeout(arrangePage, 0);
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
