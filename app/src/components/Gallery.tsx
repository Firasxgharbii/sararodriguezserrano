"use client";

import Image from "next/image";

const works = [
  {
    src: "/oeuvres remar2.jpg",
    title: "PAYSAGE INTÉRIEUR",
    category: "PEINTURE",
  },
  {
    src: "/oeuvres remar3.jpg",
    title: "FRAGMENTS DE LUMIÈRE",
    category: "PEINTURE",
  },
  {
    src: "/oeuvres remar4.jpg",
    title: "ÉCLATS NOCTURNES",
    category: "PEINTURE",
  },
];

const futuraLight = {
  fontFamily:
    '"FuturaLightCustom", "Futura W02 Light", "Futura PT", Futura, "Avenir Next", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 300,
  textTransform: "uppercase" as const,
};

export default function Gallery() {
  return (
    <section id="works" className="bg-[#f8f7f4] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 text-center">
          <p
            className="mb-4 text-[10px] tracking-[0.42em] text-neutral-400"
            style={futuraLight}
          >
            GALERIE
          </p>

          <h2
            className="mb-6 text-[44px] leading-none text-[#8a8a8a] sm:text-[58px]"
            style={{
              ...futuraLight,
              letterSpacing: "0.12em",
            }}
          >
            ŒUVRES
          </h2>

          <div className="mx-auto mb-6 h-[1px] w-24 bg-neutral-300" />
        </div>

        <div className="mb-28">
          <article className="group">
            <div className="overflow-hidden bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <div className="relative h-[72vh] min-h-[420px] w-full overflow-hidden">
                <Image
                  src="/IMAGE Grande.jpg"
                  alt="LA FORÊT INTÉRIEURE"
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="mt-10 max-w-3xl">
              <p
                className="mb-3 text-[10px] tracking-[0.38em] text-neutral-400"
                style={futuraLight}
              >
                ŒUVRE MISE EN AVANT
              </p>

              <h3
                className="text-[36px] leading-tight text-[#8a8a8a] sm:text-[52px]"
                style={{
                  ...futuraLight,
                  letterSpacing: "0.08em",
                }}
              >
                LA FORÊT INTÉRIEURE
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
                  className="mb-2 text-[10px] tracking-[0.34em] text-neutral-400"
                  style={futuraLight}
                >
                  {work.category}
                </p>

                <h3
                  className="text-[27px] leading-snug text-[#8a8a8a]"
                  style={{
                    ...futuraLight,
                    letterSpacing: "0.06em",
                  }}
                >
                  {work.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: "FuturaLightCustom";
          src: url("/fonts/Futura-Light.woff2") format("woff2");
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </section>
  );
}