// Server-only Supabase admin client for the user's own Supabase project.
// File name matches **/*.server.* so it is blocked from the client bundle.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SNAPRINT_SUPABASE_URL;
  const serviceKey = process.env.SNAPRINT_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase server config missing (SNAPRINT_SUPABASE_URL / SNAPRINT_SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
