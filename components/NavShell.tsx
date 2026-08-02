'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CloseIcon, MenuIcon, ProMallMark } from '@/components/icons';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { NavScrim } from '@/components/NavScrim';
import { revealStyle, useRevealState } from '@/components/Reveal';
import type { NavLink } from '@/types/content';

const DRAWER_ID = 'nav-drawer';
const NAV_REVEAL_STYLE = revealStyle({ distance: -36 });

type NavShellProps = {
  brand: string;
  links: NavLink[];
  cta: string;
  ctaHref: string;
  homeHref: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  skipToContent: string;
  languageLabel: string;
};

export function NavShell({
  brand,
  links,
  cta,
  ctaHref,
  homeHref,
  menuOpenLabel,
  menuCloseLabel,
  skipToContent,
  languageLabel,
}: NavShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { ref: headerRef, dataReveal } = useRevealState<HTMLElement>();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:inline-flex focus:h-9 focus:items-center focus:rounded-full focus:bg-[var(--pw-cream)] focus:px-5 focus:text-sm focus:text-[var(--pw-black)]"
      >
        {skipToContent}
      </a>

      <header
        ref={headerRef}
        data-reveal={dataReveal}
        style={NAV_REVEAL_STYLE}
        className="pw-reveal pw-section fixed top-0 start-0 end-0 z-50"
      >
        <NavScrim />

        <div className="pw-container relative flex h-12 items-center justify-between">
          <Link
            href={homeHref}
            className="pw-link relative z-10 flex items-center gap-2 text-[var(--pw-cream)]"
          >
            <ProMallMark size={28} />
            <span className="text-sm">{brand}</span>
          </Link>

          <nav className="pointer-events-none absolute inset-0 hidden items-center justify-center min-[1200px]:flex">
            <ul className="pointer-events-auto flex items-center gap-10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="pw-link text-sm text-[var(--pw-text-dim)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <div className="hidden min-[1200px]:block">
              <LocaleSwitcher label={languageLabel} />
            </div>

            <div className="hidden min-[1200px]:block">
              <Link href={ctaHref} className="pw-button h-9!">
                {cta}
              </Link>
            </div>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={DRAWER_ID}
              aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
              onClick={() => setMenuOpen((current) => !current)}
              className="flex size-9 items-center justify-center rounded-full text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)] [transition:background-color_0.4s_var(--pw-ease),color_0.4s_var(--pw-ease)] hover:bg-[rgba(255,255,255,0.1)] min-[1200px]:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div
        id={DRAWER_ID}
        hidden={!menuOpen}
        className="fixed inset-0 z-40 flex-col items-center justify-center gap-8 bg-[rgba(0,0,0,0.72)] backdrop-blur-[12px] data-[open=true]:flex min-[1200px]:hidden!"
        data-open={menuOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="pw-link text-xl text-[var(--pw-text-dim)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={ctaHref} onClick={closeMenu} className="pw-button">
          {cta}
        </Link>

        <LocaleSwitcher label={languageLabel} />
      </div>
    </>
  );
}
