import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import Script from 'next/script';
import { Providers } from './providers'
import { SmoothScroll } from '@/components/SmoothScroll'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import { getPortfolioGraph, toJsonLd } from '@/lib/seo/jsonld'
import { siteConfig, ogLocale } from '@/lib/seo/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.github }],
  creator: siteConfig.creator,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico?v=3' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png?v=3', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: ogLocale,
    url: siteConfig.homeUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.homeUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    'geo.region': siteConfig.geo.region,
    'geo.placename': siteConfig.geo.placename,
    'geo.position': siteConfig.geo.position,
    ICBM: siteConfig.geo.icbm,
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  interactiveWidget: 'resizes-content',
  viewportFit: 'cover',
  themeColor: '#0A111C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const portfolioJsonLd = toJsonLd(getPortfolioGraph()).replace(/</g, '\\u003c')
  const navSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    hasPart: [
      { name: "Home", url: "https://devopsbd.com/" },
      { name: "About", url: "https://devopsbd.com/about" },
      { name: "Services", url: "https://devopsbd.com/services" },
      { name: "Solutions", url: "https://devopsbd.com/solutions" },
      { name: "Portfolio", url: "https://devopsbd.com/portfolio" },
      { name: "Pricing", url: "https://devopsbd.com/pricing" },
      { name: "Blog", url: "https://devopsbd.com/blog" },
      { name: "Contact", url: "https://devopsbd.com/contact" },
    ],
  })
  const searchAction = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://devopsbd.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://devopsbd.com/search?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  })

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${notoSansBengali.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="jsonld-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: portfolioJsonLd }}
          strategy="beforeInteractive"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: navSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: searchAction }} />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                try {
                  localStorage.setItem('theme', 'dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans bg-background text-white antialiased`} suppressHydrationWarning>
        <a
          href="#main-content"
          data-focus-target="true"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-white/[0.02] focus:px-4 focus:py-2 focus:text-base focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4F12A]"
        >
          Skip to content
        </a>
        <div id="root" className="bg-background">
          <SmoothScroll>
            <Providers>
              {children}
              <BreadcrumbSchema />
            </Providers>
          </SmoothScroll>
        </div>
      </body>
    </html>
  )
}
