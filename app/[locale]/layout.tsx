import { notFound } from 'next/navigation'
import { hasLocale, getDictionary } from '@/lib/i18n'

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  return <>{children}</>
}
