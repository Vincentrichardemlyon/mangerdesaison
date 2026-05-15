'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LangSwitcher({ locale, altSlug }: { locale: string; altSlug?: string }) {
  const pathname = usePathname()
  const targetLocale = locale === 'fr' ? 'en' : 'fr'

  const href = altSlug
    ? `/${targetLocale}/produits/${altSlug}`
    : `/${targetLocale}${pathname.slice(`/${locale}`.length)}`

  return (
    <Link
      href={href}
      className="font-caption text-caption px-md py-xs rounded-full border border-outline-variant hover:bg-surface-container transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </Link>
  )
}
