## Context

Claude's diagnosis is inverted: the Lovable canvas is **ahead** of `snaprint.tn` (Vercel is running a stale build). No reconciliation is needed on the Lovable side — you'll trigger the Vercel redeploy yourself. This plan covers only the three new items.

---

## 1. Floating mobile CTA → `#contact`

**New file:** `src/components/FloatingContactCTA.tsx`
- Fixed bottom-right button, mobile only (`md:hidden`), with safe-area bottom inset.
- Anchor to `/#contact` (works from Studio too) with a small pulse dot in Snap Mint, label `Get in touch` / `Nous contacter`.
- Hidden while the contact section is already in view (IntersectionObserver on `#contact`) so it doesn't overlap the form's own submit button.
- Uses existing tokens: `bg-primary text-primary-foreground`, `mono` label style, `rounded-full`, subtle shadow.

**Mount:** Add `<FloatingContactCTA />` inside the `<main>` of `src/routes/index.tsx` and `src/routes/studio.tsx`, just before `<SiteFooter />`.

## 2. Footer social links

**Edit:** `src/components/SiteChrome.tsx` → `SiteFooter`
- Add a third row (or third flex group on desktop) with four icon links: LinkedIn, Instagram, TikTok, Facebook.
- Icons from `lucide-react` (`Linkedin`, `Instagram`, `Facebook`); TikTok isn't in Lucide — use a small inline SVG in `src/components/icons/TikTok.tsx`.
- Placeholder `href="#"` for each with `aria-label` set and `rel="noreferrer" target="_blank"`. Comment above the array: `// TODO: replace with real URLs`.
- Style: `h-9 w-9` icon buttons, border-border, ink-soft → foreground on hover. Match footer's mono/muted aesthetic.

## 3. Monogram placeholder logo redesign

**Edit:** `src/components/PlaceholderLogo.tsx`
- Replace the current bordered rectangle (which reads as "truncated text") with an intentional monogram tile:
  - Square-ish `h-14 w-14` tile with `rounded-lg`, subtle 2-tone: `bg-secondary/60` fill + `border-border`.
  - Monogram centered in Outfit semibold (not `mono`), size `text-[15px]`, tracking normal, color `text-foreground/80`.
  - Add a thin `1px` divider bar under the monogram (`h-px w-6 bg-ink-faint/50 mt-1`) — signals "identity mark" rather than truncated word.
  - Keep 1–3 initials logic. Preserve `aria-label={label}` for a11y.
  - Add an optional `variant?: "grid" | "marquee"` prop so the marquee variant can stay smaller (`h-10 w-10`) if needed.
- Update call sites in `src/routes/index.tsx` (line ~280) and `src/components/LogoMarquee.tsx` — pass `variant="marquee"` inside `LogoMarquee`.

## Out of scope
- Vercel redeploy (you're handling it).
- Real logo SVGs, real social URLs, real client photos — swap when available.
- Any DB / server / SEO changes.

## Files touched
- `src/components/FloatingContactCTA.tsx` (new)
- `src/components/icons/TikTok.tsx` (new)
- `src/components/PlaceholderLogo.tsx`
- `src/components/LogoMarquee.tsx`
- `src/components/SiteChrome.tsx`
- `src/routes/index.tsx`
- `src/routes/studio.tsx`
