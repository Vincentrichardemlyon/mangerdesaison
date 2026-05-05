export default function CuissonCard({
  cuissons,
  preparation,
  labels,
}: {
  cuissons: { methode: string; duree: string; icone: string }[]
  preparation: string
  labels: { cuisson: string; principale: string }
}) {
  return (
    <div className="bg-surface-default rounded-xl p-lg border border-border-subtle shadow-ambient">
      <h3 className="font-h3 text-h3 text-on-surface mb-lg">{labels.cuisson}</h3>
      <div className="flex flex-col gap-md">
        {cuissons.map((c) => (
          <div key={c.methode} className="flex items-center gap-md">
            <span className="material-symbols-outlined text-primary-container text-[24px]">{c.icone}</span>
            <div>
              <p className="font-body text-body text-on-surface">{c.methode}</p>
              <p className="font-caption text-caption text-text-muted">{c.duree}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-lg pt-lg border-t border-border-subtle">
        <p className="font-caption text-caption text-text-muted">{labels.principale}</p>
        <p className="font-body text-body text-on-surface mt-xs">{preparation}</p>
      </div>
    </div>
  )
}
