Content-only fixes. No layout or structural changes beyond merging two capability cards and the FAQ markup swap required for SEO.

## 1. Footer — Lovable badge

The "Edit with Lovable" badge is injected by the platform on published deployments, not from project source. It can only be hidden via publish settings, which requires a Pro plan. I tried `set_badge_visibility(true)` and the platform rejected it: **"Cannot hide the badge. This requires an editor role on a Pro plan or higher."**

Action: leave a note in chat after applying the other fixes. No code change possible without a plan upgrade. Once upgraded, I can flip the setting in one call.

## 2. Nav — remove EN/FR toggle

`src/components/SiteChrome.tsx`: remove the `<LangToggle />` render and its import. Leave `LangToggle.tsx` and `i18n.tsx` in place (used by content for `t(en, fr)` — removing them would break every page). Language stays at the default `"en"`; users no longer see a switch.  
  
> keep the toggle !

## 3. Work — caption line-clamp

`src/routes/index.tsx`, line 589 (figcaption span): change `line-clamp-1` to `line-clamp-2 sm:line-clamp-1`. Two lines on mobile, one line from `sm` up.

## 4. Capabilities — consolidate to five surfaces

`src/routes/index.tsx`, `Capabilities()` (lines 494–537):

- Update Print & stationery body to: *"Business cards, flyers, letterheads, brochures, stickers — offset and digital, small to large runs."* (FR mirrored.)
- Remove the standalone **Stickers & small signage** card.
- Merge **Event & large format** + **Rollout & signage** into one card:
  - Title: "Event & large format" / "Évènementiel & grand format"
  - Body: "Press walls, roll-ups, banners, LED lightboxes, vehicle wraps, event flags — from single installs to full event kits." (FR mirrored.)
  - Tag: `Live`
- Add **File preparation** as the last (5th) card, visually de-emphasised:
  - Title: "File preparation" / "Préparation fichier"
  - Body: "Vectorisation, bleed setup, color profiling, BAT proofing — free with every production order." (FR mirrored.)
  - Tag: `Support`
  - Apply muted styling: `opacity-70` on the `<li>` + `text-ink-faint` on the tag so it reads as a support function, not a primary surface.
- Section heading: change "Six surfaces. One operator." → "Five surfaces. One operator." (FR: "Cinq surfaces. Un seul opérateur.")

Final order: Print & stationery · Apparel & merch · Customised corporate gifts · Event & large format · File preparation.

Grid stays `md:grid-cols-2` (5 cards = 2/2/1 — last cell renders as full-width row on desktop, single column on mobile — no layout regression).

## 5. Contact — response time line inside form

`src/components/ContactForm.tsx`: the line *"Response within hours · Tunis & banlieue · [hello@snaprint.tn](mailto:hello@snaprint.tn)"* already lives in the form at line ~205. The user wants it **directly below the Send brief button**, before the WhatsApp/footer area.

Current order: Send button + WhatsApp button → response-time line (footer text).
Change: insert a duplicate response-time `<p>` immediately after the button row's closing `</div>`, before the existing footer line. Keep the existing footer line as-is. Both stay on screen — one right under the CTA, one at the bottom as a quiet recap.

Same copy, same `mono text-[10px] uppercase` styling, lighter opacity on the inline one (`text-warm-white/55`) so the footer one stays the visual anchor.

## 6. Meta description — update everywhere

New copy: *"Snaprint absorbs the entire coordination layer for physical branding — one brief, one contact, from validated file to delivered object. Institutionally trusted. Tunis-based."*

Two files:

- `src/routes/index.tsx` line 49 — `meta.description` on the home route.
- `src/routes/__root.tsx` line 80 — sitewide default description (currently the older "two co-founders…" copy).

Also update the `og:description` and `twitter:description` on the home route (currently *"Complex physical branding, executed effortlessly…"*) to the new copy so all three descriptions stay aligned. Leave `og:title` / `twitter:title` untouched.

## 7. FAQ — guarantee DOM rendering for crawlers

Current implementation uses Radix Accordion (`@radix-ui/react-accordion`). Radix wraps `AccordionContent` in a `Presence` component — when an item is closed, the content is **unmounted from the DOM**. Crawlers running with JS disabled (and Bing/Yandex, which often skip JS) see only the questions, not the answers. The FAQPage JSON-LD covers structured-data crawlers, but the visible DOM is not crawler-safe.

Fix: replace the Radix Accordion in `FAQ()` (lines 720–737 of `src/routes/index.tsx`) with native `<details>` / `<summary>` elements. CSS-only, fully in the DOM on first paint, indexable by every crawler. Keeps the same visual treatment:

```text
<details class="group border-b border-border last:border-b-0">
  <summary class="flex items-start gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
    <span class="mono mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-faint">01</span>
    <span class="flex-1 text-[15px] font-medium text-foreground">{question}</span>
    <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
  </summary>
  <div class="pl-12 pr-2 pb-5 text-[14px] leading-relaxed text-ink-soft">{answer}</div>
</details>
```

Wrap the list in the existing rounded card div. Remove the Radix Accordion imports from this file (Accordion stays available for other pages). Visual parity: same padding, same chevron rotation on open, same border-between-items rhythm. No animation on expand (native `<details>` doesn't animate height) — acceptable trade-off for SEO correctness, matches the calm editorial tone.

## Files touched

- `src/components/SiteChrome.tsx` — drop LangToggle render + import.
- `src/components/ContactForm.tsx` — duplicate response-time line under buttons.
- `src/routes/index.tsx` — caption clamp, Capabilities rewrite, meta description, FAQ markup swap.
- `src/routes/__root.tsx` — meta description.

## Out of scope / blocked

- **Lovable badge**: needs Pro plan upgrade before I can hide it. Will flag in chat.
- No layout/grid restructuring beyond what the 5-card consolidation requires (same `md:grid-cols-2`).