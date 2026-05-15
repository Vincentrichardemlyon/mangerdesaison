export type Locale = 'fr' | 'en'
export type Saison = 'Hiver' | 'Printemps' | 'Été' | 'Automne'

export interface Traduit {
  fr: string
  en: string
}

export interface Produit {
  slug: Traduit
  nom: Traduit
  type: 'legume'
  emoji: string
  saisons: Saison[]
  moisPrincipaux: number[]
  nutrition: { description: Traduit }
  accords: Traduit[]
  preparation: Traduit
  conservation: { principale: Traduit; secondaire: Traduit }
  potager: Traduit[]
  image: string
  heroImage?: string
  cuissons?: { methode: Traduit; duree: string; icone: string }[]
  recettes?: { titre: Traduit; duree: string; image: string; accordParfait: Traduit[] }[]
}
