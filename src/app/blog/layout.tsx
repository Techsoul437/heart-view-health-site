import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Blog | HeartView Health",
  description:
    "Read expert health articles, wellness tips, preventive care guides, nutrition advice, fitness insights, and the latest healthcare updates from HeartView Health.",
  keywords: [
    "health blog",
    "health tips",
    "wellness",
    "nutrition",
    "fitness",
    "preventive healthcare",
    "heart health",
    "health insights",
    "HeartView Health",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Health Blog | HeartView Health",
    description:
      "Explore expert health articles, wellness tips, nutrition guides, and healthcare insights.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
