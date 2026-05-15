import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import LangSwitcher from '@/components/LangSwitcher'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const t = await getDictionary(locale)
  return {
    title: `${t.aboutPage.title} — Seasonal Harvest`,
    description: t.aboutPage.missionText,
  }
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const t = await getDictionary(locale)

  const whyPoints = [
    t.aboutPage.why1,
    t.aboutPage.why2,
    t.aboutPage.why3,
    t.aboutPage.why4,
  ]

  const stats = [
    { value: t.aboutPage.stat1Value, label: t.aboutPage.stat1Label },
    { value: t.aboutPage.stat2Value, label: t.aboutPage.stat2Label },
    { value: t.aboutPage.stat3Value, label: t.aboutPage.stat3Label },
  ]

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
              const isActive = k === 'about'
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
        <header className="bg-surface-container-low border-b border-border-subtle py-3xl">
          <div className="max-w-[48rem] mx-auto px-lg text-center space-y-md">
            <h1 className="font-display text-display text-primary">{t.aboutPage.title}</h1>
            <p className="font-body-lg text-body-lg text-text-muted leading-relaxed">
              {t.aboutPage.missionText}
            </p>
          </div>
        </header>

        <div className="max-w-[48rem] mx-auto px-lg py-3xl space-y-3xl">
          {/* ── Why seasonal ────────────────────────────────────────────── */}
          <section className="space-y-lg">
            <h2 className="font-h2 text-h2 text-text-main">{t.aboutPage.whyTitle}</h2>
            <ul className="space-y-md">
              {whyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-md">
                  <span
                    className="material-symbols-outlined text-primary-container text-[20px] mt-[3px] shrink-0"
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <span className="font-body text-body text-text-muted">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Stats ───────────────────────────────────────────────────── */}
          <section className="grid grid-cols-3 gap-md">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-surface-container-lowest rounded-xl border border-border-subtle shadow-card p-lg text-center space-y-xs"
              >
                <span className="font-display text-display text-primary-container block">{value}</span>
                <span className="font-body-sm text-body-sm text-text-muted block">{label}</span>
              </div>
            ))}
          </section>

          {/* ── Data ────────────────────────────────────────────────────── */}
          <section className="space-y-md">
            <h2 className="font-h2 text-h2 text-text-main">{t.aboutPage.dataTitle}</h2>
            <p className="font-body text-body text-text-muted">{t.aboutPage.dataText}</p>
          </section>
        </div>
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
