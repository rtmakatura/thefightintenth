const PUBLISHER_LOGO_URL =
  "https://images.squarespace-cdn.com/content/v1/68c98d6e69ed0e162cce3f00/630b75c2-b3fe-451a-8859-0d708f67aa9f/2025-11-11+20_59_54-Website+Checklist+-+Google+Docs+%E2%80%94+Mozilla+Firefox.png";

const SOCIAL_LABELS = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  instagram: "Instagram",
} as const;

type SocialKey = keyof typeof SOCIAL_LABELS;

type FooterProps = {
  title: string;
  social?: Partial<Record<SocialKey, string>>;
};

export default function Footer({ title, social = {} }: FooterProps) {
  const socialEntries = (Object.keys(SOCIAL_LABELS) as SocialKey[])
    .filter((key) => Boolean(social[key]))
    .map((key) => ({ key, href: social[key]!, label: SOCIAL_LABELS[key] }));

  return (
    <footer className="bg-dark-bg border-t border-rich-mid/40">
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center gap-8 text-center">
        <p className="font-display uppercase tracking-[0.25em] text-tan text-base">
          {title}
        </p>

        {socialEntries.length > 0 && (
          <ul className="flex items-center gap-8">
            {socialEntries.map(({ key, href, label }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-tan hover:text-accent transition-colors duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <a
          href="https://www.koehlerbooks.com"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-50 hover:opacity-90 transition-opacity duration-300"
          aria-label="Koehler Books"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PUBLISHER_LOGO_URL}
            alt="Koehler Books"
            className="h-10 w-auto"
            loading="lazy"
          />
        </a>

        <p className="text-xs text-tan/50 tracking-wide">
          © 2025 Michael Makatura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
