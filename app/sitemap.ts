import type { MetadataRoute } from "next";
import { seoContent } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrl = new URL("/", seoContent.siteUrl).toString();

  return [
    {
      url: homepageUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
