import OeuvreDetailClient from "../../src/components/OeuvreDetailClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OeuvreDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return <OeuvreDetailClient slug={slug} />;
}