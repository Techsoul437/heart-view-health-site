import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://heartviewhealth.com";

  // 3. PUBLIC STATIC PAGES
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/medical-disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  type BlogItem = { status: string; slug: string; updatedAt?: string; category?: string };

  let categoryUrls: MetadataRoute.Sitemap = [];
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch("https://api.heartviewhealth.com/api/blog/all", {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const blogs: BlogItem[] = json.data || [];

      // 1. BLOG URLs - only published ones
      const publishedBlogs = blogs.filter((blog) => blog.status === "published");
      
      const uniqueBlogSlugs = new Set<string>();
      
      blogUrls = publishedBlogs.reduce<MetadataRoute.Sitemap>((acc, blog) => {
        if (!uniqueBlogSlugs.has(blog.slug)) {
          uniqueBlogSlugs.add(blog.slug);
          acc.push({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
        return acc;
      }, []);

      // 2. CATEGORY URLs - derived from actual published blogs
      const activeCategories = Array.from(new Set(
        publishedBlogs
          .map((blog) => blog.category)
          .filter(Boolean)
          .map((cat) => cat!.toLowerCase())
      ));

      categoryUrls = activeCategories.map((cat) => ({
        url: `${baseUrl}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Ensure no duplicates overall
  const allUrls = [...defaultPages, ...categoryUrls, ...blogUrls];
  
  const uniqueUrlsMap = new Map<string, MetadataRoute.Sitemap[number]>();
  allUrls.forEach((item) => {
    if (!uniqueUrlsMap.has(item.url)) {
      uniqueUrlsMap.set(item.url, item);
    }
  });

  return Array.from(uniqueUrlsMap.values());
}