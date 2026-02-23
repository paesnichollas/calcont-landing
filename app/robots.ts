import type { MetadataRoute } from "next";
import { seoContent } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  const host = new URL("/", seoContent.siteUrl).toString().replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    host,
    sitemap: `${host}/sitemap.xml`
  };
}
