import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const res = await fetch("https://api.heartviewhealth.com/api/blog/all", {
      next: { revalidate: 3600 }
    });
    
    if (res.ok) {
      const json = await res.json();
      const blogs = json.data || [];
      const blog = blogs.find((b: { slug?: string; [key: string]: unknown }) => b.slug?.toLowerCase().trim() === slug?.toLowerCase().trim());
      
      if (blog) {
        return {
          title: `${blog.seoTitle || blog.title} | HeartView Health`,
          description: blog.seoDescription || blog.description,
          alternates: {
            canonical: `https://heartviewhealth.com/blog/${slug}`,
          },
          openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.description,
            url: `https://heartviewhealth.com/blog/${slug}`,
            images: blog.mainImage ? [{ url: blog.mainImage }] : [],
            type: "article",
            authors: blog.author ? [blog.author] : undefined,
            publishedTime: blog.publishDate || undefined,
            modifiedTime: blog.updatedAt || undefined,
          },
          twitter: {
            card: "summary_large_image",
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.description,
            images: blog.mainImage ? [blog.mainImage] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return {
    title: "Blog | HeartView Health",
    alternates: {
      canonical: `https://heartviewhealth.com/blog/${slug}`,
    }
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
