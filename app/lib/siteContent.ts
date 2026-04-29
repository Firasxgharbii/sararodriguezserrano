export type Lang = "fr" | "en" | "es";

export type LocalizedText = {
  fr: string;
  en: string;
  es: string;
};

export type ImageStyle = {
  src: string;
  size: "small" | "medium" | "large";
  shape: "square" | "rounded" | "circle";
  position: "left" | "center" | "right";
};

export type HomeGalleryWork = {
  src: string;
  title: LocalizedText;
  category: LocalizedText;
};

export type HomeGalleryContent = {
  badge: LocalizedText;
  title: LocalizedText;
  featuredBadge: LocalizedText;
  featuredTitle: LocalizedText;
  featuredText: LocalizedText;
  featuredImage: string;
  works: HomeGalleryWork[];
};

export type HomeContent = {
  badge: LocalizedText;
  title: LocalizedText;
  text1: LocalizedText;
  text2: LocalizedText;
  image: string;
  primaryButton: LocalizedText;
  secondaryButton: LocalizedText;
  heroImageStyle: ImageStyle;
  gallery: HomeGalleryContent;
};

export type AboutPublication = {
  year: string;
  text: LocalizedText;
};

export type AboutCollection = {
  text: LocalizedText;
};

export type AboutTimelineItem = {
  year: string;
  text: LocalizedText;
};

export type AboutContent = {
  badge: LocalizedText;
  title: LocalizedText;
  introText: LocalizedText;
  image: string;
  profileImage: ImageStyle;
  bioTitle: LocalizedText;
  bioText1: LocalizedText;
  bioText2: LocalizedText;
  cvButtonLabel: LocalizedText;
  parcoursButtonLabel: LocalizedText;
  visionBadge: LocalizedText;
  visionTitle: LocalizedText;
  visionText: LocalizedText;
  publicationsBadge: LocalizedText;
  publicationsTitle: LocalizedText;
  publications: AboutPublication[];
  collectionsBadge: LocalizedText;
  collectionsTitle: LocalizedText;
  collections: AboutCollection[];
  parcoursBadge: LocalizedText;
  parcoursTitle: LocalizedText;
  exhibitionsTitle: LocalizedText;
  exhibitions: AboutTimelineItem[];
  formationTitle: LocalizedText;
  formations: AboutTimelineItem[];
  distinctionsTitle: LocalizedText;
  distinctions: AboutTimelineItem[];
};

export type ContactContent = {
  badge: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
  email: string;
  instagram: string;
  contactImage: ImageStyle;
};

export type OeuvreItem = {
  id: number;
  slug: string;
  title: LocalizedText;
  year: string;
  description: LocalizedText;
  technique: LocalizedText;
  dimensions: string;

  titleSize?: "small" | "medium" | "large" | "xlarge"; // ✅ AJOUT IMPORTANT

  availability: LocalizedText;
  image: string;
  galleryTitle: LocalizedText;
  gallerySubtitle: LocalizedText;

  galleryImages: any[]; // 🔥 important car tu utilises des objets maintenant
};

export type OeuvresContent = {
  heroBadge: LocalizedText;
  heroTitle: LocalizedText;
  heroButtonText: LocalizedText;
  heroImage: string;
  introTitle: LocalizedText;
  introText: LocalizedText;
  quoteText: LocalizedText;
  quoteAuthor: LocalizedText;
  quoteImage: string;
  items: OeuvreItem[];
};

export type PortfolioItem = {
  image: string;
  title: LocalizedText;
  category: LocalizedText;
};

export type SiteContent = {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  oeuvres: OeuvresContent;
  portfolio: PortfolioItem[];
};

export const STORAGE_KEY = "site-content";
export const LANG_STORAGE_KEY = "site_lang";

export const defaultSiteContent: SiteContent = {
  home: {
    badge: {
      fr: "Artiste contemporaine",
      en: "Contemporary artist",
      es: "Artista contemporánea",
    },
    title: {
      fr: "Sara Rodríguez Serrano",
      en: "Sara Rodríguez Serrano",
      es: "Sara Rodríguez Serrano",
    },
    text1: {
      fr: "Le travail de Sara Rodríguez Serrano explore la relation entre l’humain et la nature à travers une approche sensible et intuitive.",
      en: "Sara Rodríguez Serrano’s work explores the relationship between human beings and nature through a sensitive and intuitive approach.",
      es: "La obra de Sara Rodríguez Serrano explora la relación entre el ser humano y la naturaleza a través de un enfoque sensible e intuitivo.",
    },
    text2: {
      fr: "Ses œuvres mettent en dialogue formes organiques, figures et espaces intérieurs, évoquant des états de transformation, de mémoire et de présence.",
      en: "Her works bring together organic forms, figures and inner spaces, evoking states of transformation, memory and presence.",
      es: "Sus obras ponen en diálogo formas orgánicas, figuras y espacios interiores, evocando estados de transformación, memoria y presencia.",
    },
    image: "/sara1.jpg",
    primaryButton: {
      fr: "Voir les œuvres",
      en: "View works",
      es: "Ver obras",
    },
    secondaryButton: {
      fr: "Découvrir l’univers",
      en: "Discover the world",
      es: "Descubrir el universo",
    },
    heroImageStyle: {
      src: "/sara1.jpg",
      size: "medium",
      shape: "rounded",
      position: "center",
    },
    gallery: {
      badge: {
        fr: "Galerie",
        en: "Gallery",
        es: "Galería",
      },
      title: {
        fr: "Œuvres",
        en: "Works",
        es: "Obras",
      },
      featuredBadge: {
        fr: "Œuvre mise en avant",
        en: "Featured work",
        es: "Obra destacada",
      },
      featuredTitle: {
        fr: "La forêt intérieure",
        en: "The Inner Forest",
        es: "El bosque interior",
      },
      featuredText: {
        fr: "À travers une pratique inspirée par la nature, Sara Rodríguez Serrano crée des espaces où le paysage devient une expérience intérieure. Entre formes organiques et présence humaine, son travail invite à une exploration sensible de la mémoire et de la transformation.",
        en: "Through a practice inspired by nature, Sara Rodríguez Serrano creates spaces where landscape becomes an inner experience. Between organic forms and human presence, her work invites a sensitive exploration of memory and transformation.",
        es: "A través de una práctica inspirada en la naturaleza, Sara Rodríguez Serrano crea espacios donde el paisaje se convierte en una experiencia interior. Entre formas orgánicas y presencia humana, su obra invita a una exploración sensible de la memoria y la transformación.",
      },
      featuredImage: "/IMAGE Grande.jpg",
      works: [
        {
          src: "/oeuvres remar2.jpg",
          title: {
            fr: "Paysage intérieur",
            en: "Inner Landscape",
            es: "Paisaje interior",
          },
          category: {
            fr: "Peinture",
            en: "Painting",
            es: "Pintura",
          },
        },
        {
          src: "/oeuvres remar3.jpg",
          title: {
            fr: "Fragments de lumière",
            en: "Fragments of Light",
            es: "Fragmentos de luz",
          },
          category: {
            fr: "Peinture",
            en: "Painting",
            es: "Pintura",
          },
        },
        {
          src: "/oeuvres remar4.jpg",
          title: {
            fr: "Éclats nocturnes",
            en: "Nocturnal Shards",
            es: "Destellos nocturnos",
          },
          category: {
            fr: "Peinture",
            en: "Painting",
            es: "Pintura",
          },
        },
      ],
    },
  },

  about: {
    badge: { fr: "À propos", en: "About", es: "Acerca de" },
    title: {
      fr: "Une pratique guidée par la mémoire, la couleur et l’émotion",
      en: "A practice guided by memory, color and emotion",
      es: "Una práctica guiada por la memoria, el color y la emoción",
    },
    introText: {
      fr: "Sara Rodríguez Serrano développe une pratique artistique sensible, où la peinture devient un espace de dialogue entre mémoire, émotion et perception. À travers des compositions organiques et intuitives, elle explore les liens subtils entre l’humain et son environnement intérieur. Son travail, marqué par une attention particulière à la couleur et à la matière, évoque des états de transformation, de silence et de présence. Chaque œuvre s’inscrit comme une trace vivante, une invitation à ralentir, ressentir et se reconnecter à une dimension plus profonde de l’expérience.",
      en: "Sara Rodríguez Serrano develops a sensitive artistic practice in which painting becomes a space of dialogue between memory, emotion, and perception. Through organic and intuitive compositions, she explores the subtle connections between the human experience and the inner landscape. Her work, marked by a careful attention to color and material, evokes states of transformation, silence, and presence. Each piece emerges as a living trace—an invitation to slow down, to feel, and to reconnect with a deeper dimension of experience.",
      es: "Sara Rodríguez Serrano desarrolla una práctica artística sensible en la que la pintura se convierte en un espacio de diálogo entre la memoria, la emoción y la percepción. A través de composiciones orgánicas e intuitivas, explora las conexiones sutiles entre la experiencia humana y el paisaje interior. Su obra, marcada por una atención cuidadosa al color y a la materia, evoca estados de transformación, silencio y presencia. Cada pieza surge como una huella viva, una invitación a desacelerar, sentir y reconectarse con una dimensión más profunda de la experiencia.",
    },
    image: "/sara1.jpg",
    profileImage: { src: "/sara1.jpg", size: "large", shape: "circle", position: "center" },
    bioTitle: { fr: "Biographie", en: "Biography", es: "Biografía" },
    bioText1: {
      fr: "Artiste visuelle basée à Montréal, sa pratique se concentre principalement sur la peinture contemporaine.",
      en: "A visual artist based in Montreal, her practice focuses mainly on contemporary painting.",
      es: "Artista visual establecida en Montreal, su práctica se centra principalmente en la pintura contemporánea.",
    },
    bioText2: {
      fr: "Guidée par un esprit naturaliste et en grande partie autodidacte, elle aborde la peinture comme une manière d’observer et de se connecter au monde qui l’entoure.",
      en: "Guided by a naturalistic and largely self-taught spirit, she approaches painting as a way of observing and connecting with the world around her.",
      es: "Guiada por un espíritu naturalista y en gran parte autodidacta, aborda la pintura como una forma de observar y conectarse con el mundo que la rodea.",
    },
    cvButtonLabel: { fr: "Télécharger CV", en: "Download CV", es: "Descargar CV" },
    parcoursButtonLabel: { fr: "Parcours artistique", en: "Artistic journey", es: "Trayectoria artística" },
    visionBadge: { fr: "Démarche artistique", en: "Artistic approach", es: "Enfoque artístico" },
    visionTitle: { fr: "Vision et pratique", en: "Vision and practice", es: "Visión y práctica" },
    visionText: {
      fr: "Je travaille principalement à la peinture à l’huile, attirée par sa texture et la profondeur expressive qu’elle permet.",
      en: "I work mainly with oil painting, drawn to its texture and the expressive depth it allows.",
      es: "Trabajo principalmente con pintura al óleo, atraída por su textura y la profundidad expresiva que permite.",
    },
    publicationsBadge: { fr: "Publications", en: "Publications", es: "Publicaciones" },
    publicationsTitle: { fr: "Sélection récente", en: "Recent selection", es: "Selección reciente" },
    publications: [
      { year: "2025", text: { fr: "Livres et projets éditoriaux - Art et Femme, édition 2.", en: "Books and editorial projects - Art et Femme, edition 2.", es: "Libros y proyectos editoriales - Art et Femme, edición 2." } },
      { year: "2025", text: { fr: "Articles de Magazine - Artist Close up magazine #36.", en: "Magazine articles - Artist Close Up magazine #36.", es: "Artículos de revista - Artist Close Up magazine #36." } },
      { year: "2025", text: { fr: "Interviews, Arts to Hearts Project.", en: "Interviews, Arts to Hearts Project.", es: "Entrevistas, Arts to Hearts Project." } },
    ],
    collectionsBadge: { fr: "Collections", en: "Collections", es: "Colecciones" },
    collectionsTitle: { fr: "Présence dans des collections privées", en: "Presence in private collections", es: "Presencia en colecciones privadas" },
    collections: [
      { text: { fr: "Certaines peintures font partie de collections privées en Espagne.", en: "Some paintings are part of private collections in Spain.", es: "Algunas pinturas forman parte de colecciones privadas en España." } },
      { text: { fr: "Certaines œuvres sont présentes dans des collections privées à Montréal, Canada.", en: "Some works are present in private collections in Montreal, Canada.", es: "Algunas obras están presentes en colecciones privadas en Montreal, Canadá." } },
      { text: { fr: "Les œuvres de l’artiste sont également représentées dans des collections privées en Europe et au Canada.", en: "The artist’s works are also represented in private collections in Europe and Canada.", es: "Las obras de la artista también están representadas en colecciones privadas en Europa y Canadá." } },
    ],
    parcoursBadge: { fr: "Parcours artistique", en: "Artistic journey", es: "Trayectoria artística" },
    parcoursTitle: { fr: "Expositions, formation et distinctions", en: "Exhibitions, education and distinctions", es: "Exposiciones, formación y distinciones" },
    exhibitionsTitle: { fr: "Expositions", en: "Exhibitions", es: "Exposiciones" },
    exhibitions: [
      { year: "2026", text: { fr: "The Inner Forest, Montréal, Canada", en: "The Inner Forest, Montreal, Canada", es: "The Inner Forest, Montreal, Canadá" } },
      { year: "2014", text: { fr: "Portraits d’animaux, Madrid, Espagne", en: "Animal portraits, Madrid, Spain", es: "Retratos de animales, Madrid, España" } },
    ],
    formationTitle: { fr: "Formation", en: "Education", es: "Formación" },
    formations: [
      { year: "2024", text: { fr: "Programme de peinture numérique, Procreate", en: "Digital painting program, Procreate", es: "Programa de pintura digital, Procreate" } },
    ],
    distinctionsTitle: { fr: "Distinctions", en: "Distinctions", es: "Distinciones" },
    distinctions: [
      { year: "2012", text: { fr: "Concours peinture rapide, Madrid", en: "Fast painting competition, Madrid", es: "Concurso de pintura rápida, Madrid" } },
    ],
  },

  contact: {
    badge: { fr: "Contact", en: "Contact", es: "Contacto" },
    title: { fr: "Entrer en contact", en: "Get in touch", es: "Ponerse en contacto" },
    text: {
      fr: "Pour toute question concernant mes œuvres, expositions ou collaborations, vous pouvez me contacter directement.",
      en: "For any questions about my works, exhibitions or collaborations, you can contact me directly.",
      es: "Para cualquier pregunta sobre mis obras, exposiciones o colaboraciones, puede contactarme directamente.",
    },
    email: "sararodriguezserrano.art@gmail.com",
    instagram: "@sarose_art",
    contactImage: { src: "/sara.jpg", size: "medium", shape: "rounded", position: "center" },
  },

  oeuvres: {
    heroBadge: { fr: "Collection", en: "Collection", es: "Colección" },
    heroTitle: { fr: "Collections de peinture à l’huile", en: "Oil Painting Collections", es: "Colecciones de pintura al óleo" },
    heroButtonText: { fr: "Voir les œuvres", en: "View works", es: "Ver obras" },
    heroImage: "/5312.jpg",
    introTitle: { fr: "Œuvres", en: "Works", es: "Obras" },
    introText: { fr: "Découvrez les œuvres de l’artiste.", en: "Discover the artist’s works.", es: "Descubra las obras de la artista." },
    quoteText: {
      fr: "Le paysage a la capacité d’offrir un contrepoids au rythme de la vie moderne.",
      en: "Landscape has the ability to offer a counterbalance to the pace of modern life.",
      es: "El paisaje tiene la capacidad de ofrecer un contrapeso al ritmo de la vida moderna.",
    },
    quoteAuthor: { fr: "Sara Rodriguez Serrano, Artiste", en: "Sara Rodriguez Serrano, Artist", es: "Sara Rodriguez Serrano, Artista" },
    quoteImage: "/IMAGE Grande.jpg",
    items: [
      {
        id: 1,
        slug: "reflexion",
        title: { fr: "Réflexion", en: "Reflection", es: "Reflexión" },
        year: "2025",
        description: { fr: "Description de l’œuvre.", en: "Description of the artwork.", es: "Descripción de la obra." },
        technique: { fr: "Huile sur toile", en: "Oil on canvas", es: "Óleo sobre lienzo" },
        dimensions: '24 x 24"',
        availability: { fr: "Disponible", en: "Available", es: "Disponible" },
        image: "/oeuvres/reflexion-cover.jpg",
        galleryTitle: { fr: "Galerie, Édimbourg, Écosse 2025", en: "Gallery, Edinburgh, Scotland 2025", es: "Galería, Edimburgo, Escocia 2025" },
        gallerySubtitle: { fr: "Exposition solo 'Beneath the Trees' · Mai 2025", en: "Solo show 'Beneath the Trees' · May 2025", es: "Exposición individual 'Beneath the Trees' · Mayo 2025" },
        galleryImages: ["/oeuvres/reflexion-1.jpg", "/oeuvres/reflexion-2.jpg", "/oeuvres/reflexion-3.jpg", "/oeuvres/reflexion-4.jpg"],
      },
      {
        id: 2,
        slug: "ray-of-light",
        title: { fr: "Rayon de lumière", en: "Ray of Light", es: "Rayo de luz" },
        year: "2025",
        description: { fr: "Description de l’œuvre.", en: "Description of the artwork.", es: "Descripción de la obra." },
        technique: { fr: "Huile sur toile", en: "Oil on canvas", es: "Óleo sobre lienzo" },
        dimensions: '24 x 24"',
        availability: { fr: "Disponible", en: "Available", es: "Disponible" },
        image: "/oeuvres/ray-of-light-cover.jpg",
        galleryTitle: { fr: "Rayon de lumière, Édimbourg, Écosse 2025", en: "Ray of Light, Edinburgh, Scotland 2025", es: "Rayo de luz, Edimburgo, Escocia 2025" },
        gallerySubtitle: { fr: "Exposition solo 'Beneath the Trees' · Mai 2025", en: "Solo show 'Beneath the Trees' · May 2025", es: "Exposición individual 'Beneath the Trees' · Mayo 2025" },
        galleryImages: ["/oeuvres/ray-of-light-1.jpg", "/oeuvres/ray-of-light-2.jpg"],
      },
    ],
  },

  portfolio: [
    { image: "/gallery/1.jpg", title: { fr: "", en: "", es: "" }, category: { fr: "", en: "", es: "" } },
    { image: "/gallery/2.jpg", title: { fr: "", en: "", es: "" }, category: { fr: "", en: "", es: "" } },
    { image: "/gallery/3.jpg", title: { fr: "", en: "", es: "" }, category: { fr: "", en: "", es: "" } },
    { image: "/gallery/4.jpg", title: { fr: "", en: "", es: "" }, category: { fr: "", en: "", es: "" } },
  ],
};