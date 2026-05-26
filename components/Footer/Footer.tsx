import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brandLine}>The Fightin&apos; Tenth</div>
      <div className={styles.tag}>A memoir by Captain Michael Makatura</div>

      <div className={styles.socials}>
        <a href="#" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M9.5 16V8.5h2.4l.4-2.8H9.5V4c0-.8.2-1.4 1.4-1.4h1.5V.1A20 20 0 0 0 10.2 0c-2.2 0-3.7 1.3-3.7 3.7v2H4v2.8h2.5V16h3z" />
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.5 4.5A1.5 1.5 0 1 1 3.5 1.5a1.5 1.5 0 0 1 0 3zM2 6h3v9H2V6zm5 0h2.9v1.2c.4-.7 1.4-1.4 2.7-1.4 2.9 0 3.4 1.9 3.4 4.4V15H13V11c0-1 0-2.4-1.5-2.4-1.5 0-1.7 1.2-1.7 2.4V15H7V6z" />
          </svg>
        </a>
        <a href="#" aria-label="Instagram">
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
      </div>

      <div className={styles.pubText}>Published by Koehler Books</div>
      <div className={styles.copy}>
        © 2026 Michael Makatura · Published by Koehler Books · All rights reserved
      </div>
    </footer>
  );
}
