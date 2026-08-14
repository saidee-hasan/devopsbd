export const ogDefaults = {
  siteName: "DevOpsBD Technologies Ltd",
  siteUrl: "https://devopsbd.com",
  ogImage: "https://devopsbd.com/og-image.svg",
  twitterHandle: "@devopsbd",
  locale: "en_US",
  defaultImage: {
    url: "https://devopsbd.com/og-image.svg",
    width: 1200,
    height: 630,
    alt: "DevOpsBD Technologies — Enterprise Software Development & Cloud Solutions",
  },
  defaultDescription: "DevOpsBD Technologies Ltd builds scalable websites, mobile apps, cloud infrastructure, UI/UX designs, and enterprise software for growing businesses.",
  defaultTitle: "DevOpsBD Technologies — Enterprise Software Development & Cloud Solutions",
} as const;

export function pageOg(title: string, description?: string, path?: string, imageUrl?: string) {
  return {
    title: `${title} | ${ogDefaults.siteName}`,
    description: description || ogDefaults.defaultDescription,
    url: path ? `${ogDefaults.siteUrl}${path}` : ogDefaults.siteUrl,
    siteName: ogDefaults.siteName,
    locale: ogDefaults.locale,
    type: "website" as const,
    images: [imageUrl ? { url: imageUrl, width: 1200, height: 630, alt: title } : ogDefaults.defaultImage],
  };
}

export function pageTwitter(title: string, description?: string, imageUrl?: string) {
  return {
    card: "summary_large_image" as const,
    title: `${title} | DevOpsBD`,
    description: description || ogDefaults.defaultDescription,
    site: ogDefaults.twitterHandle,
    images: [imageUrl || ogDefaults.ogImage],
  };
}
