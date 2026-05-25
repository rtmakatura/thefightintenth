"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_LINKS } from "@/lib/nav";

export default function Navbar({ title }: { title: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        scrolled || open
          ? "bg-[rgba(20,20,24,0.85)] backdrop-blur-md border-b border-rich-mid/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display uppercase tracking-[0.18em] text-sm sm:text-base text-text-light hover:text-accent transition-colors duration-300"
        >
          {title}
        </Link>

        <ul className="hidden min-[860px]:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? "text-accent"
                      : "text-tan hover:text-text-light"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="min-[860px]:hidden relative w-10 h-10 grid place-items-center text-text-light"
        >
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-transform duration-300 ease-out ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transition-transform duration-300 ease-out ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      <div
        className={`min-[860px]:hidden fixed inset-x-0 top-16 bottom-0 bg-[rgba(20,20,24,0.98)] transition-opacity duration-400 ease-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-7 h-full -mt-16 px-6">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-display text-2xl tracking-wide transition-colors duration-300 ${
                    active
                      ? "text-accent"
                      : "text-text-light hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
