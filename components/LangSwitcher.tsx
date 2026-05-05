import Link from 'next/link'

export default function LangSwitcher({ locale }: { locale: string }) {
  return (
    <Link
      href={locale === 'fr' ? '/en' : '/fr'}
      className="font-caption text-caption px-md py-xs rounded-full border border-outline-variant hover:bg-surface-container transition-colors duration-200"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </Link>
  )
}
