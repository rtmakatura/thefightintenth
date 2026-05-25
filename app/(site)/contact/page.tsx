export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

export const metadata = { title: "Contact | The Fightin' Tenth" };

export default async function ContactPageRoute() {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);
  const email = settings?.contactEmail;

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <FadeIn className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
          Get in touch
        </p>
        <SectionHeading light>Contact</SectionHeading>
        <p className="mt-4 text-base md:text-lg text-tan max-w-2xl">
          Press, speaking, or general inquiries.
        </p>
        {email && (
          <p className="mt-3 text-sm text-tan">
            Or email directly:{" "}
            <a
              href={`mailto:${email}`}
              className="text-accent hover:underline"
            >
              {email}
            </a>
          </p>
        )}
      </FadeIn>

      <FadeIn delay={100}>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs uppercase tracking-widest text-tan mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full bg-rich-mid border border-rich-mid focus:border-accent outline-none px-4 py-3 text-text-light"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-widest text-tan mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full bg-rich-mid border border-rich-mid focus:border-accent outline-none px-4 py-3 text-text-light"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-widest text-tan mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full bg-rich-mid border border-rich-mid focus:border-accent outline-none px-4 py-3 text-text-light"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-dark text-text-light text-sm font-medium tracking-wide transition-colors"
          >
            Send message
          </button>
        </form>
      </FadeIn>
    </section>
  );
}
