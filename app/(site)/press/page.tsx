export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { pressItemsQuery } from "@/lib/sanity/queries";
import type { PressItem } from "@/lib/sanity/types";

export const metadata = { title: "Press | The Fightin' Tenth" };

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function PressPageRoute() {
  const items = await sanityFetch<PressItem[]>(pressItemsQuery);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          In the news
        </p>
        <SectionHeading light>Press</SectionHeading>
        <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
          Coverage, interviews, and features.
        </p>
      </FadeIn>

      {items.length === 0 ? (
        <FadeIn delay={100}>
          <p className="text-tan italic">No press coverage published yet.</p>
        </FadeIn>
      ) : (
        <FadeIn delay={100}>
          <ul className="divide-y divide-rich-mid border-y border-rich-mid">
            {items.map((item) => {
              const dateLabel = formatDate(item.date);
              return (
                <li key={item._id} className="py-6 flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-widest text-tan">
                    {[item.outlet, dateLabel].filter(Boolean).join(" · ")}
                  </p>
                  <p className="font-display text-xl text-text-light">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {item.headline}
                    </a>
                  </p>
                  {item.description && (
                    <p className="text-tan text-sm">{item.description}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </FadeIn>
      )}
    </section>
  );
}
