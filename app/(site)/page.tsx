export const revalidate = 60;

import FadeIn from "@/components/FadeIn";
import PortableText from "@/components/PortableText";
import SectionHeading from "@/components/SectionHeading";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  bookQuery,
  featuredEndorsementsQuery,
  homePageQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import { releaseStatus } from "@/lib/sanity/release";
import type {
  Book,
  Endorsement,
  HomePage,
  SiteSettings,
} from "@/lib/sanity/types";

const FALLBACK_HERO = "/images/hero_.jpg";
const FALLBACK_COVER =
  "https://images.squarespace-cdn.com/content/v1/68c98d6e69ed0e162cce3f00/76863b32-70dd-4157-baa0-33e41bb1362f/Cover+Finalist.png";
const FALLBACK_COCKPIT =
  "https://images.squarespace-cdn.com/content/v1/68c98d6e69ed0e162cce3f00/11097424-1688-4f9c-858f-87ee13301a3c/IMG_0081.JPG";

function truncateQuote(text: string, max = 350): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:!?\s]+$/, "") + "…";
}

export default async function HomePage() {
  const [settings, book, home, featured] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Book | null>(bookQuery),
    sanityFetch<HomePage | null>(homePageQuery),
    sanityFetch<Endorsement[]>(featuredEndorsementsQuery),
  ]);

  const status = releaseStatus(book?.pubDate);
  const preorderUrl = settings?.preorderUrl ?? "#";
  const author = settings?.author ?? "Captain Michael Makatura";
  const siteTitle = settings?.title ?? "THE FIGHTIN' TENTH";
  const subtitle = settings?.subtitle ?? "Cold War to Desert Storm";

  const heroUrl = home?.heroImage
    ? urlFor(home.heroImage).width(2400).quality(85).url()
    : FALLBACK_HERO;
  const coverUrl = book?.coverImage
    ? urlFor(book.coverImage).width(720).quality(90).url()
    : FALLBACK_COVER;
  const cockpitUrl = home?.ctaBannerImage
    ? urlFor(home.ctaBannerImage).width(2000).quality(85).url()
    : FALLBACK_COCKPIT;

  return (
    <>
      <HeroSection
        heroUrl={heroUrl}
        kicker={home?.heroKicker ?? `A Memoir by ${author}`}
        title={siteTitle}
        subtitle={subtitle}
        statusLine={status.statusLine}
        ctaLabel={status.ctaLabel}
        preorderUrl={preorderUrl}
      />
      <AboutBookSection
        coverUrl={coverUrl}
        siteTitle={siteTitle}
        description={book?.description}
        pageCount={book?.pageCount}
        softcoverPrice={book?.softcover?.price}
        hardcoverPrice={book?.hardcover?.price}
        ctaLabel={status.ctaLabel}
        preorderUrl={preorderUrl}
      />
      <EndorsementPreviewSection endorsements={featured} />
      <CtaBannerSection
        backgroundUrl={cockpitUrl}
        quote={home?.ctaBannerQuote}
        ctaLabel={status.ctaLabel}
        preorderUrl={preorderUrl}
      />
    </>
  );
}

function HeroSection({
  heroUrl,
  kicker,
  title,
  subtitle,
  statusLine,
  ctaLabel,
  preorderUrl,
}: {
  heroUrl: string;
  kicker: string;
  title: string;
  subtitle: string;
  statusLine: string;
  ctaLabel: string;
  preorderUrl: string;
}) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover animate-slow-zoom will-change-transform"
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,24,0.88) 0%, rgba(20,20,24,0.65) 50%, rgba(20,20,24,0.80) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
        <p
          className="text-xs sm:text-sm uppercase tracking-[0.35em] text-accent mb-6"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {kicker}
        </p>

        <h1
          className="font-display font-bold text-text-light leading-[1.05]"
          style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            textShadow:
              "0 2px 20px rgba(0,0,0,0.7), 0 4px 60px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </h1>

        <p
          className="mt-4 font-display italic text-tan text-xl md:text-2xl"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {subtitle}
        </p>

        <div className="mx-auto my-8 h-px w-[60px] bg-accent" />

        <p
          className="text-sm md:text-base text-text-light/85 tracking-wide"
          style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          {statusLine}
        </p>

        <div className="mt-10">
          <a
            href={preorderUrl}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium uppercase tracking-[0.2em] text-text-light bg-transparent border border-[rgba(237,237,240,0.4)] transition-all duration-300 hover:bg-[rgba(237,237,240,0.08)] hover:border-[rgba(237,237,240,0.8)] hover:-translate-y-0.5"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutBookSection({
  coverUrl,
  siteTitle,
  description,
  pageCount,
  softcoverPrice,
  hardcoverPrice,
  ctaLabel,
  preorderUrl,
}: {
  coverUrl: string;
  siteTitle: string;
  description: Book["description"];
  pageCount?: number;
  softcoverPrice?: string;
  hardcoverPrice?: string;
  ctaLabel: string;
  preorderUrl: string;
}) {
  return (
    <section className="bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid gap-12 md:gap-16 md:grid-cols-[340px_1fr] items-center">
        <FadeIn className="flex justify-center md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={`${siteTitle} book cover`}
            className="w-full max-w-[260px] md:max-w-[340px] h-auto"
            style={{
              boxShadow:
                "0 30px 60px -12px rgba(20, 20, 24, 0.55), 0 18px 36px -18px rgba(48, 112, 168, 0.35), 0 0 0 1px rgba(20,20,24,0.08)",
            }}
          />
        </FadeIn>

        <FadeIn delay={150}>
          <SectionHeading>About the Book</SectionHeading>

          <div className="mt-6 space-y-5 text-text-sec text-base md:text-lg leading-relaxed">
            <PortableText value={description} />
          </div>

          {(pageCount || softcoverPrice || hardcoverPrice) && (
            <dl className="mt-10 pt-6 border-t border-tan/40 flex flex-wrap gap-x-10 gap-y-3">
              {pageCount && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-accent">
                    Pages
                  </dt>
                  <dd className="text-text-pri font-medium mt-1">{pageCount}</dd>
                </div>
              )}
              {softcoverPrice && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-accent">
                    Softcover
                  </dt>
                  <dd className="text-text-pri font-medium mt-1">{softcoverPrice}</dd>
                </div>
              )}
              {hardcoverPrice && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-accent">
                    Hardcover
                  </dt>
                  <dd className="text-text-pri font-medium mt-1">{hardcoverPrice}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-10">
            <a
              href={preorderUrl}
              className="inline-flex items-center justify-center px-8 py-4 bg-rich-mid border-2 border-accent text-text-light text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent hover:border-accent-dark"
            >
              {ctaLabel}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function EndorsementPreviewSection({
  endorsements,
}: {
  endorsements: Endorsement[];
}) {
  if (endorsements.length === 0) return null;
  const delays = [0, 120, 240];

  return (
    <section className="bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <FadeIn className="mb-14">
          <SectionHeading light center>
            What They&rsquo;re Saying
          </SectionHeading>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {endorsements.slice(0, 3).map((e, i) => (
            <FadeIn
              key={e._id}
              delay={delays[i] ?? 0}
              className="md:h-full md:flex"
            >
              <PreviewCard endorsement={e} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ endorsement }: { endorsement: Endorsement }) {
  return (
    <article className="w-full md:h-full flex flex-col rounded-2xl bg-white/[0.06] border border-white/[0.12] p-8 transition-colors duration-300 hover:bg-white/[0.09] hover:border-white/[0.20]">
      <p className="flex-1 font-display italic text-text-light/90 text-base md:text-lg leading-relaxed">
        &ldquo;{truncateQuote(endorsement.quote)}&rdquo;
      </p>

      <div className="mt-auto pt-5 border-t border-white/[0.12]">
        <p className="text-accent font-medium tracking-wide">
          {endorsement.name}
        </p>
        {endorsement.title && (
          <p className="text-tan text-sm mt-0.5">{endorsement.title}</p>
        )}
      </div>
    </article>
  );
}

function CtaBannerSection({
  backgroundUrl,
  quote,
  ctaLabel,
  preorderUrl,
}: {
  backgroundUrl: string;
  quote?: string;
  ctaLabel: string;
  preorderUrl: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-dark-bg"
        style={{ opacity: 0.82 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <FadeIn>
          {quote && (
            <p className="font-display italic text-tan text-xl md:text-2xl lg:text-3xl leading-relaxed">
              {quote}
            </p>
          )}

          <div className="mt-10">
            <a
              href={preorderUrl}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-text-light bg-transparent border border-[rgba(237,237,240,0.4)] transition-all duration-300 hover:bg-[rgba(237,237,240,0.08)] hover:border-[rgba(237,237,240,0.8)] hover:-translate-y-0.5"
            >
              {ctaLabel}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
