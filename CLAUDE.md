# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build + type-check (TypeScript errors surface here, not in dev)
npm run lint     # eslint-config-next
```

## Architecture

```
app/
  [locale]/              # FR default → EN secondary; middleware redirects / → /fr
    page.tsx             # Home + season calendar
    produits/[slug]/
      page.tsx           # Product detail (Poireau = V1 reference)
    layout.tsx           # Locale-aware, injects dictionary
  middleware.ts          # Locale detection + redirect
lib/
  data/produits.ts       # 38 vegetables typed as Produit[] — sourced from public/infos-legumes.csv
  utils/saison.ts        # getProduitsDuMois(mois, locale), slug helpers
locales/
  fr.json / en.json      # UI strings only (labels, nav, filters, CTA)
```

Product slugs are locale-specific (`poireau` / `leek`). No i18n library — plain dictionary objects loaded server-side in `layout.tsx`.

## Data Model

Every user-visible text field is `{ fr: string; en: string }`. Source: `public/infos-legumes.csv` (38 rows, 8 columns).

```typescript
interface Traduit { fr: string; en: string }
type Saison = 'Hiver' | 'Printemps' | 'Été' | 'Automne'

interface Produit {
  slug: Traduit;
  nom: Traduit;
  type: 'legume';
  emoji: string;
  saisons: Saison[];
  moisPrincipaux: number[];               // 1–12, parsed from CSV text
  nutrition: { description: Traduit };
  accords: Traduit[];
  preparation: Traduit;
  conservation: { principale: Traduit; secondaire: Traduit };
  potager: Traduit[];
  image: string;
  cuissons?: { methode: Traduit; duree: string; icone: string }[];      // manual — Poireau only V1
  recettes?: { titre: Traduit; duree: string; image: string }[];        // manual — Poireau only V1
}
```

## Tailwind v4

No `tailwind.config.ts`. All tokens in `app/globals.css` under `@theme { }`. Import is `@import "tailwindcss"`. PostCSS plugin: `@tailwindcss/postcss`.

## Components

Default to Server Components. Use `"use client"` only for `MonthSelector` (filter state) and `LangSwitcher` (locale toggle).
