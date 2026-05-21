// Supabase Edge Function: send-brief-notification
// Deploy with: supabase functions deploy send-brief-notification --no-verify-jwt
// Set secret:  supabase secrets set RESEND_API_KEY=...

// deno-lint-ignore-file no-explicit-any
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface BriefPayload {
  name: string;
  email: string;
  company?: string | null;
  project_type?: string | null;
  brief: string;
  created_at?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  let data: BriefPayload;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (data.name ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const company = (data.company ?? "").toString().trim();
  const projectType = (data.project_type ?? "").toString().trim();
  const brief = (data.brief ?? "").toString().trim();
  const submittedAt = data.created_at ?? new Date().toISOString();

  if (!name || !email || !brief) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const subjectWho = company || name;
  const subject = `New brief — ${subjectWho} · Snaprint`;

  const text = [
    "New brief received via snaprint.tn",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Project type: ${projectType || "—"}`,
    "",
    "Brief:",
    brief,
    "",
    `Submitted: ${submittedAt}`,
  ].join("\n");

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Snaprint <noreply@snaprint.tn>",
      to: ["hello@snaprint.tn"],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    return new Response(
      JSON.stringify({ error: "Resend send failed", detail: errText }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const result = await resendRes.json().catch(() => ({} as any));
  return new Response(JSON.stringify({ ok: true, id: result?.id ?? null }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
