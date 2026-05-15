import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, getDictionary } from '@/lib/i18n'
import LangSwitcher from '@/components/LangSwitcher'
import NutritionCard from '@/components/NutritionCard'
import CuissonCard from '@/components/CuissonCard'
import { getProduitParSlug } from '@/lib/utils/saison'

const MONTHS_SHORT = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc']
const MONTHS_SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export async function generateMetadata({ params }: PageProps<'/[locale]/produits/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}

  const loc = locale as 'fr' | 'en'
  const p = getProduitParSlug(slug, loc)
  if (!p) return {}

  const raw = p.nutrition.description[loc]
  const description = raw.length > 155 ? raw.slice(0, 155) + '…' : raw

  return {
    title: `${p.nom[loc]} — Seasonal Harvest`,
    description,
  }
}

export default async function ProduitPage({ params }: PageProps<'/[locale]/produits/[slug]'>) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const loc = locale as 'fr' | 'en'
  const p = getProduitParSlug(slug, loc)
  if (!p) notFound()

  const altLocale = loc === 'fr' ? 'en' : 'fr'
  const t = await getDictionary(locale)
  const monthsShort = loc === 'fr' ? MONTHS_SHORT : MONTHS_SHORT_EN

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-sm border-b border-border-subtle shadow-ambient">
        <div className="max-w-7xl mx-auto px-lg h-20 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-h2 text-h2 text-primary-container tracking-tight">
            Seasonal Harvest
          </Link>
          <div className="flex items-center gap-sm text-primary-container">
            <LangSwitcher locale={locale} altSlug={p.slug[altLocale]} />
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative h-64 flex items-end pb-xl overflow-hidden">
          <div className="absolute inset-0">
              <Image
              src={p.heroImage ?? p.image}
              alt={p.nom[loc]}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-lg w-full">
            <h1 className="font-display text-display text-white drop-shadow-lg">{p.nom[loc]}</h1>
          </div>
        </section>

        {/* ── Quick dashboard ───────────────────────────────────────── */}
        <section className="bg-background py-2xl">
          <div className="max-w-7xl mx-auto px-lg md:px-xl grid grid-cols-1 md:grid-cols-3 gap-lg">

            {/* Saisonnalité */}
            <div className="bg-surface-default rounded-xl p-lg border border-border-subtle shadow-ambient">
              <h3 className="font-h3 text-h3 text-on-surface mb-lg">{t.produit.saisonnalite}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-xs">
                {Array.from({ length: 12 }, (_, i) => {
                  const isPeak = p.moisPrincipaux.includes(i + 1)
                  return (
                    <div key={i} className="flex flex-col items-center gap-xs">
                      <div className={`w-full h-6 rounded ${
                        isPeak ? 'bg-secondary' : 'bg-border-subtle'
                      }`} />
                      <span className="font-caption text-[10px] text-text-muted">{monthsShort[i]}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-md mt-md flex-wrap">
                <span className="flex items-center gap-xs font-caption text-caption text-text-muted">
                  <span className="w-3 h-3 rounded-sm bg-secondary inline-block" /> {t.card.pleineSaison}
                </span>
                <span className="flex items-center gap-xs font-caption text-caption text-text-muted">
                  <span className="w-3 h-3 rounded-sm bg-border-subtle inline-block" /> {t.card.horseSaison}
                </span>
              </div>
            </div>

            <NutritionCard
              description={p.nutrition.description[loc]}
              accords={p.accords.map((a) => a[loc])}
              labels={{ nutrition: t.produit.nutrition, accordParfait: t.produit.accordParfait }}
            />

            <CuissonCard
              cuissons={(p.cuissons ?? []).map((c) => ({ methode: c.methode[loc], duree: c.duree, icone: c.icone }))}
              preparation={p.preparation[loc]}
              labels={{ cuisson: t.produit.cuisson, principale: t.produit.principale }}
            />
          </div>
        </section>

        {/* ── Recettes ──────────────────────────────────────────────── */}
        {p.recettes && p.recettes.length > 0 && (
        <section className="bg-background py-2xl">
          <div className="max-w-7xl mx-auto px-lg md:px-xl">
            <h2 className="font-h2 text-h2 text-on-background mb-xl">{t.produit.recettes}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {p.recettes.map((r) => (
                <article key={r.titre.fr} className="group bg-surface-default rounded-xl overflow-hidden border border-border-subtle shadow-ambient hover:shadow-ambient-md transition-shadow duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                      src={r.image}
                      alt={r.titre[loc]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-lg">
                    <h3 className="font-h3 text-h3 text-on-surface mb-sm">{r.titre[loc]}</h3>
                    <span className="font-caption text-caption text-text-muted">{r.duree}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ── Conservation ─────────────────────────────────────────── */}
        <section className="bg-background py-2xl">
          <div className="max-w-7xl mx-auto px-lg md:px-xl">
            <h2 className="font-h2 text-h2 text-on-background mb-xl">{t.produit.conservation}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              {(['principale', 'secondaire'] as const).map((type) => (
                <div key={type} className="bg-surface-default rounded-xl p-lg border border-border-subtle shadow-ambient flex gap-lg">
                  <span className="material-symbols-outlined text-primary-container text-[32px] shrink-0" aria-hidden="true">
                    {type === 'principale' ? 'kitchen' : 'ac_unit'}
                  </span>
                  <div>
                    <p className="font-caption text-caption text-text-muted uppercase tracking-widest mb-sm">{t.produit[type]}</p>
                    <p className="font-body text-body text-on-surface">{p.conservation[type][loc]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Potager ──────────────────────────────────────────────── */}
        <section className="bg-background py-2xl">
          <div className="max-w-7xl mx-auto px-lg md:px-xl">
            <h2 className="font-h2 text-h2 text-on-background mb-xl">{t.produit.potager}</h2>
            <div className="flex flex-wrap gap-md">
              {p.potager.map((ami) => (
                <span
                  key={ami.fr}
                  className="bg-surface-default border border-border-subtle rounded-xl px-lg py-md font-body text-body text-on-surface shadow-ambient"
                >
                  {ami[loc]}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-xl">
        <div className="max-w-7xl mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="font-h3 text-h3">{t.footer.tagline}</span>
          <span className="font-body-sm text-body-sm opacity-60">{t.footer.rights}</span>
        </div>
      </footer>
    </div>
  )
}
