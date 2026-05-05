import { produits } from '@/lib/data/produits'
import type { Locale, Produit } from '@/lib/types'

export function getProduitsDuMois(mois: number): Produit[] {
  return produits.filter((p) => p.moisPrincipaux.includes(mois))
}

export function getProduitParSlug(slug: string, locale: Locale): Produit | undefined {
  return produits.find((p) => p.slug[locale] === slug)
}

export function getSlugLocalisé(slug: { fr: string; en: string }, locale: Locale): string {
  return slug[locale]
}
