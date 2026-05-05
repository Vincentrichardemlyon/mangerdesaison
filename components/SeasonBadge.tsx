export default function SeasonBadge({
  badge,
  label,
}: {
  badge: 'pleineSaison' | 'precoce' | 'tardif'
  label: string
}) {
  return (
    <span
      className={`absolute top-md right-md font-caption text-caption px-sm py-xs rounded-full ${
        badge === 'pleineSaison' ? 'bg-success/90 text-white' : 'bg-warning/90 text-white'
      }`}
    >
      {label}
    </span>
  )
}
