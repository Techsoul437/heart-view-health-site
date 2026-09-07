import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).replace(/-/g, " ");

  return {
    title: `${decodedCategory.toUpperCase()} Blogs | HeartView Health`,
    description: `Explore all our expert articles and insights related to ${decodedCategory}.`,
    alternates: {
      canonical: `https://heartviewhealth.com/category/${category}`,
    },
    openGraph: {
      title: `${decodedCategory.toUpperCase()} Blogs | HeartView Health`,
      description: `Explore all our expert articles and insights related to ${decodedCategory}.`,
      url: `https://heartviewhealth.com/category/${category}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedCategory.toUpperCase()} Blogs | HeartView Health`,
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
