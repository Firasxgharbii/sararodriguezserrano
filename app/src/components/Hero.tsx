import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#f8f7f4]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">

        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">

            <div className="relative h-[620px] w-full">

              <Image
                src="/sara1.jpg"
                alt="Sara Rodriguez Serrano"
                fill
                priority
                className="object-cover"
              />

            </div>

          </div>

          {/* TEXT */}
          <div className="flex flex-col justify-center">

            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500">
              Artiste contemporaine
            </p>

            <h1 className="mb-6 font-serif text-6xl leading-[1.1] text-neutral-900">
              Sara Rodriguez
              <br />
              Serrano
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-8 text-neutral-700">
              Sara Rodriguez Serrano est une artiste contemporaine dont le
              travail explore l’identité, la perception et les paysages
              émotionnels à travers des compositions vibrantes. Sa recherche
              artistique met en lumière la relation entre la couleur, le
              mouvement et l’expérience humaine.
            </p>

            <div className="flex gap-6">

              <a
                href="#works"
                className="rounded-md bg-neutral-900 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-neutral-700"
              >
                Voir les œuvres
              </a>


            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
