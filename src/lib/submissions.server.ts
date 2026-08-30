export function assertAdmin(password: string) {
  const expected = process.env['ADMIN_PASSWORD'];
  if (!expected) throw new Error("Senha administrativa não configurada no servidor.");
  if (password.length !== expected.length) throw new Error("Senha de administração incorreta.");
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) throw new Error("Senha de administração incorreta.");
}

export async function adminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}
