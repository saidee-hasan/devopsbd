import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/site'

const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'daily' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/web-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/mobile-app-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ui-ux-design', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/cloud-devops', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ai-solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/solutions/ecommerce', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/erp-software', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/business-management', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/marketplace', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/custom-software', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { path: '/team', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/testimonials', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/process', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/technologies', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/why-us', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteConfig.siteUrl}${page.path}`,
    lastModified: new Date(siteConfig.updatedAt),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
