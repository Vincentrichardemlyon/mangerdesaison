export default function NutritionCard({
  description,
  accords,
  labels,
}: {
  description: string
  accords: string[]
  labels: { nutrition: string; accordParfait: string }
}) {
  return (
    <div className="bg-surface-default rounded-xl p-lg border border-border-subtle shadow-ambient">
      <h3 className="font-h3 text-h3 text-on-surface mb-lg">{labels.nutrition}</h3>
      <p className="font-body text-body text-text-muted leading-relaxed">{description}</p>
      <div className="mt-lg pt-lg border-t border-border-subtle">
        <p className="font-caption text-caption text-text-muted mb-sm">{labels.accordParfait}</p>
        <div className="flex flex-wrap gap-sm">
          {accords.map((accord) => (
            <span
              key={accord}
              className="font-caption text-caption bg-[#F1F5E9] px-sm py-xs rounded-full border border-secondary/30 text-secondary"
            >
              {accord}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
