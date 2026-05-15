## Plan — v2 polish pass

Based on your answers, here's what I'll change. No new sections, just refinement.

### 1. Numbers strip — soften the "00 employees" line

Replace the current four-number line with three confident numbers:

```
02 co-founders   ·   ~12 production partners   ·   01 delivery vehicle
```

Drops "00 employees" entirely. Same operational truth, reads as *network strength* instead of *missing headcount*.

### 2. Live queue accents — down to 2

Keep only **amber** (in-flight / production) and **mint** (delivered / done) on the hero status card. Remove the blue and purple dots. Brief-compliant (max 2 accents per composition) and the two remaining colors carry actual operational meaning.

### 3. Pink-blend signature — move to the file→object moment

Move the single pink dot from the Routing→QA handover to **Workflow stage 04 (Production)** — the actual digital→physical transformation moment. One pink mark, used once, on the most meaningful pivot.

### 4. Trust layer — logos only, no names, partners as slider

- **Clients row**: logo strip only (no text labels under). GIZ, PNUD, Expertise France, Yunus, Deloitte, Knauf, Linedata. Placeholder logo marks where I don't have the real SVG — neutral monogram tiles, all in foreground color so they read as a uniform credibility wall.
- **Production network row**: convert to an **auto-scrolling marquee slider** (slow, continuous, pauses on hover). Logos only, no company names. ~12 placeholder marks. Reinforces "network depth" visually without name-dropping vendors.

### 5. CTA — shared inbox, no phone visible, better button copy

- Single contact: `hello@snaprint.tn` shown as the only visible address.
- Phone number `+216 53 233 439` is **wired into the WhatsApp button's `href`** (`https://wa.me/21653233439`) but **not displayed as text** anywhere.
- Primary button: **"Get a quote"** (replaces "Email a brief" / "Démarrer un devis").
- Secondary button: **"WhatsApp"** with the wa.me link.
- Keep the operational vocabulary in the surrounding text (Iberis, BAT, BL, RIB Attijari) — that's the institutional credibility layer.
- Drop the two-named-lanes card (Dhia / Oussama). The handshake is the company, not individual founders.

### 6. Theme toggle — icon only

Replace the text+dot button with a single icon button:
- Sun icon when in dark mode (click → light)
- Moon icon when in light mode (click → dark)
- Same 36px square footprint, border + bg-card, no label text
- Uses `lucide-react` (already in the project) — `Sun` and `Moon` icons

### 7. "Too griddy" — pacing fix

You're right. The current layout is rule-line + grid + rule-line + grid the whole way down. Fix by introducing **breathing sections** between dense ones:

- **Hero** (dense, grid) → keep
- **Trust** (dense logos) → keep, but remove the grid frame around it; let logos sit on open background
- **NEW breathing band** between Trust and Workflow: a single editorial line in Playfair italic, centered, lots of vertical whitespace (~200px padding top/bottom), no rules, no grid. One sentence like *"Coordination over fabrication."* — gives the eye a rest.
- **Workflow** (dense, numbered) → keep, but reduce the internal vertical rules between stages (only one rule, not three)
- **Why / Numbers** (currently dense) → reduce to a calmer composition: numbers on one line, prose below in a single column instead of 4-up grid
- **NEW breathing band** before CTA: empty navy band, just the Snaprint mark centered, ~240px tall
- **CTA** (calm, focused) → simplify to a single centered card, not the split layout

Net effect: dense / open / dense / open / dense / open / focused. Rhythm instead of one continuous grid.

---

## Technical section

**Files touched**

- `src/routes/index.tsx` — bulk of the work:
  - Hero queue card: drop blue + purple dots, keep amber + mint
  - Trust section: remove grid frame on logos; convert partner row to marquee
  - Add new breathing band component (Playfair line, centered)
  - Workflow: move pink dot from stage 03→04 transition to stage 04 itself
  - Why/Numbers: rewrite copy strip, simplify grid to single column
  - Add second breathing band (navy mark) before CTA
  - CTA: single centered card, "Get a quote" + "WhatsApp" buttons, hello@snaprint.tn only, no phone text, wa.me link in href

- `src/components/ThemeToggle.tsx` — replace text+dot with `Sun` / `Moon` icon from lucide-react. Same toggle logic.

- `src/components/LogoMarquee.tsx` — **new**, ~50 lines. Pure CSS marquee (duplicated children + `animation: scroll Xs linear infinite`, pause on hover). No motion lib needed — keeps bundle tight and animation perfectly linear.

- `src/components/PlaceholderLogo.tsx` — **new**, ~30 lines. Renders a neutral monogram tile (1-2 letter initials in a bordered square, foreground color). Used for both client and partner rows until real SVGs are dropped in. Accepts `label` prop (e.g. "GIZ", "PNUD").

- `src/styles.css` — add `@keyframes marquee` and a `.marquee-track` utility class. No token changes.

**No new dependencies.** lucide-react is already installed; marquee is pure CSS.

**Out of scope this round** — flagged for later:
- Real client/partner SVG logos (you'll drop them in when ready; placeholders ship for now)
- Per-section background variation beyond the two new breathing bands
- Mobile-specific marquee speed tuning (default speed will be conservative)

---

Approve and I'll implement.
