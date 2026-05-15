'use client'

import { useState } from 'react'
import MonthSelector from './MonthSelector'
import ProduitCard from './ProduitCard'
import type { Produit } from '@/lib/types'

type Filter = 'all' | 'legumes'

type CalendarT = {
  calendar: {
    hiver: string
    printemps: string
    ete: string
    automne: string
    recoltes: string
    filters: { all: string; legumes: string }
  }
  months: string[]
  card: { pleineSaison: string; precoce: string; tardif: string; voirFiche: string }
}

export default function CalendarSection({
  allProduits,
  locale,
  t,
  initialMonthIdx,
}: {
  allProduits: Produit[]
  locale: string
  t: CalendarT
  initialMonthIdx: number
}) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonthIdx)
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all')
  const [visible, setVisible] = useState(true)
  const loc = locale as 'fr' | 'en'

  function handleMonthSelect(idx: number) {
    if (idx === selectedMonth) return
    setVisible(false)
    setTimeout(() => {
      setSelectedMonth(idx)
      setVisible(true)
    }, 150)
  }

  const filtered = allProduits.filter((p) => {
    const inMonth = p.moisPrincipaux.includes(selectedMonth + 1)
    const inFilter = selectedFilter === 'all' || (selectedFilter === 'legumes' && p.type === 'legume')
    return inMonth && inFilter
  })

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.calendar.filters.all },
    { key: 'legumes', label: t.calendar.filters.legumes },
  ]

  return (
    <>
      <MonthSelector
        selectedMonthIdx={selectedMonth}
        onMonthSelect={handleMonthSelect}
        seasonLabels={{
          hiver: t.calendar.hiver,
          printemps: t.calendar.printemps,
          ete: t.calendar.ete,
          automne: t.calendar.automne,
        }}
        monthLabels={t.months}
      />

      <div className="flex items-end justify-between mb-xl border-b border-border-subtle pb-sm">
        <div>
          <h2 className="font-h2 text-h2 text-on-background">
            {t.calendar.recoltes} {t.months[selectedMonth]}
          </h2>
        </div>
        <div className="hidden md:flex gap-sm">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedFilter(key)}
              className={`font-caption text-caption px-md py-xs rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selectedFilter === key
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest text-text-muted border-border-subtle hover:bg-surface-container active:scale-95'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 150ms ease, transform 150ms ease',
        }}
      >
        {filtered.map((produit, index) => (
          <ProduitCard
            key={produit.slug.fr}
            nom={produit.nom[loc]}
            image={produit.image}
            emoji={produit.emoji}
            badge="pleineSaison"
            featured={index === 0}
            slug={produit.slug[loc]}
            locale={locale}
            labels={t.card}
          />
        ))}
      </div>
    </>
  )
}
