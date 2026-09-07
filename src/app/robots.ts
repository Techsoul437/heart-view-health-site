import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/heartview-admin/",
        "/lab-admin/",
        "/lab-staff/",
        "/delete-account",
      ],
    },
    sitemap: "https://heartviewhealth.com/sitemap.xml",
  };
}