import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import LangSwitcher from '@/components/LangSwitcher'
import { getProduitsDuMois } from '@/lib/utils/saison'

type SeasonKey = 'Hiver' | 'Printemps' | 'Été' | 'Automne'

const MONTH_SEASON: SeasonKey[] = [
  'Hiver', 'Hiver', 'Printemps', 'Printemps', 'Printemps', 'Été',
  'Été', 'Été', 'Automne', 'Automne', 'Automne', 'Hiver',
]

const SEASON_STYLES: Record<SeasonKey, { bg: string; text: string; border: string }> = {
  Hiver:     { bg: 'bg-primary/10',   text: 'text-primary',           border: 'border-primary/20' },
  Printemps: { bg: 'bg-secondary/10', text: 'text-on-secondary-container', border: 'border-secondary/20' },
  Été:       { bg: 'bg-warning/10',   text: 'text-warning',           border: 'border-warning/20' },
  Automne:   { bg: 'bg-tertiary/10',  text: 'text-tertiary-container', border: 'border-tertiary/20' },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/calendar'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const t = await getDictionary(locale)
  return {
    title: `${t.calendarPage.title} — Seasonal Harvest`,
    description: t.calendarPage.subtitle,
  }
}

export default async function CalendarPage({ params }: PageProps<'/[locale]/calendar'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const t = await getDictionary(locale)
  const loc = locale as 'fr' | 'en'

  const seasonLabels: Record<SeasonKey, string> = {
    Hiver:     t.calendar.hiver,
    Printemps: t.calendar.printemps,
    Été:       t.calendar.ete,
    Automne:   t.calendar.automne,
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const mois = i + 1
    const produits = getProduitsDuMois(mois)
    const saison = MONTH_SEASON[i]
    return { mois, produits, saison, label: t.months[i] }
  })

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
              const isActive = k === 'calendar'
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
            <h1 className="font-display text-display text-primary">{t.calendarPage.title}</h1>
            <p className="font-body-lg text-body-lg text-text-muted max-w-[42rem] mx-auto">
              {t.calendarPage.subtitle}
            </p>
          </div>
        </header>

        {/* ── 12-month grid ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-lg py-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
            {months.map(({ mois, produits, saison, label }) => {
              const styles = SEASON_STYLES[saison]
              const shown = produits.slice(0, 5)
              const remaining = produits.length - shown.length
              return (
                <div
                  key={mois}
                  className="bg-surface-container-lowest rounded-xl border border-border-subtle shadow-card p-md flex flex-col gap-sm"
                >
                  <div className="flex items-center justify-between gap-xs">
                    <span className="font-h4 text-h4 text-text-main">{label}</span>
                    <span
                      className={`font-caption text-caption px-sm py-xs rounded-full border shrink-0 ${styles.bg} ${styles.text} ${styles.border}`}
                    >
                      {seasonLabels[saison]}
                    </span>
                  </div>

                  <ul className="space-y-xs flex-1">
                    {shown.map((p) => (
                      <li key={p.slug[loc]}>
                        <Link
                          href={`/${locale}/produits/${p.slug[loc]}`}
                          className="flex items-center gap-xs text-body-sm font-body-sm text-text-muted hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                          <span aria-hidden="true">{p.emoji}</span>
                          <span className="truncate">{p.nom[loc]}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {remaining > 0 && (
                    <p className="font-caption text-caption text-text-muted">
                      +{remaining} {t.calendarPage.autres}
                    </p>
                  )}
                </div>
              )
            })}
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
