import { createFileRoute } from "@tanstack/react-router";
import { LandingEnhancements } from "@/components/LandingEnhancements";
import logoSharingAsset from "@/assets/logo-sharing.png.asset.json";

export const Route = createFileRoute("/")({
  component: LandingEnhancements,
  head: () => ({
    meta: [
      { title: "Navega Onco | Cuidado Oncológico Digital e Humanizado" },
      { name: "description", content: "Navegação oncológica, telemonitoramento, educação em saúde e acompanhamento humanizado para pacientes, famílias e instituições." },
      { property: "og:title", content: "Navega Onco | Cuidado Oncológico Digital e Humanizado" },
      { property: "og:description", content: "Tecnologia e cuidado para tornar a jornada oncológica mais organizada, segura e humanizada." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoSharingAsset.url },
    ],
  }),
});
