import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, getDictionary } from '@/lib/i18n'
import LangSwitcher from '@/components/LangSwitcher'
import { produits } from '@/lib/data/produits'

export async function generateMetadata({ params }: PageProps<'/[locale]/recipes'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const t = await getDictionary(locale)
  return {
    title: `${t.recipesPage.title} — Seasonal Harvest`,
    description: t.recipesPage.subtitle,
  }
}

export default async function RecipesPage({ params }: PageProps<'/[locale]/recipes'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const t = await getDictionary(locale)
  const loc = locale as 'fr' | 'en'

  const allRecipes = produits
    .filter((p) => p.recettes && p.recettes.length > 0)
    .flatMap((p) => (p.recettes ?? []).map((r) => ({ recipe: r, produit: p })))

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-sm border-b border-border-subtle shadow-ambient">
        <div className="max-w-7xl mx-auto px-lg h-20 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-h2 text-h2 text-primary-container tracking-tight">
            Seasonal Harvest
          </Link>
          <div className="hidden md:flex gap-xl">
            {(['home', 'calendar', 'recipes', 'about'] as const).map((k) => {
              const href = k === 'home' ? `/${locale}` : `/${locale}/${k}`
              const isActive = k === 'recipes'
              return (
                <Link
                  key={k}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-body text-body rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive ? 'text-primary-container' : 'text-text-muted hover:text-primary'
                  }`}
                >
                  {t.nav[k]}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-sm text-primary-container">
            <LangSwitcher locale={locale} />
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1 bg-[#F1F5E9]">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="bg-surface-container-low border-b border-border-subtle py-2xl">
          <div className="max-w-7xl mx-auto px-lg text-center space-y-sm">
            <h1 className="font-display text-display text-primary">{t.recipesPage.title}</h1>
            <p className="font-body-lg text-body-lg text-text-muted max-w-[42rem] mx-auto">
              {t.recipesPage.subtitle}
            </p>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-lg py-3xl space-y-3xl">
          {/* ── Recipe cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
            {allRecipes.map(({ recipe, produit }) => (
              <article
                key={`${produit.slug[loc]}-${recipe.titre[loc]}`}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-card border border-border-subtle flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.titre[loc]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-md flex flex-col gap-sm flex-1">
                  <div className="flex items-center gap-sm">
                    <span aria-hidden="true">{produit.emoji}</span>
                    <span className="font-caption text-caption text-primary-container uppercase tracking-wide">
                      {produit.nom[loc]}
                    </span>
                  </div>
                  <h2 className="font-h3 text-h3 text-text-main leading-snug">
                    {recipe.titre[loc]}
                  </h2>
                  <div className="flex items-center gap-xs text-text-muted">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">schedule</span>
                    <span className="font-body-sm text-body-sm">{recipe.duree}</span>
                  </div>
                  <div className="mt-auto pt-sm border-t border-border-subtle">
                    <Link
                      href={`/${locale}/produits/${produit.slug[loc]}`}
                      className="inline-flex items-center gap-xs font-body-sm text-body-sm text-primary-container hover:text-primary active:scale-95 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      {t.recipesPage.voirFiche}
                      <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── Coming soon ─────────────────────────────────────────────── */}
          <div className="text-center py-2xl bg-surface-container-lowest rounded-xl border border-border-subtle shadow-card">
            <span className="material-symbols-outlined text-primary-container text-[40px] block mb-md" aria-hidden="true">
              eco
            </span>
            <h2 className="font-h3 text-h3 text-text-main mb-sm">{t.recipesPage.comingSoonTitle}</h2>
            <p className="font-body-sm text-body-sm text-text-muted max-w-sm mx-auto">
              {t.recipesPage.comingSoonText}
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-xl">
        <div className="max-w-7xl mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="font-h3 text-h3">{t.footer.tagline}</span>
          <span className="font-body-sm text-body-sm opacity-60">{t.footer.rights}</span>
        </div>
      </footer>
    </div>
  )
}
