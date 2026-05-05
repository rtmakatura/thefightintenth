'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/lib/content';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  // Only the home hero gets a transparent nav. Every other route opens with a
  // dark PageHead, so the nav should be solid from the first paint.
  const transparent = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close panel on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = !transparent || scrolled;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(href + '/');

  return (
    <nav
      ref={navRef}
      className={[
        styles.nav,
        solid ? styles.solid : '',
        open ? styles.expanded : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Home">
          <span className={styles.brandTick} aria-hidden="true" />
          The Fightin&apos; Tenth
        </Link>

        <div className={styles.links} aria-hidden={!open}>
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={[styles.link, isActive(l.href) ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={[styles.burger, open ? styles.burgerOpen : ''].filter(Boolean).join(' ')}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>
    </nav>
  );
}
