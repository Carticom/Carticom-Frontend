import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://carticom.ng";
  const now = new Date();

  const staticRoutes = [
    "",
    "/features",
    "/pricing",
    "/about",
    "/contact",
    "/demo",
    "/blog",
    "/docs",
    "/help",
    "/tutorials",
    "/community",
    "/careers",
    "/press",
    "/partners",
    "/solutions/storefront",
    "/solutions/inventory",
    "/solutions/payments",
    "/solutions/ai",
    "/solutions/marketing",
    "/solutions/finance",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/refunds",
  ];

  return staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
