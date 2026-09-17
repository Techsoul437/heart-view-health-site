import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/heartview-admin",
        "/lab-admin",
        "/lab-staff",
        "/report",
        "/api",
      ],
    },
    sitemap: "https://heartviewhealth.com/sitemap.xml",
  };
}