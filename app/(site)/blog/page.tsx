export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import PortableText from "@/components/PortableText";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { blogPostsQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/lib/sanity/types";

export const metadata = { title: "Blog | The Fightin' Tenth" };

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPageRoute() {
  const posts = await sanityFetch<BlogPost[]>(blogPostsQuery);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          Field notes
        </p>
        <SectionHeading light>Blog</SectionHeading>
        <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
          Dispatches, updates, and behind-the-scenes.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <FadeIn delay={100}>
          <p className="text-tan italic">No posts yet.</p>
        </FadeIn>
      ) : (
        <ul className="space-y-12">
          {posts.map((post, i) => {
            const featuredUrl = post.featuredImage
              ? urlFor(post.featuredImage).width(1200).quality(85).url()
              : null;
            return (
              <FadeIn key={post._id} delay={i * 60}>
                <li className="border-b border-rich-mid pb-12 last:border-b-0">
                  <p className="text-xs uppercase tracking-widest text-tan mb-2">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-text-light">
                    {post.title}
                  </h3>

                  {featuredUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={featuredUrl}
                      alt={post.featuredImage?.alt ?? ""}
                      className="mt-5 w-full rounded-md"
                    />
                  )}

                  {post.summary && (
                    <p className="text-tan mt-4 leading-relaxed">{post.summary}</p>
                  )}

                  {post.body && post.body.length > 0 && (
                    <div className="text-tan mt-4 space-y-4 leading-relaxed">
                      <PortableText value={post.body} />
                    </div>
                  )}

                  {post.signOff && (
                    <p className="mt-6 italic text-tan/80">— {post.signOff}</p>
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
