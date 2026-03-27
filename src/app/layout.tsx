import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invitación 40 años de mi Javi',
  description: 'Mi bello esposo cumple 40 años y vamos a celebrarlo el 18 de abril.',
  keywords: 'Cumpleaños, invitación, celebración',
  authors: [{ name: 'javi' }],
  openGraph: {
    title: 'Invitación 40 años de mi Javi',
    description: 'Mi bello esposo cumple 40 años y vamos a celebrarlo el 18 de abril..',
    url: 'https://github.com/Vivisgalvis/cumpleanos/',
    siteName: 'Invitación de cumpleaños',
    images: [
      {
        url: 'https://github.com/Vivisgalvis/cumpleanos/assets/photo-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Invitación de cumpleaños',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invitación 40 años de mi Javi',
    description: 'Mi bello esposo cumple 40 años y vamos a celebrarlo el 18 de abril.',
    images: ['https://github.com/Vivisgalvis/cumpleanos/assets/photo-1.jpg',],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-[100svh]">{children}</div>
      </body>
    </html>
  )
}
