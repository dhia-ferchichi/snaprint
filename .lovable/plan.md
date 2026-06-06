## 1. Site hygiene (code edits)

**Contact email truth pass** (`src/components/ContactForm.tsx`)
- Replace both occurrences of `hello@snaprint.tn` with `snaprint.tn@gmail.com` (EN + FR strings, success state + form footer).
- Remove the duplicate footer `<p>` (lines ~258 and ~265 currently render the same line twice).

**Canonical flip to snaprint.tn** (Okara recommendation — accepted)
- `src/routes/__root.tsx`: change Organization JSON-LD `url` from `https://snaprint.lovable.app` → `https://snaprint.tn`. Also de-duplicate `name="description"` (currently declared twice — lines 78 and 95 conflict; keep one canonical copy aligned with the leaf description).
- `src/routes/index.tsx`: `SITE_URL` constant → `https://snaprint.tn`. Tighten meta description to ≤155 chars.
- `src/routes/studio.tsx`: swap all 4 `snaprint.lovable.app` strings → `snaprint.tn`.
- `src/routes/sitemap[.]xml.ts`: `BASE_URL` → `https://snaprint.tn`.
- `public/llms.txt`: sharpen one-liner to Okara's framing ("One brief. Five surfaces. One delivery.") and add the five surfaces inline.

**Hero copy refresh** (`src/routes/index.tsx`)
- Hero headline EN/FR → "One brief. Five surfaces. One delivery." / "Un brief. Cinq surfaces. Une livraison."
- Add compact "Five surfaces" strip in Services intro: Print · Large format · Wearables · Signage · Gift kits.

**Wordmark "p" cutoff fix** (`src/components/SnaprintLogo.tsx`)
- `SnaprintWordmarkSVG` viewBox is `-1010 180 900 170`. The `p` glyph descender extends to y≈384, well past 350. Expand viewBox height to fit the descender (e.g. `-1010 180 900 215`) and verify the `i` dot top (y=182) is still inside. No path changes.

## 2. Standalone brand artifacts (no repo changes)

Generate three files into `/mnt/documents/` for the user to drop into Obsidian:
- `BRAND.md` — philosophy, positioning (Okara "orchestration layer" one-liner), tone, five surfaces, ICP tiers, proof points, priority word: **trustworthy**.
- `DESIGN.md` — 3-color core palette (Deep Navy `#032241`, Warm White `#FFFFF8`, Electric Blue `#1049D5`) + restrained accents already in code (`snap-mint`, `snap-amber`, etc.), Outfit + Courier Prime + Playfair Display typography stack, spacing rhythm, logo grid + clear-space rule (derived from the V-mark), border/radius scale matching `src/styles.css`.
- `TOKENS.json` — machine-readable colors, fonts, spacing, radius.

Deliver via `<presentation-artifact>` tags. **Not** added to the repo (Master Archive Phase 0 keeps brand docs in Obsidian, not in the landing-page repo).

## 3. Project memory

- `mem://brand/positioning` — core claim, one-liner, five surfaces, ICP, priority word (trustworthy), proof points.
- `mem://strategy/2026-guardrails` — data-collection year; no premature platform complexity; brand docs live in Obsidian, not in this repo; landing page stays single-purpose.
- Update `mem://index.md` Core with: "Landing page priority word: trustworthy. Hero: One brief. Five surfaces. One delivery."

## What is NOT in scope

- No `BRAND.md`/`DESIGN.md`/`TOKENS.json` committed to repo.
- No `src/styles.css` palette expansion, no new components/routes.
- No backend/contact form logic changes (email recipient in `contact.functions.ts` is already `snaprint.tn@gmail.com`; only the UI footer string is stale).
- Vercel/custom-domain deploy is unchanged; canonical flip is metadata only.

## Files touched

Edit: `src/components/ContactForm.tsx`, `src/components/SnaprintLogo.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/studio.tsx`, `src/routes/sitemap[.]xml.ts`, `public/llms.txt`, `mem://index.md`.
Create: `mem://brand/positioning`, `mem://strategy/2026-guardrails`, `/mnt/documents/BRAND.md`, `/mnt/documents/DESIGN.md`, `/mnt/documents/TOKENS.json`.
