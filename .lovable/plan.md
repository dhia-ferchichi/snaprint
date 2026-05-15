## Auto-critique of v1

Reading `Snaprint_Brand_Brief_Step1.md` and `Current_Snaprint_State.txt` against what I shipped:

**1. No dark mode.** I wrote a `:root` palette only. The brief explicitly defines `bg-navy #032241` as a primary surface and lists "Vertical/Horizontal/Compact on Deep Navy" as official logo variations. Dark mode is part of the system, not an extra.

**2. CTA is generic, not Tunisian.** I invented `hello@snaprint.tn`, `Mon–Sat 09:00–18:00`, "Studio, Tunis". The real operational truth from your doc is much sharper:

- Quotes are issued on **Iberis** (Tunisian SaaS), not "within the working day"
- Files exchanged via **WeTransfer + email + WhatsApp**
- Invoicing = 3 PDFs (**devis, facture, bon de livraison**) + **RIB Attijari**
- Delivery = **Peugeot Partner K9**, Oussama drives, Tunis + Grand Tunis
- Two founders, named: **Dhia** (client + files) and **Oussama** (sourcing + delivery)
- No fixed hours — informal, WhatsApp-first

The CTA should look like a real Tunisian B2B handshake, not a SaaS contact card.

**3. I broke the brief's color-usage rule.** Brief §04: 70/20/10, **max 2 accents per composition**, **pink-blend max 1 per layout**. My hero "live queue" card uses amber + mint + blue + purple all at once = 4 accents. And pink-blend (`#F99DD3` — the signature "transformation" overlap) doesn't appear anywhere.

**4. Wordmark is wrong.** Brief §02: the wordmark is a **custom SVG asset**, never reset in Outfit. I typed "snaprint" in Outfit semibold next to the mark. Needs to be the actual wordmark vector from the uploaded SVGs.

**5. Missing Playfair Display.** Brief §05 reserves Playfair Display for landing-page hero moments. I used Outfit for everything. One Playfair line in the hero unlocks the editorial register the brief asks for.

**6. Radius too sharp vs brief.** Brief §06: buttons 8px, cards 12px, pills 999px. I used 2–4px everywhere. Your prompt said "avoid excessive rounded corners" — that aligns with not using 999px pills broadly, but buttons + cards should follow the brief (8 / 12). Sharp ≠ brand.

**7. Trust layer conflates clients with network.** Brief is clear there are two distinct credibility surfaces: **clients** (GIZ, PNUD, Expertise France, Yunus, Deloitte, Knauf, Linedata) and **production network** (Yasmine Press, Vogue Distribution, SBCD, DIGIPRINT, Imagin Print, Horizon Print, Skyflags, Sotuplex, Afkar Enseignes, Ben Ghorbel, Gaaliche, Omnia Textile, Ste Le Tshirt). Showing both, separated, is the actual proof of the orchestration model.

**8. "Why Snaprint" is abstract.** It says "no factory overhead" without the punchline from your doc: **2 founders, 1 vehicle (Peugeot Partner K9), 0 employees, ~12 partners.** Those four numbers *are* the argument.

---

## Plan

### A. Dark mode

- Add a `.dark` token block in `src/styles.css` mirroring the official navy/warm-white inversion from brief §03. In dark: `--background = navy`, `--foreground = warm-white`, `--card` slightly lifted navy, `--border` warm-white at 10% alpha, accents kept identical (they're calibrated for both).
- Add a small theme toggle in the nav (sun/moon, no library — just `document.documentElement.classList.toggle('dark')` + `localStorage`). Default = system preference via `matchMedia`.
- Update `SnaprintLogo.tsx` so the wordmark color follows `currentColor` and the logo's three "snap marks" auto-flip (navy on light, warm-white on dark) — the brief's reversed variation built in.
- Sweep all hardcoded `bg-foreground text-warm-white` sections (Workflow, CTA) so they read correctly in both modes — they should still be a *navy* band in light mode and a *warm-white inversion* band in dark mode (or stay navy in both — to be decided in implementation; default is "stay navy" since both modes already contain a navy surface in the brief).

### B. Ground the CTA in Tunisia

Rewrite the CTA section as an operational handshake card that mirrors how Snaprint actually works:

```
06 / Brief a job

Send the brief.                       ┌─────────────────────────────┐
We quote on Iberis.                   │ Dhia · Client & files        │
                                      │ WhatsApp / Email             │
Devis sous 24h. Production            │ ─────────────────────────── │
sur validation du BAT.                │ Oussama · Sourcing & delivery│
                                      │ WhatsApp / Tunis & banlieue  │
                                      │ ─────────────────────────── │
                                      │ Devis · Facture · BL         │
                                      │ Virement → RIB Attijari      │
                                      └─────────────────────────────┘

[ Démarrer un devis →  ]   [ WhatsApp ]
```

- Two named contact lanes (Dhia / Oussama) instead of a faceless "Studio".
- Mention Iberis, BAT (bon à tirer), BL, RIB Attijari — operational vocabulary every Tunisian B2B client recognises.
- Replace `hello@snaprint.tn` placeholder with `contact@snaprint.tn` + a WhatsApp CTA (number left as `+216 ·· · ·· · ··` placeholder for you to fill).
- Drop the invented "Mon–Sat 09:00–18:00". Replace with **"Réponse sous quelques heures · WhatsApp prioritaire"** which matches the real informal cadence.
- Mix one French line into the headline area — the institutional client base (GIZ, PNUD, Expertise France) operates in French; pure English here is design-coded, not Tunisia-coded.

### C. Fix the brief violations

- **Hero status card:** reduce to **2 accents max** (navy + amber dot for "in flight", navy + mint for "delivered"). Remove the rainbow.
- **Pink-blend signature moment:** use it exactly once — as the "convergence" dot at the centre of the Workflow section (where Routing → QA hands over). That *is* the brief's "transformation moment."
- **Wordmark:** replace the Outfit text with the actual wordmark vector. I'll extract `<g>` containing `snaprint` from `Snaprint_Logos_Variations_RGB.svg` and ship it as a second SVG component, color via `currentColor` so it inherits theme.
- **Radius:** bump buttons to 8px, cards to 12px (brief). Keep section corners square. No 999px pills except for status dots.
- **Add Playfair Display** to the font import. Use it for **one** line in the hero (the second line "Executed effortlessly.") — editorial register, brief-compliant.

### D. Trust layer + Why, grounded

- Split Trust into **two rows** with different visual weight:
  - Row 1 (heavy): **Clients** — GIZ, PNUD, Expertise France, Yunus Social Business, Deloitte, Knauf, Linedata
  - Row 2 (lighter, mono labels): **Production network** — Yasmine Press, Vogue Distribution, SBCD, DIGIPRINT, Imagin Print, Horizon Print, Skyflags, Ste Le Tshirt, Sotuplex, Afkar Enseignes
  - The two rows visually demonstrate the orchestration model.
- **Why Snaprint** opens with a 4-number strip:
  ```
  02 founders   ·   01 vehicle   ·   00 employees   ·   ~12 partners
  ```
  Set in Courier Prime Bold (brief §05 — "operational data layer"). Then the four prose points follow.

### E. Small operational truths to add

- Workflow stage 03 ("Routing") gets a Courier Prime caption: `iberis · wetransfer · whatsapp` — the actual tools.
- Workflow stage 05 ("Delivery"): `Peugeot Partner K9 · Tunis & banlieue`.
- Speed cards get a Courier Prime footnote: `mesuré dès validation du BAT` (replacing my English "from approved file").

### F. Out of scope for this round

- Full bilingual FR/EN/AR toggle (Cairo + Amiri fonts) — flagged but not built. Mentioning so you know it's noted, not forgotten.
- Real WhatsApp number, real email, real RIB — placeholders only; you fill in.
- Logo wordmark grayscale + monochrome variants — only color + auto-theme variant in this round.

---

## Technical section

**Files touched**

- `src/styles.css` — add `.dark { ... }` block, add Playfair Display import, bump `--radius` to 8px, add `--radius-card: 12px`. Keep oklch tokens.
- `src/components/SnaprintLogo.tsx` — extract real wordmark paths from `Snaprint_Logos_Variations_RGB.svg`, accept `theme` prop or default to `currentColor`. Add a `mark="reversed-navy"` variant for dark surfaces.
- `src/components/ThemeToggle.tsx` — new, ~30 lines, no deps. Uses `useEffect` to read `localStorage` + `prefers-color-scheme`, toggles `documentElement` class.
- `src/routes/__root.tsx` — add a tiny inline script in `<head>` that sets the initial `dark` class **before** hydration to avoid flash (FOUC). Pattern: `<script>{"document.documentElement.classList.toggle('dark', ...)"}</script>` in `head().scripts` or as a raw element in `RootShell`.
- `src/routes/index.tsx` — rewrite CTA, Trust, Why sections per above; trim accent count in Hero queue card; add pink convergence dot in Workflow; add Playfair on hero line 2; add operational footnotes.

**Dark mode token sketch**

```css
.dark {
  --background: var(--navy);          /* #032241 */
  --foreground: var(--warm-white);    /* #FFFFF8 */
  --card: oklch(0.27 0.06 254);       /* lifted navy */
  --border: oklch(1 0 0 / 0.10);
  --muted: oklch(0.27 0.06 254);
  --muted-foreground: oklch(0.72 0.03 254);
  --primary: var(--warm-white);
  --primary-foreground: var(--navy);
  --rule: oklch(1 0 0 / 0.08);
  --ink-soft: oklch(0.78 0.02 254);
  --ink-faint: oklch(0.58 0.025 254);
  /* accents unchanged — calibrated for both surfaces */
}
```

**FOUC-safe theme bootstrap (in `RootShell`)**

```tsx
<script
  dangerouslySetInnerHTML={{ __html:
    `try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}`
  }}
/>
```

**No new dependencies.** Motion is already installed; theme toggle is vanilla.

---

## Open questions before I implement

1. **Language register for the CTA** — do you want it bilingual FR/EN as I proposed (mirrors how you actually talk to GIZ/PNUD/Deloitte), or stay English-only on this v1 and defer FR to a proper i18n pass?  
  
> my feedback : For now keep it in English.  

2. **Should the Workflow + CTA bands stay navy in both light and dark modes** (they read as the same brand surface across themes), or **invert in dark mode** (warm-white band on a navy page) for rhythm?  
  
> my feedback : Review the Logo and Brand Colors and rethink this part !  

3. **Real contact details** — should I leave `contact@snaprint.tn` + `+216 ·· ·· ·· ··` as visible placeholders, or ship with no number/email and just the "Démarrer un devis" + "WhatsApp" buttons (no values shown until you provide them)?  
  
> my feedback : well I already bought the domain name ([snaprint.tn](http://snaprint.tn)), I will later buy the emails ([hello@snaprint.tn](mailto:hello@snaprint.tn) and other addresses). My phone is +216 53 233 439.  
Yeah the CTA is to get in touch with us ! (they can do so by email, or by whatsapp)