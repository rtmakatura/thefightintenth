'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
};

/**
 * Wraps children in a div that fades + translates up once it scrolls into
 * view. Uses IntersectionObserver — see globals.css `.reveal` / `.in`.
 */
export default function Reveal({ children, delay, className = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['reveal', delay ? `delay-${delay}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
