import Image from 'next/image'
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
  image,
  emoji,
  badge,
  featured,
  slug,
  locale,
  labels,
}: {
  nom: string
  image: string
  emoji: string
  badge: 'pleineSaison' | 'precoce' | 'tardif'
  featured: boolean
  slug: string
  locale: string
  labels: CardLabels
}) {
  const hasImage = image.startsWith('/')

  return (
    <article
      className={`group bg-surface-container-lowest rounded-xl overflow-hidden border border-border-subtle shadow-ambient hover:shadow-ambient-md transition-shadow duration-300 flex flex-col ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {hasImage ? (
          <Image
            src={image}
            alt={nom}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f7e4dd] text-5xl group-hover:scale-105 transition-transform duration-700 ease-out" aria-hidden="true">
            {emoji}
          </div>
        )}
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
          className="mt-auto font-caption text-caption text-primary hover:text-primary-container transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {labels.voirFiche} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
