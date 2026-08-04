'use client';

import { useCallback, useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/components/icons';
import {
  defaultTheme,
  isValidTheme,
  PAGE_BACKGROUND,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  type Theme,
} from '@/lib/theme';

type ThemeToggleProps = {
  toLightLabel: string;
  toDarkLabel: string;
  className?: string;
};

function readTheme(): Theme {
  const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isValidTheme(current) ? current : defaultTheme;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', PAGE_BACKGROUND[theme]);
}

export function ThemeToggle({ toLightLabel, toDarkLabel, className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode denies storage; the switch still applies for this visit */
      }
      return next;
    });
  }, []);

  const label = theme === 'dark' ? toLightLabel : toDarkLabel;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`pw-theme-toggle ${className ?? ''}`}
    >
      <span aria-hidden className="pw-theme-toggle__glyph pw-theme-toggle__glyph--sun">
        <SunIcon width={17} height={17} />
      </span>
      <span aria-hidden className="pw-theme-toggle__glyph pw-theme-toggle__glyph--moon">
        <MoonIcon width={17} height={17} />
      </span>
    </button>
  );
}
