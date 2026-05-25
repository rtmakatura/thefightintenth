export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { photosQuery } from "@/lib/sanity/queries";
import type { Photo } from "@/lib/sanity/types";

export const metadata = { title: "Photos | The Fightin' Tenth" };

export default async function PhotosPageRoute() {
  const photos = await sanityFetch<Photo[]>(photosQuery);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          Gallery
        </p>
        <SectionHeading light>Photos</SectionHeading>
        <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
          From the cockpit, the squadron, and the road.
        </p>
      </FadeIn>

      {photos.length === 0 ? (
        <FadeIn delay={100}>
          <p className="text-tan italic">No photos uploaded yet.</p>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => {
            const url = urlFor(photo.image).width(800).height(800).fit("crop").url();
            const alt =
              (photo.image as { alt?: string }).alt ?? photo.caption ?? "";
            return (
              <FadeIn key={photo._id} delay={i * 50}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={alt}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                  {photo.caption && (
                    <figcaption className="mt-2 text-xs text-tan">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              </FadeIn>
            );
          })}
        </div>
      )}
    </section>
  );
}
