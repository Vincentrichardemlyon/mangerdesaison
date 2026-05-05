import Link from 'next/link'
import SeasonBadge from './SeasonBadge'

type CardLabels = {
  pleineSaison: string
  precoce: string
  tardif: string
  voirFiche: string
}

export default function ProduitCard({
  nom,
  emoji,
  badge,
  featured,
  slug,
  locale,
  labels,
}: {
  nom: string
  emoji: string
  badge: 'pleineSaison' | 'precoce' | 'tardif'
  featured: boolean
  slug: string
  locale: string
  labels: CardLabels
}) {
  return (
    <article
      className={`group bg-surface-container-lowest rounded-xl overflow-hidden border border-border-subtle shadow-ambient hover:shadow-ambient-md transition-shadow duration-300 flex flex-col ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://placehold.co/600x400/f7e4dd/887269?text=${emoji}`}
          alt={nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <SeasonBadge badge={badge} label={labels[badge]} />
      </div>
      <div className="p-lg flex-1 flex flex-col gap-sm">
        <h3 className="font-h3 text-h3 text-on-surface">{nom}</h3>
        <p className="font-body-sm text-body-sm text-text-muted flex-1">
          Légume de saison riche en nutriments essentiels.
        </p>
        <Link
          href={`/${locale}/produits/${slug}`}
          className="mt-auto font-caption text-caption text-primary hover:text-primary-container transition-colors duration-200"
        >
          {labels.voirFiche} →
        </Link>
      </div>
    </article>
  )
}
