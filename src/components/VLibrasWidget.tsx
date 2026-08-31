import { useEffect, useState } from "react";

/**
 * Tradutor de Libras (VLibras / Governo Federal).
 * O plugin é carregado apenas no navegador, após a hidratação.
 */
export function VLibrasWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const SCRIPT_ID = "vlibras-plugin-script";
    const start = () => {
      const w = window as unknown as { VLibras?: { Widget: new (url: string) => unknown } };
      if (w.VLibras) {
        try {
          new w.VLibras.Widget("https://vlibras.gov.br/app");
        } catch (error) {
          console.error("VLibras", error);
        }
      }
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      start();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = start;
    document.body.appendChild(script);
  }, []);

  if (!mounted) return null;

  return (
    <div vw-="true" className="enabled" vw="true">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
