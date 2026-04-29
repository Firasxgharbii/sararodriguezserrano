import OeuvreDetailClient from "../../src/components/OeuvreDetailClient";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function OeuvreDetailPage({ params }: PageProps) {
  return <OeuvreDetailClient slug={params.slug} />;
}