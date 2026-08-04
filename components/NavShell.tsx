'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CloseIcon, MenuIcon, ProMallMark } from '@/components/icons';
import { NavScrim } from '@/components/NavScrim';
import { revealStyle, useRevealState } from '@/components/Reveal';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { NavLink } from '@/types/content';

const DRAWER_ID = 'nav-drawer';
const DRAWER_TITLE_ID = 'nav-drawer-title';
const NAV_REVEAL_STYLE = revealStyle({ distance: -36 });
const SCROLL_LOCK_ATTRIBUTE = 'data-scroll-locked';
const SCROLLBAR_GUTTER_PROPERTY = '--pw-scrollbar-gutter';

const FOCUSABLE = 'a[href], button:not([disabled])';

type NavShellProps = {
  brand: string;
  links: NavLink[];
  cta: string;
  ctaHref: string;
  homeHref: string;
  menuLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  themeToLightLabel: string;
  themeToDarkLabel: string;
};

export function NavShell({
  brand,
  links,
  cta,
  ctaHref,
  homeHref,
  menuLabel,
  menuOpenLabel,
  menuCloseLabel,
  themeToLightLabel,
  themeToDarkLabel,
}: NavShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, dataReveal } = useRevealState<HTMLElement>();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const root = document.documentElement;
    const gutter = window.innerWidth - root.clientWidth;

    root.style.setProperty(SCROLLBAR_GUTTER_PROPERTY, `${gutter}px`);
    root.setAttribute(SCROLL_LOCK_ATTRIBUTE, '');

    return () => {
      root.removeAttribute(SCROLL_LOCK_ATTRIBUTE);
      root.style.removeProperty(SCROLLBAR_GUTTER_PROPERTY);
    };
  }, [menuOpen]);

  /* A drawer that covers the viewport has to own the keyboard while it is up,
     or Tab walks straight out of it and into the page it is hiding. Both ends
     of the cycle wrap, and Escape hands focus back to the control that opened
     it — the return trip closeMenu already makes. */
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !drawer) {
        return;
      }

      const focusable = [...drawer.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
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
            className="pw-link pw-touch-target relative z-10 flex items-center gap-2 text-[var(--pw-cream)]"
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
            <ThemeToggle toLightLabel={themeToLightLabel} toDarkLabel={themeToDarkLabel} />

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
              className="pw-touch-target relative flex size-9 items-center justify-center rounded-full text-[var(--pw-cream)] ring-1 ring-[var(--pw-line)] [transition:background-color_0.4s_var(--pw-ease),color_0.4s_var(--pw-ease)] hover:bg-[rgb(var(--pw-veil-rgb)/10%)] focus-visible:outline-none focus-visible:ring-[var(--ring)] min-[1200px]:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable rather than centred-and-hoping: a phone held sideways has
          about 340px of height for a list that wants more, and a menu whose
          last item is unreachable is worse than one that scrolls. The scroll
          lives on the outer box and the centring on an inner one that is at
          least a viewport tall — centring and scrolling on the same element is
          what clips the top of an overflowing flex column. */}
      <div
        ref={drawerRef}
        id={DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={DRAWER_TITLE_ID}
        hidden={!menuOpen}
        className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[rgb(var(--pw-canvas-rgb)/82%)] backdrop-blur-[12px] data-[open=true]:block min-[1200px]:hidden!"
        data-open={menuOpen}
      >
        <div className="flex min-h-full flex-col items-center justify-center gap-8 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20">
          <h2 id={DRAWER_TITLE_ID} className="sr-only">
            {menuLabel}
          </h2>

          <ul className="flex w-full max-w-[320px] flex-col items-center gap-2">
            {links.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="pw-link flex min-h-[var(--pw-touch)] items-center justify-center rounded-full px-6 text-xl text-[var(--pw-text-dim)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href={ctaHref} onClick={closeMenu} className="pw-button shrink-0">
            {cta}
          </Link>
        </div>
      </div>
    </>
  );
}
