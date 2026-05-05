import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Alike, Nunito } from 'next/font/google'
import './globals.css'

const alike = Alike({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alike',
  display: 'swap',
})

const nunito = Nunito({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Seasonal Harvest',
  description: 'Le guide des fruits & légumes de saison.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'fr'

  return (
    <html lang={locale} className={`${alike.variable} ${nunito.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-background text-on-background font-body text-body antialiased">
        {children}
      </body>
    </html>
  )
}
