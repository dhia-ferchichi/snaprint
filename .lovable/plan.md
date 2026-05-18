# Snaprint — content & UX revisions (v2)

Incorporates your strategic feedback. Same scope, sharper language. No section additions.

## Guiding edits from your review

- **Ground the abstraction.** "Execution layer" stays as a frame but always lands with a concrete sentence next to it.
- **Stop saying "network."** Cut explicit mentions by ~30% across the homepage. Let routing diagram, partner marquee, and workflow *show* it.
- **Operational > polished.** Trim strategy-deck tone. Keep human, Tunis-grounded texture.
- **Rename categories around customer intent, not supplier vocabulary.**

---

## 1. Hero copy

`src/routes/index.tsx` hero paragraph. Two sentences: the frame, then the grounded reality.

EN:
> Snaprint is the execution layer between your brand and its physical output. From a 100-card urgent run to a full event rollout, we coordinate the production chain — so you deal with one operator instead of five vendors.

FR mirror. No "network," no partner count.

## 2. BreathingBand

Keep "Coordination over fabrication." Replace the italic line.

EN:
> *Brands and agencies bring the vision. We make it land — files, partners, QA, delivery.*

FR mirror.

## 3. Workflow subtitle

EN:
> A single track from brief to delivery. You validate the design — we take it from there: file prep, partner routing, QA and shipping all run on our side.

FR mirror.

## 4. BAT stamp trigger on mobile

Stage 04 currently animates as soon as the card enters the viewport. On mobile (stacked), the stamp pops before the user reads the stage label.

Change stage 04 wrapper to `viewport={{ once: true, amount: 0.6 }}` with a short delay so the stamp lands when the card is roughly centered. Desktop behavior unchanged (cards are side-by-side and the centering check naturally fires earlier).

## 5. Capabilities — rebuild around customer intent

`Capabilities` component. Six tiles, renamed per your feedback:

| Tile | Covers |
|---|---|
| Print & stationery | Business cards, flyers, brochures, letterheads, notebooks, badges, lanyards. |
| Stickers & small signage | Vinyl stickers, plaques, small adhesives. |
| Apparel & merch | T-shirts, polos, tote bags, caps — team kits, launch packs, event apparel (50–200 pcs). DTF, screen print, embroidery. |
| Customised corporate gifts | Mugs, gourdes, notebooks, tech kits, keychains, bottles. Sourced from catalogue, customised via UV, engraving, sublimation. |
| Event & large format | Roll-ups, press walls, banners, event flags, on-site setup. |
| Rollout & signage | LED lightboxes, vehicle wraps, large-format runs 500+, press walls at scale. |

Section H2 stays "Six surfaces. One operator." Sub-line under the H2 becomes:
> File prep, BAT proofing and QA are included — across every category.

(No "network" word in this section.)

## 6. Speed tiers

`Speed` component re-aligned to the new categories.

- **24H — Paper & small-format.** Business cards, flyers, letterheads, stickers.
- **48H — Apparel & customised gifts (medium runs).** DTF t-shirts, tote bags, polos, mugs / notebooks / UV gifts (50–200 pcs).
- **72H — Rollout, signage & high-volume runs (500+).** Press walls, roll-ups, LED lightboxes, vehicle wrap, event branding, large print runs.

Header subtitle unchanged ("Measured from validated BAT & confirmed PO.").

## 7. CTA + FAQ payment line

CTA paragraph: "Payment by virement (RIB Attijari) or bank cheque." FR mirror.

FAQ payment answer: promote chèque to a standard option, not just "small orders." Keep virement primary.

## 8. Studio page rewrite

`src/routes/studio.tsx`.

### Story (expand to two paragraphs, keep warmth)

Paragraph 1 unchanged opening:
> Snaprint started in 2024 with a simple observation: institutional clients in Tunis were being asked to coordinate five vendors for a single event. We took that coordination off their plate.

Paragraph 2 (new — explains the asset-light choice without using "network"):
> We chose not to own presses. Owning machinery means defending its utilisation rate; coordinating specialists means picking the right one for each job. The first model serves the shop. The second serves the client — and pays partners fairly for the work they actually do best.

FR mirror.

### Founders — accurate, operationally framed, no credential signaling

Drop the entrepreneurship-program biography. Lead with what they do; let the work speak.

**Dhia Ferchichi — Co-founder.**
> File preparation, production briefs, invoicing, and the long-tail client relationship. First email, last invoice, thank-you note. → `linkedin.com/in/dhiaferchichi`

**Oussama Mhimdi — Co-founder.**
> Production floor: partner relationships, price negotiation, payment scheduling, on-batch QA and last-mile delivery in the K9. Main touchpoint for several recurring clients. → `linkedin.com/in/oussamamhimdi`

Above the two cards, one shared line:
> Briefs and quotes are shared. The rest splits naturally.

FR mirror.

Photo slot: a single landscape placeholder block sized for the founders + K9 image you'll send.

### Vehicle section — unchanged copy

The K9 section is the right place for the namedrop. Copy stays.

### Philosophy — keep copy, simplify layout

Collapse the two-column layout into a single centered statement with one quiet supporting line beneath, vertical rhythm matching `BreathingBand`. Same words as today.

## 9. Top clients (Trust section)

From your 2023–2025 invoice exports, top 15 by revenue:

Fondation Tunisie Pour Le Développement · Institut des Statistiques de l'Union Africaine · Association Open Tunisia · Yunus Social Business Tunisia · Expertise France · Westerwelle Foundation · Deloitte Conseil Tunisie · GIZ (consolidated) · Enactus Tunisie · GOMYCODE · Tunisian Startups · KNAUF · Forum de Carthage · Columbia Global Centers Tunis · Our Digital Future.

Wire these names into the `Trust` placeholder array now (so the wall reads correctly). Swap to real logos when you send them.

For the partner marquee: confirm the 12 names you want public; placeholders stay until you do.

## 10. Recent work gallery

Per your reply you'll send real Snaprint photos. **Format ask:** 4:3 landscape or square, **1200×900 px min**, JPG sRGB, ≤500 KB each. Until then I'll swap the three off-topic Unsplash IDs (X-logo phone, empty office, laptop+tablet) for on-topic ones so the page stops visibly missing.

## 11. Mobile hero eyebrow

Shorten the prefix on small screens: `00` only below `sm`, full `00 / Snaprint` from `sm` up. Label "Operational branding · Tunis" stays.

## What we are *not* adding

- More "network" mentions anywhere on the homepage. (Trust diagram + partner marquee carry it visually.)
- Founder credential lists.
- A homepage K9 namedrop.
- OG image generation.
- Real logos / founder photo (waiting on assets).

## Files touched

- `src/routes/index.tsx` — hero, BreathingBand, Workflow subtitle, Capabilities rebuild, Speed retiering, CTA copy, FAQ payment answer, Trust client list, hero Eyebrow responsive, Work Unsplash swap.
- `src/routes/index.tsx` (stage 04 wrapper) — BAT stamp amount/delay tweak.
- `src/routes/studio.tsx` — story 2nd paragraph, founders rewrite + LinkedIn, philosophy single-column, photo placeholder.
