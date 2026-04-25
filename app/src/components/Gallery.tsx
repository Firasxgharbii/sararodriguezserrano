import Image from "next/image";

const works = [
  {
    src: "/oeuvres remar2.jpg",
    title: "Paysage intérieur",
    category: "Peinture",
  },
  {
    src: "/oeuvres remar3.jpg",
    title: "Fragments de lumière",
    category: "Peinture",
  },
  {
    src: "/oeuvres remar4.jpg",
    title: "Éclats nocturnes",
    category: "Peinture",
  },
];

const futuraLight = {
  fontFamily:
    '"Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
};

export default function Gallery() {
  return (
    <section id="works" className="bg-[#f8f7f4] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-24 text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.42em] text-neutral-400"
            style={futuraLight}
          >
            Galerie
          </p>

          <h2
            className="mb-6 text-[44px] leading-none text-[#8a8a8a] sm:text-[58px]"
            style={{
              ...futuraLight,
              letterSpacing: "0.02em",
            }}
          >
            Œuvres
          </h2>

          <div className="mx-auto mb-6 h-[1px] w-24 bg-neutral-300" />
        </div>

        {/* ŒUVRE PRINCIPALE */}
        <div className="mb-28">
          <article className="group">
            <div className="overflow-hidden bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <div className="relative h-[72vh] min-h-[420px] w-full overflow-hidden">
                <Image
                  src="/IMAGE Grande.jpg"
                  alt="La forêt intérieure"
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="mt-10 max-w-3xl">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.38em] text-neutral-400"
                style={futuraLight}
              >
                Œuvre mise en avant
              </p>

              <h3
                className="text-[36px] leading-tight text-[#8a8a8a] sm:text-[52px]"
                style={{
                  ...futuraLight,
                  letterSpacing: "0.01em",
                }}
              >
                La forêt intérieure
              </h3>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-neutral-600">
                À travers une pratique inspirée par la nature, Sara Rodríguez
                Serrano crée des espaces où le paysage devient une expérience
                intérieure. Entre formes organiques et présence humaine, son
                travail invite à une exploration sensible de la mémoire et de la
                transformation.
              </p>
            </div>
          </article>
        </div>

        {/* GRILLE */}
        <div className="grid gap-14 md:grid-cols-3">
          {works.map((work, index) => (
            <article key={index} className="group">
              <div className="overflow-hidden bg-white shadow-[0_14px_36px_rgba(0,0,0,0.05)]">
                <div className="relative h-[360px] w-full overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.34em] text-neutral-400"
                  style={futuraLight}
                >
                  {work.category}
                </p>

                <h3
                  className="text-[27px] leading-snug text-[#8a8a8a]"
                  style={futuraLight}
                >
                  {work.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}