export type Oeuvre = {
  id: number;
  title: string;
  slug: string;
  image: string;
  technique: string;
  dimensions: string;
  year: string;
  availability: "Disponible" | "Vendu";
  description: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryImages: string[];
};

export const oeuvres: Oeuvre[] = [
  {
    id: 1,
    title: "Libération",
    slug: "liberation",
    image: "/oeuvres-liberation.jpg",
    technique: "Huile sur toile",
    dimensions: '24 x 24"',
    year: "2025",
    availability: "Vendu",
    description:
      "Une œuvre vibrante qui évoque l’élan intérieur, la transformation et le mouvement émotionnel.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/IMAGE%20Grande.jpg",
      "/sara.jpg",
      "/sara1.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-ray-of-light.jpg",
      "/oeuvres-a-travers.jpg",
    ],
  },
  {
    id: 2,
    title: "Réflexion",
    slug: "reflexion",
    image: "/oeuvres-reflexion.jpg",
    technique: "Huile sur toile",
    dimensions: '24 x 24"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une composition contemplative où la lumière, la texture et la profondeur créent un espace de méditation.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-reflexion.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-ray-of-light.jpg",
      "/oeuvres-a-travers.jpg",
      "/oeuvres-sagesse.jpg",
      "/oeuvres-la-maison.jpg",
    ],
  },
  {
    id: 3,
    title: "Ray of Light",
    slug: "ray-of-light",
    image: "/oeuvres-ray-of-light.jpg",
    technique: "Huile sur toile",
    dimensions: '24 x 24"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une peinture lumineuse qui explore l’espoir, l’ouverture et la présence sensible de la couleur.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-ray-of-light.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-sentiments-liberte.jpg",
      "/oeuvres-connexions.jpg",
      "/oeuvres-sagesse.jpg",
    ],
  },
  {
    id: 4,
    title: "Grands sentiments",
    slug: "grands-sentiments",
    image: "/Grands%20sentiments.jpg",
    technique: "Huile sur toile",
    dimensions: '24 x 24"',
    year: "2025",
    availability: "Vendu",
    description:
      "Une œuvre expressive portée par l’intensité des émotions et la richesse des contrastes.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/Grands%20sentiments.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-liberation.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-a-travers.jpg",
      "/oeuvres-sagesse.jpg",
    ],
  },
  {
    id: 5,
    title: "Sagesse",
    slug: "sagesse",
    image: "/oeuvres-sagesse.jpg",
    technique: "Huile sur toile",
    dimensions: '12 x 12"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une pièce intime et sensible, centrée sur le calme intérieur et la subtilité du geste pictural.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-sagesse.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-a-travers.jpg",
      "/oeuvres-la-maison.jpg",
      "/IMAGE%20Grande.jpg",
    ],
  },
  {
    id: 6,
    title: "Le ciel",
    slug: "le-ciel",
    image: "/le%20ciel.jpg",
    technique: "Huile sur toile",
    dimensions: '12 x 12"',
    year: "2025",
    availability: "Disponible",
    description:
      "Un regard poétique vers l’élévation, l’espace et les nuances changeantes de la lumière.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/le%20ciel.jpg",
      "/oeuvres-sentiments-liberte.jpg",
      "/oeuvres-connexions.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-reflexion.jpg",
    ],
  },
  {
    id: 7,
    title: "La maison",
    slug: "la-maison",
    image: "/oeuvres-la-maison.jpg",
    technique: "Huile sur toile",
    dimensions: '12 x 12"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une œuvre qui parle d’ancrage, de mémoire et de lieux intérieurs.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-la-maison.jpg",
      "/oeuvres-a-travers.jpg",
      "/oeuvres-sagesse.jpg",
      "/IMAGE%20Grande.jpg",
    ],
  },
  {
    id: 8,
    title: "Le soutien",
    slug: "le-soutien",
    image: "/oeuvres-le-soutien.jpg",
    technique: "Huile sur toile",
    dimensions: '12 x 12"',
    year: "2025",
    availability: "Vendu",
    description:
      "Une peinture sur la présence, la relation humaine et la force invisible du lien.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-le-soutien.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-ray-of-light.jpg",
      "/IMAGE%20Grande.jpg",
    ],
  },
  {
    id: 9,
    title: "À travers",
    slug: "a-travers",
    image: "/oeuvres-a-travers.jpg",
    technique: "Huile sur toile",
    dimensions: '12 x 12"',
    year: "2025",
    availability: "Vendu",
    description:
      "Une exploration visuelle du regard, du passage et de la perception en mouvement.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-a-travers.jpg",
      "/oeuvres-la-maison.jpg",
      "/oeuvres-sagesse.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-reflexion.jpg",
    ],
  },
  {
    id: 10,
    title: "Connexions",
    slug: "connexions",
    image: "/oeuvres-connexions.jpg",
    technique: "Huile sur toile",
    dimensions: '36 x 36"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une œuvre plus ample où les formes et les couleurs dialoguent dans un réseau de sensations.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-connexions.jpg",
      "/oeuvres-sentiments-liberte.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-ray-of-light.jpg",
      "/oeuvres-reflexion.jpg",
    ],
  },
  {
    id: 11,
    title: "Sentiments de liberté",
    slug: "sentiments-de-liberte",
    image: "/oeuvres-sentiments-liberte.jpg",
    technique: "Huile sur toile",
    dimensions: '36 x 48"',
    year: "2025",
    availability: "Disponible",
    description:
      "Une grande composition immersive qui exprime l’élan, l’ouverture et la respiration intérieure.",
    galleryTitle: "Gallery, Edinburgh, Scotland 2025",
    gallerySubtitle: "Solo show 'Beneath the Trees' · May 2025",
    galleryImages: [
      "/oeuvres-sentiments-liberte.jpg",
      "/oeuvres-connexions.jpg",
      "/IMAGE%20Grande.jpg",
      "/oeuvres-reflexion.jpg",
      "/oeuvres-ray-of-light.jpg",
      "/Grands%20sentiments.jpg",
    ],
  },
];