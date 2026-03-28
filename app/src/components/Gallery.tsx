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

export default function Gallery() {
  return (
    <section id="works" className="bg-[#f8f7f4] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-24 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-neutral-400">
            Galerie
          </p>

          <h2 className="mb-6 font-serif text-5xl text-neutral-900 sm:text-6xl">
            Œuvres
          </h2>

          <div className="mx-auto mb-6 h-[1px] w-24 bg-neutral-300"></div>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-500">
            Une exploration picturale de la couleur, de la mémoire et des
            paysages émotionnels qui composent mon univers artistique.
          </p>
        </div>

        {/* ŒUVRE PRINCIPALE */}
        <div className="mb-28">
          <article className="group">
            <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
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

            <div className="mt-8 max-w-3xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.38em] text-neutral-400">
                Œuvre mise en avant
              </p>

              <h3 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl">
                La forêt intérieure
              </h3>

              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-neutral-600">
                Une immersion picturale où la lumière et la couleur deviennent
                les vecteurs d’une expérience sensorielle et introspective.
              </p>
            </div>
          </article>
        </div>

        {/* GRILLE */}
        <div className="grid gap-14 md:grid-cols-3">
          {works.map((work, index) => (
            <article key={index} className="group">
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_14px_36px_rgba(0,0,0,0.05)]">
                <div className="relative h-[360px] w-full overflow-hidden">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-[11px] uppercase tracking-[0.34em] text-neutral-400">
                  {work.category}
                </p>

                <h3 className="font-serif text-2xl leading-snug text-neutral-900">
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