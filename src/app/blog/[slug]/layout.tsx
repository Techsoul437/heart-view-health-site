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
          title: (blog.seoTitle || blog.title) as string,
          description: (blog.seoDescription || blog.description) as string,
          alternates: {
            canonical: `/blog/${slug}`,
          },
          openGraph: {
            title: (blog.seoTitle || blog.title) as string,
            description: (blog.seoDescription || blog.description) as string,
            url: `/blog/${slug}`,
            images: blog.mainImage ? [{ url: blog.mainImage as string }] : [],
            type: "article",
            authors: blog.author ? [blog.author as string] : undefined,
            publishedTime: (blog.publishDate as string) || undefined,
            modifiedTime: (blog.updatedAt as string) || undefined,
          },
          twitter: {
            card: "summary_large_image",
            title: (blog.seoTitle || blog.title) as string,
            description: (blog.seoDescription || blog.description) as string,
            images: blog.mainImage ? [blog.mainImage as string] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return {
    title: "Blog",
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
