## Typography, copy, and FAQ polish

Focused presentation-layer pass. No schema changes needed — `project_type` is free text in the DB (Zod enum is the only constraint).

### 1. Typography hierarchy — labels in Outfit, placeholders in mono

**`src/components/ContactForm.tsx`**
- `labelBase`: drop `mono`, switch to Outfit sans. New value:
  `"mb-2 block text-[12px] font-medium tracking-wide text-warm-white/80"`
- Leave `fieldBase` as-is so placeholders stay Courier Prime.
- Project-type `<select>`: when value is empty, the visible text is the "Select…" placeholder — to render it in mono while keeping the label Outfit, give the empty `<option>` the regular sans and add a small conditional class on the `<select>` itself (`form.type === "" ? "italic font-mono" : ""` won't read right; simplest: keep `fieldBase` mono — already correct — and just rely on the label switch).

**`src/routes/index.tsx` — `Trust()`**
- The "Clients · Institutions · Ecosystem enablers · Corporates" row (lines ~268–277) is currently all mono uppercase. Switch to Outfit:
  - Remove `mono … uppercase tracking-[0.18em]` from the wrapper.
  - New: `"mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-soft"`.
  - Keep the · separators.
- Leave the "Orchestration" and "Production network" eyebrows in mono (they're true labels, not descriptive copy).

### 2. Contact form copy + dropdown rename

**`src/components/ContactForm.tsx`**
- Type union: rename `"print"` → `"stationery"`.
- Dropdown option:
  - value `"stationery"`, label `t("Stationery & Brochures", "Papeterie & brochures")`.
- Label `"Company / Org"` / `"Société / Org"` → `"Company"` / `"Société"`.
- Company placeholder: `t("e.g. GIZ, Deloitte", "ex. GIZ, Deloitte")`.
- Brief min-length error: `t("Brief needs at least 10 characters.", "Minimum 10 caractères.")`.
- Success-state heading: EN → `"Got it. We'll be in touch within hours."` (FR unchanged).
- Delete the duplicate trailing `<p>` ("Response within hours · Tunis & banlieue…") at the very bottom of the form if present (the one with `mt-6`). I'll verify and remove only if a duplicate exists.

**`src/lib/contact.functions.ts`**
- `ProjectType` Zod enum: replace `"print"` with `"stationery"`.

**Database:** no migration. `contact_submissions.project_type` is `text` with only a length check; existing `"print"` rows remain valid and any new submissions will store `"stationery"`. (We can backfill old rows later if needed.)

### 3. FAQ — fix franglais

**`src/routes/index.tsx` — `FAQ()` items array**
- Q1 EN answer: replace `"conforme facture fiscale, devis and bon de livraison"` with `"a compliant tax invoice (facture fiscale), quotation (devis), and delivery note (bon de livraison)"`.
- Q1 FR answer: unchanged (already clean French).
- Q3 EN answer: replace `"virement bancaire to our RIB Attijari, or bank cheque"` with `"bank transfer to our Attijari account (virement bancaire), or bank cheque (chèque bancaire)"`.
- Q3 FR answer: change `"devis and bon de livraison"` → `"devis et bon de livraison"` *(only if that string is present — Q3 FR currently doesn't contain it; will scan and apply wherever the stray `and` appears in FR copy).*

### Out of scope (deferred)
- Client logos section visual rework — waiting on real partner logos from you before redesigning.
- Any DB migration for `project_type` (not needed; column is free text).

### Files touched
- `src/components/ContactForm.tsx`
- `src/lib/contact.functions.ts`
- `src/routes/index.tsx`
