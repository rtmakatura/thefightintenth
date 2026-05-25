export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { allEndorsementsQuery } from "@/lib/sanity/queries";
import type { Endorsement } from "@/lib/sanity/types";

export const metadata = { title: "Endorsements | The Fightin' Tenth" };

const FEATURED_NAME = 'Edward "Julio" Houle';

type RankKind =
  | "first-lt"
  | "lt-col"
  | "col"
  | "brig-gen"
  | "tsgt"
  | "civilian-author";

const RANK_BY_NAME: Record<string, RankKind> = {
  'Joey "BooBoo" Booher': "first-lt",
  'Terry "Ragin" Bull': "lt-col",
  "Tod Gohl": "tsgt",
  'Doug "Frenchie" French': "col",
  'Paul "Doodle" Dordal': "brig-gen",
  "Stephen Reed": "civilian-author",
  "Richard 'Mongoose' Hess": "lt-col",
};

const INSIGNIA_SRC: Record<RankKind, string> = {
  "first-lt": "/insignia/US-O2_insignia.svg",
  "lt-col": "/insignia/US-O5_insignia.svg",
  col: "/insignia/US-O6_insignia.svg",
  "brig-gen": "/insignia/US-O7_insignia.svg",
  tsgt: "/insignia/tsgt.svg",
  "civilian-author": "/insignia/book.svg",
};

export default async function EndorsementsPageRoute() {
  const endorsements = await sanityFetch<Endorsement[]>(allEndorsementsQuery);

  const featured = endorsements.find((e) => e.name === FEATURED_NAME);
  const rest = endorsements.filter((e) => e.name !== FEATURED_NAME);

  return (
    <section className="bg-dark-bg">
      <div className="max-w-[780px] mx-auto px-6 py-20 md:py-28">
        <FadeIn className="mb-16 text-center">
          <SectionHeading light center>
            Endorsements
          </SectionHeading>
        </FadeIn>

        {featured && (
          <FadeIn delay={120} className="mb-20">
            <FeaturedQuote endorsement={featured} />
          </FadeIn>
        )}

        <div aria-hidden className="mx-auto mb-14 h-px w-16 bg-accent/40" />

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-3 top-3 bottom-3 w-px bg-accent/40"
          />

          <ul className="flex flex-col gap-12 pl-14 md:pl-16">
            {rest.map((e, i) => {
              const rank =
                (e.rank as RankKind | undefined) ?? RANK_BY_NAME[e.name];
              return (
                <li key={e._id} className="relative">
                  <div
                    aria-hidden
                    className="absolute top-9 -left-14 md:-left-16 flex items-center gap-2 md:gap-3"
                  >
                    {rank && <RankMark kind={rank} />}
                    <span className="h-px w-3 md:w-4 bg-accent/60" />
                  </div>
                  <FadeIn delay={i * 60}>
                    <EndorsementBlockquote endorsement={e} />
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RankMark({ kind }: { kind: RankKind }) {
  const src = INSIGNIA_SRC[kind];
  return (
    <span
      aria-hidden
      className="block h-6 w-6 flex-shrink-0 bg-accent"
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

function FeaturedQuote({ endorsement }: { endorsement: Endorsement }) {
  return (
    <figure className="text-center">
      <div
        aria-hidden
        className="font-display italic text-accent/40 leading-none select-none"
        style={{ fontSize: "6rem" }}
      >
        &ldquo;
      </div>
      <blockquote className="-mt-4 md:-mt-6">
        <p className="font-display italic text-text-light text-xl md:text-2xl lg:text-[1.75rem] leading-snug text-balance">
          {endorsement.quote}
        </p>
      </blockquote>
      <figcaption className="mt-10">
        <span aria-hidden className="mx-auto mb-5 block h-px w-16 bg-accent/60" />
        <p className="font-body uppercase tracking-[0.2em] text-sm text-accent">
          {endorsement.name}
        </p>
        <p className="mt-2 text-text-light/60 text-sm">
          {endorsement.title}
          {endorsement.detail && (
            <>
              {" · "}
              <span className="italic">{endorsement.detail}</span>
            </>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

function EndorsementBlockquote({ endorsement }: { endorsement: Endorsement }) {
  return (
    <article
      className="bg-white rounded-md px-8 py-8"
      style={{
        boxShadow:
          "0 4px 20px -4px rgba(20, 20, 40, 0.12), 0 2px 8px -2px rgba(72, 148, 208, 0.08)",
      }}
    >
      <blockquote>
        <p className="font-display italic text-text-sec text-base md:text-lg leading-relaxed">
          &ldquo;{endorsement.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-6">
        <p className="font-bold text-text-pri">{endorsement.name}</p>
        {endorsement.title && (
          <p className="text-text-sec text-sm mt-0.5">{endorsement.title}</p>
        )}
        {endorsement.detail && (
          <p className="italic text-accent-dark text-sm mt-0.5">
            {endorsement.detail}
          </p>
        )}
      </footer>
    </article>
  );
}
