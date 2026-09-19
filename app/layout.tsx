import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manyu Srivastava — Full-Stack Web & Mobile Developer',
  description:
    'Portfolio of Manyu Srivastava, a 13-year-old full-stack developer specializing in React, Java, and modern JavaScript. Building high-impact web and app experiences.',
  generator: 'v0.app',
  keywords: [
    'Manyu Srivastava',
    'Full-Stack Developer',
    'React Developer',
    'Java Developer',
    'Young Developer',
    'Web Developer Portfolio',
  ],
  authors: [{ name: 'Manyu Srivastava' }],
  openGraph: {
    title: 'Manyu Srivastava — Full-Stack Web & Mobile Developer',
    description:
      'A 13-year-old developer specializing in React, Java, and modern JavaScript, crafting scalable web applications and interactive digital experiences.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0f1d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
