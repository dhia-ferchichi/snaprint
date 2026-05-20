# New components & sections

Implementing the 5 additions in order. No edits beyond what's listed.

---

## 1. Contact form — success / error states

File: `src/components/ContactForm.tsx`

The form already has a `status` state machine (`idle | submitting | success | error`) and a success block. Two adjustments:

- **Success state**: keep the inline replacement pattern (no redirect/reload), but rewrite the content to match the spec:
  - Small check icon (`Check` from `lucide-react`, stroke-only, sized to match existing mono labels).
  - Heading: "Brief received."
  - Subtext: "We'll come back to you within a few hours. In the meantime: hello@snaprint.tn · WhatsApp" — with `hello@snaprint.tn` as `mailto:` and "WhatsApp" linking to `https://wa.me/21653233439`.
  - Drop the existing "Send another" button (not in spec).
  - FR translation kept via `t()`.
- **Error state**: add an inline error block below the submit button row when `status === "error"`. Form fields stay populated (no reset). Copy: "Something went wrong. Email us directly at hello@snaprint.tn or reach out on WhatsApp." with the two links wired. Use existing `text-snap-amber` mono treatment.
- The simulated submit stays as-is (always resolves to success). Wiring real failure is a later prompt — the `"error"` branch is in place and ready.

---

## 2. Client logos strip — reposition

File: `src/routes/index.tsx`, `Trust()` section (~line 285–337).

Current order inside `Trust`: eyebrow "01 Trusted execution" → clients logos → orchestration diagram → network marquee.

Move the **clients logos block** (lines 298–314, the `Clients · Institutions…` label + `PlaceholderLogo` row) to sit **above** the eyebrow row, so the final order is:

1. Clients logos strip (no eyebrow above it — just the small "Clients · …" mono label)
2. Eyebrow "01 Trusted execution" + tagline
3. Orchestration diagram
4. Network marquee

That places the client logos between the hero (which ends with the stats row in the production queue card) and the "01 Trusted execution" section heading, as requested. No styling changes, just reorder.

---

## 3. 404 route

New file: `src/routes/$.tsx` (TanStack splat route — catches all unmatched paths).

Structure:
- Full-viewport `min-h-screen` dark `bg-navy text-warm-white` section, centered content.
- Top-left: `SnaprintMark` (small, ~h-6) wrapped in `<Link to="/">`.
- Centered column:
  - `404` — display weight, large (`text-[120px] md:text-[180px]`), with a subtle pulse animation: `motion.div` with `animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}`.
  - Heading "Route not found." — same scale as section h2s.
  - Subtext "The page you requested doesn't exist or has moved." — `text-warm-white/65`.
  - Primary button "Return home" → `/` (white-on-navy, matches existing CTA button).
  - Secondary link "Send us a brief →" → `/#contact` (mono text link).
- Bottom: mono muted line `REF · SNP-404 · snaprint.tn`.
- No illustrations, no extra icons. Calm tone.

Route definition uses `createFileRoute("/$")` with `component`. Also set `head()` with `title: "404 — Snaprint"` and a `noindex` robots meta.

The existing root `notFoundComponent` in `__root.tsx` stays — the splat route handles in-app unmatched URLs with the styled page; the root component remains as a final safety net.

---

## 4. Studio — rule above philosophy

File: `src/routes/studio.tsx`, philosophy section (~line 221).

The philosophy section is currently `border-b border-border` (rule below it), preceded by the K9 section which is also `border-b`. So there's already a 1px separator between K9 and philosophy. The spec asks for an explicit thin rule above philosophy — add a single centered `<div className="mx-auto h-px w-16 bg-border" />` inside the philosophy container, above the eyebrow, to give a visible separation cue beyond the section border.

Copy untouched. Alignment (centered) untouched.

---

## 5. Routing diagram — rename one lane

File: `src/components/RoutingDiagram.tsx`, `nodes` array.

Change:
```ts
{ tag: "UV", label: t("Rigid & promo", "Rigide & promo") }
```
to:
```ts
{ tag: "UV", label: t("Corporate gifts", "Cadeaux d'entreprise") }
```

Tag, layout, and all other lanes unchanged.

---

## Files touched

- `src/components/ContactForm.tsx` — success + error states
- `src/routes/index.tsx` — reorder clients block inside `Trust()`
- `src/routes/$.tsx` — new 404 route
- `src/routes/studio.tsx` — rule above philosophy
- `src/components/RoutingDiagram.tsx` — UV lane relabel
