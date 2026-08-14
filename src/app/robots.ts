import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/live-assistant'],
        crawlDelay: 10,
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
