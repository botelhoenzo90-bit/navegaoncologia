import { createFileRoute } from "@tanstack/react-router";
import { AdminSubmissions } from "@/components/AdminSubmissions";

export const Route = createFileRoute("/admin")({
  component: AdminSubmissions,
  head: () => ({
    meta: [
      { title: "Admin | Formulários Navega Onco" },
      { name: "description", content: "Área administrativa da Navega Onco para consultar e exportar os formulários recebidos pelo site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin | Formulários Navega Onco" },
      { property: "og:description", content: "Painel interno de gestão dos formulários recebidos pela Navega Onco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
