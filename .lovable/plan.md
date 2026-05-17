# Final polish — SEO + responsive verification

Three small, scoped jobs. No content rewrites, no new sections.

## 1. SEO metadata

### Root (`src/routes/__root.tsx`)
Currently leaks Lovable defaults (`title: "Lovable App"`, `description: "Lovable Generated Project"`, `twitter:site: @Lovable`, `author: Lovable`). These get inherited by any future route without its own head.

- Replace defaults with Snaprint-appropriate fallbacks (brand title, one-line description, `og:site_name: "Snaprint"`, `og:locale: "en_US"`, `og:locale:alternate: "fr_FR"`, `twitter:card: summary_large_image`, remove `@Lovable`).
- Add a sitewide JSON-LD `Organization` block (name, url `https://snaprint.lovable.app`, areaServed Tunisia, contactPoint, sameAs left empty for now).
- Add favicon link if missing.
- Do NOT add canonical at root (TanStack concatenates `links` — would duplicate on every page).

### Index route (`src/routes/index.tsx`)
- Add `og:url`, `twitter:title`, `twitter:description`, `og:locale`.
- Add canonical link (`https://snaprint.lovable.app/`).
- Add JSON-LD: `Organization` + `FAQPage` derived from the existing FAQ items + `LocalBusiness` (Tunis, B2B printing).
- Keep current title/description text — already strong.

### Studio route (`src/routes/studio.tsx`)
- Add `og:url`, canonical (`/studio`), `twitter:title`/`description`, `og:type: profile`.

### Skip
- `og:image` — no asset exists yet and a placeholder previews worse than none. Note for the user that we can generate one if they want.
- Separate sitemap.xml / robots.txt — out of scope for this pass; flag as a follow-up.

## 2. Mobile fix — speed-tier numbers

`src/routes/index.tsx` line 385: `text-[72px] ... sm:text-[88px]`.

At 390px viewport with three stacked cards, 72px reads as billboard-loud and competes with the section H2. Drop the base size and let it scale up:

```text
text-[56px] sm:text-[72px] md:text-[88px]
```

Keeps the dramatic desktop treatment, calms mobile. No other layout changes needed.

## 3. Responsive + animation re-verification

After edits, screenshot at 390×844 and 1366×800:
- Confirm speed cards now feel balanced on mobile.
- Confirm hero `fadeIn` (mount-based) still fires on first load at both sizes.
- Confirm scroll-based `fade` variants on Trust, Workflow, Speed, Capabilities, Work, Why, FAQ, CTA all fire when scrolled into view.
- Confirm RoutingDiagram 2×2 grid on mobile, full bus line on desktop.
- Confirm BreathingBand still wraps cleanly on mobile.
- Spot-check ContactForm field stacking + tap targets on 390px.

If anything regresses, fix in-place and re-screenshot.

## Out of scope (call out, don't build)
- og:image generation (ask user first).
- sitemap.xml + robots.txt route.
- Real client logos (placeholders still in marquee).

## Files touched
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/studio.tsx`
