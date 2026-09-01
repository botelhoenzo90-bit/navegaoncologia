import { useState } from "react";
import { Ear, MessageCircle } from "lucide-react";

/**
 * Barra fixa de acessibilidade no topo do site.
 * - Ativa o tradutor de Libras (VLibras)
 * - Atalho para atendimento por texto (WhatsApp) para pessoas surdas
 */
export function AccessibilityBar() {
  const [librasActive, setLibrasActive] = useState(false);

  const openLibras = () => {
    const accessButton = document.querySelector<HTMLElement>(
      "[vw-access-button]"
    );
    accessButton?.click();
    setLibrasActive(true);
  };

  return (
    <header
      role="region"
      aria-label="Barra de acessibilidade"
      className="fixed inset-x-0 top-0 z-[400] bg-primary text-primary-foreground shadow-sm"
    >
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-2 px-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Ear className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Acessibilidade para pessoas surdas</span>
          <span className="sm:hidden">Acessibilidade</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openLibras}
            aria-label="Ativar tradutor de Libras"
            aria-pressed={librasActive}
            className="rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/25"
          >
            Libras
          </button>
          <a
            href="https://wa.me/5500000000000?text=Olá!%20Preciso%20de%20atendimento%20por%20texto."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atendimento por texto no WhatsApp"
            className="flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/25"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Atendimento por texto</span>
            <span className="sm:hidden">Texto</span>
          </a>
        </div>
      </div>
    </header>
  );
}
