import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const listInput = z.object({ password: z.string().min(1).max(200) });
const deleteInput = z.object({ password: z.string().min(1).max(200), id: z.string().uuid() });

export const listSubmissions = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => listInput.parse(data))
  .handler(async ({ data }) => {
    const { assertAdmin, adminClient } = await import("./submissions.server");
    assertAdmin(data.password);
    const supabase = await adminClient();
    const { data: rows, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => deleteInput.parse(data))
  .handler(async ({ data }) => {
    const { assertAdmin, adminClient } = await import("./submissions.server");
    assertAdmin(data.password);
    const supabase = await adminClient();
    const { error } = await supabase.from("form_submissions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => listInput.parse(data))
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./submissions.server");
    assertAdmin(data.password);
    return { ok: true };
  });
