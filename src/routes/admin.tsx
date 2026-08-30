import { createFileRoute } from "@tanstack/react-router";
import { AdminSubmissions } from "@/components/AdminSubmissions";

export const Route = createFileRoute("/admin")({
  component: AdminSubmissions,
});
