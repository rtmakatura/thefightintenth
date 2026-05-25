export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import PortableText from "@/components/PortableText";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { aboutPageQuery } from "@/lib/sanity/queries";
import type { AboutPage } from "@/lib/sanity/types";

export const metadata = { title: "About | The Fightin' Tenth" };

export default async function AboutPageRoute() {
  const about = await sanityFetch<AboutPage | null>(aboutPageQuery);

  const portraitUrl = about?.portrait
    ? urlFor(about.portrait).width(800).quality(85).url()
    : null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        {about?.kicker && (
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
            {about.kicker}
          </p>
        )}
        <SectionHeading light>About</SectionHeading>
        {about?.lede && (
          <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
            {about.lede}
          </p>
        )}
      </FadeIn>

      {portraitUrl && (
        <FadeIn delay={50} className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitUrl}
            alt={about?.portrait?.alt ?? ""}
            className="w-full max-w-sm mx-auto rounded-md"
          />
        </FadeIn>
      )}

      <FadeIn delay={100}>
        <div className="space-y-5 text-tan leading-relaxed">
          <PortableText value={about?.body} />
          {about?.personalNote && (
            <p className="italic text-tan/80">{about.personalNote}</p>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
