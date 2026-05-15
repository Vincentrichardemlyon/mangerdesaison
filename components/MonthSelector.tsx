const seasons = [
  { key: 'hiver' as const, color: 'text-secondary', months: [0, 1, 2] },
  { key: 'printemps' as const, color: 'text-secondary', months: [3, 4, 5] },
  { key: 'ete' as const, color: 'text-secondary', months: [6, 7, 8] },
  { key: 'automne' as const, color: 'text-secondary', months: [9, 10, 11] },
]

export default function MonthSelector({
  selectedMonthIdx,
  onMonthSelect,
  seasonLabels,
  monthLabels,
}: {
  selectedMonthIdx: number
  onMonthSelect: (idx: number) => void
  seasonLabels: { hiver: string; printemps: string; ete: string; automne: string }
  monthLabels: string[]
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-sm md:gap-md mb-3xl">
      {seasons.map((season) => (
        <div
          key={season.key}
          className="flex flex-col gap-sm p-md rounded-xl border bg-surface-default border-outline-variant shadow-ambient"
        >
          <span className={`font-caption text-caption uppercase tracking-widest ${season.color}`}>
            {seasonLabels[season.key]}
          </span>
          {season.months.map((mIdx) => {
            const isActive = mIdx === selectedMonthIdx
            return (
              <button
                key={mIdx}
                onClick={() => onMonthSelect(mIdx)}
                className={`w-full text-left font-body text-body px-md py-sm rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-[#87a96b] text-white shadow-ambient'
                    : 'text-text-muted hover:bg-surface-container-highest active:scale-95'
                }`}
              >
                {monthLabels[mIdx]}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
