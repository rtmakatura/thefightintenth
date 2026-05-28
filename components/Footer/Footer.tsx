import styles from './Footer.module.css';

type Props = {
  title?: string;
  author?: string;
  publisher?: string;
  social?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export default function Footer({
  title = "The Fightin' Tenth",
  author = 'Captain Michael Makatura',
  publisher = 'Koehler Books',
  social,
}: Props = {}) {
  const hasSocial = !!(social?.facebook || social?.linkedin || social?.instagram);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.brandLine}>{title}</div>
      <div className={styles.tag}>A memoir by {author}</div>

      {hasSocial && (
        <div className={styles.socials}>
          {social?.facebook && (
            <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M9.5 16V8.5h2.4l.4-2.8H9.5V4c0-.8.2-1.4 1.4-1.4h1.5V.1A20 20 0 0 0 10.2 0c-2.2 0-3.7 1.3-3.7 3.7v2H4v2.8h2.5V16h3z" />
              </svg>
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3.5 4.5A1.5 1.5 0 1 1 3.5 1.5a1.5 1.5 0 0 1 0 3zM2 6h3v9H2V6zm5 0h2.9v1.2c.4-.7 1.4-1.4 2.7-1.4 2.9 0 3.4 1.9 3.4 4.4V15H13V11c0-1 0-2.4-1.5-2.4-1.5 0-1.7 1.2-1.7 2.4V15H7V6z" />
              </svg>
            </a>
          )}
          {social?.instagram && (
            <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" />
                <circle cx="8" cy="8" r="3.2" />
                <circle cx="11.6" cy="4.4" r="0.7" fill="currentColor" />
              </svg>
            </a>
          )}
        </div>
      )}

      <div className={styles.pubText}>Published by {publisher}</div>
      <div className={styles.copy}>
        © {year} {author} · Published by {publisher} · All rights reserved
      </div>
    </footer>
  );
}
