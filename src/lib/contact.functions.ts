import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const ProjectType = z.enum([
  "large-format",
  "wearables",
  "stationery",
  "signage",
  "gift-kits",
  "other",
]);

const ContactInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  type: ProjectType.optional().or(z.literal("")),
  brief: z.string().trim().min(10).max(1500),
  website: z.string().max(200).optional().or(z.literal("")), // honeypot
});

export type ContactInput = z.infer<typeof ContactInput>;

// Host-agnostic: only uses process.env + fetch. Runs unchanged on
// Cloudflare Workers (current host) and Vercel (future), provided the same
// three env vars are set: SNAPRINT_SUPABASE_URL,
// SNAPRINT_SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY.
const RECIPIENT = "snaprint.tn@gmail.com";
// Sender uses the verified snaprint.tn Resend domain. No mailbox required —
// Resend signs outbound mail from the verified domain. reply_to is set per
// submission to the lead's email so Gmail "Reply" goes back to them.
const SENDER = "Snaprint <noreply@snaprint.tn>";

export const submitContactBrief = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    // Honeypot: silently accept and drop.
    if (data.website && data.website.trim().length > 0) {
      return { ok: true as const };
    }

    const userAgent = (getRequestHeader("user-agent") ?? "").slice(0, 500) || null;

    // Database-first: persist the submission. Dynamic import keeps the
    // server-only module out of any client-reachable bundle graph.
    const { getSupabaseAdmin } = await import("./supabase.server");
    const supabase = getSupabaseAdmin();

    const { data: row, error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: data.name.trim(),
        email: data.email.trim(),
        company: data.company?.trim() || null,
        project_type: data.type || null,
        brief: data.brief.trim(),
        user_agent: userAgent,
      })
      .select("id")
      .single();

    if (insertError || !row) {
      console.error("[contact] DB insert failed", {
        code: insertError?.code,
        message: insertError?.message,
        details: insertError?.details,
        hint: insertError?.hint,
      });
      throw new Error("Could not save your brief. Please try again or use WhatsApp.");
    }

    // Email is best-effort. Failure here does not break submission.
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[contact] RESEND_API_KEY missing; skipping email notification.");
      return { ok: true as const, emailQueued: false };
    }

    const subjectCompany = data.company?.trim() || data.name.trim();
    const subject = `New brief — ${subjectCompany} · Snaprint`;
    const text = [
      `New brief from the Snaprint website`,
      `--------------------------------------`,
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Company: ${data.company || "—"}`,
      `Type:    ${data.type || "—"}`,
      ``,
      `Brief:`,
      data.brief,
      ``,
      `--`,
      `Submission ID: ${row.id}`,
      `User-Agent:    ${userAgent || "—"}`,
    ].join("\n");

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: SENDER,
          to: [RECIPIENT],
          reply_to: data.email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[contact] Resend error:", res.status, body);
        return { ok: true as const, emailQueued: false };
      }

      // Mark notified. RLS is bypassed by service_role.
      await supabase
        .from("contact_submissions")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", row.id);

      return { ok: true as const, emailQueued: true };
    } catch (err) {
      console.error("[contact] Resend request failed:", err);
      return { ok: true as const, emailQueued: false };
    }
  });
