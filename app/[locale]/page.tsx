import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, getDictionary } from '@/lib/i18n'
import LangSwitcher from '@/components/LangSwitcher'
import CalendarSection from '@/components/CalendarSection'
import { produits } from '@/lib/data/produits'

/* ─── Engagement pillar icons ────────────────────────────────────── */
const pillarIcons = ['health_and_safety', 'public', 'local_mall']

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const t = await getDictionary(locale)
  const currentMonthIdx = new Date().getMonth()

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-sm border-b border-border-subtle shadow-ambient">
        <div className="max-w-7xl mx-auto px-lg h-20 flex items-center justify-between">
          <span className="font-h2 text-h2 text-primary-container tracking-tight">
            Seasonal Harvest
          </span>
          <div className="hidden md:flex gap-xl">
            {(['home', 'calendar', 'recipes', 'about'] as const).map((k) => (
              <Link
                key={k}
                href={k === 'home' ? `/${locale}` : `/${locale}/${k}`}
                className="font-body text-body text-text-muted hover:text-primary transition-colors duration-200"
              >
                {t.nav[k]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-sm text-primary-container">
            <LangSwitcher locale={locale} />
            <button aria-label="Search" className="p-sm rounded-lg hover:bg-surface-container transition-colors duration-200 active:scale-95">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative w-full h-[716px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/1440x716/231a15/231a15"
              alt="Harvest hero"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>
          <div className="relative z-10 text-center px-lg max-w-4xl mx-auto space-y-md">
            <h1 className="font-display text-display md:text-[56px] text-white tracking-tight drop-shadow-lg leading-tight">
              {t.hero.tagline}
            </h1>
            <p className="font-body-lg text-body-lg text-surface-default/90 max-w-[42rem] mx-auto drop-shadow-md">
              {t.hero.subtitle}
            </p>
            <div className="pt-lg">
              <a
                href={`#calendar`}
                className="inline-block bg-primary-container hover:bg-on-primary-fixed-variant text-white font-body text-body px-xl py-md rounded-lg shadow-card transition-colors duration-200 active:scale-95"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Season Calendar ──────────────────────────────────────── */}
        <section id="calendar" className="bg-[#F1F5E9] py-3xl">
          <div className="max-w-7xl mx-auto px-lg md:px-xl">
            <header className="text-center mb-2xl">
              <h2 className="font-display text-display text-primary mb-md">{t.calendar.title}</h2>
              <p className="font-body-lg text-body-lg text-text-muted max-w-[42rem] mx-auto">
                {t.calendar.subtitle}
              </p>
            </header>

            <CalendarSection
              allProduits={produits}
              locale={locale}
              t={{ calendar: t.calendar, months: t.months, card: t.card }}
              initialMonthIdx={currentMonthIdx}
            />
          </div>
        </section>

        {/* ── Engagement pillars ───────────────────────────────────── */}
        <section className="bg-[#F1F5E9] py-3xl px-lg pt-0">
          <div className="max-w-[64rem] mx-auto text-center space-y-xl">
            <div className="space-y-sm max-w-[48rem] mx-auto">
              <h2 className="font-h2 text-h2 text-text-main">{t.engagement.title}</h2>
              <p className="font-body-lg text-body-lg text-text-muted">{t.engagement.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl pt-lg">
              {(['nutrition', 'ecologie', 'circuit'] as const).map((key, i) => (
                <div key={key} className="flex flex-col items-center text-center space-y-sm">
                  <span className="material-symbols-outlined text-primary-container text-[40px] mb-xs">
                    {pillarIcons[i]}
                  </span>
                  <h3 className="font-h4 text-h4 text-text-main">{t.engagement.pillars[key].title}</h3>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    {t.engagement.pillars[key].desc}
                  </p>
                </div>
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
