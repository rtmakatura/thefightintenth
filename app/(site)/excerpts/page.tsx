export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import PortableText from "@/components/PortableText";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { excerptsQuery } from "@/lib/sanity/queries";
import type { Excerpt } from "@/lib/sanity/types";

export const metadata = { title: "Excerpts | The Fightin' Tenth" };

export default async function ExcerptsPageRoute() {
  const excerpts = await sanityFetch<Excerpt[]>(excerptsQuery);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          From the book
        </p>
        <SectionHeading light>Excerpts</SectionHeading>
        <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
          Selected passages.
        </p>
      </FadeIn>

      {excerpts.length === 0 ? (
        <FadeIn delay={100}>
          <p className="text-tan italic">No excerpts published yet.</p>
        </FadeIn>
      ) : (
        <ul className="space-y-16">
          {excerpts.map((x, i) => {
            const heroUrl = x.heroImage
              ? urlFor(x.heroImage).width(1400).quality(85).url()
              : null;
            return (
              <FadeIn key={x._id} delay={i * 60}>
                <li className="border-b border-rich-mid pb-12 last:border-b-0">
                  <p className="text-xs uppercase tracking-widest text-accent mb-3">
                    {x.chapterLabel}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-text-light">
                    {x.title}
                  </h3>

                  {heroUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={heroUrl}
                      alt={x.heroImage?.alt ?? ""}
                      className="mt-6 w-full rounded-md"
                    />
                  )}

                  {x.body && x.body.length > 0 && (
                    <article className="prose prose-invert max-w-none mt-6">
                      <div className="text-tan space-y-4 leading-relaxed">
                        <PortableText value={x.body} />
                      </div>
                    </article>
                  )}
                </li>
              </FadeIn>
            );
          })}
        </ul>
      )}
    </section>
  );
}
