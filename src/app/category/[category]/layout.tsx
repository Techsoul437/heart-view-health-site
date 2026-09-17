import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).replace(/-/g, " ").trim();
  const displayName = decodedCategory.replace(/\b\w/g, (c) => c.toUpperCase());
  const cleanSlug = decodedCategory.toLowerCase().replace(/[\s_]+/g, "-");

  return {
    title: `${displayName} Blogs`,
    description: `Explore all our expert articles and insights related to ${decodedCategory}.`,
    alternates: {
      canonical: `/category/${cleanSlug}`,
    },
    openGraph: {
      title: `${displayName} Blogs`,
      description: `Explore all our expert articles and insights related to ${decodedCategory}.`,
      url: `/category/${cleanSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} Blogs`,
      description: `Explore all our expert articles and insights related to ${decodedCategory}.`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
