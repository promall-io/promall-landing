/* The OS shell reads <meta name="theme-color"> and the web-app manifest before
   any stylesheet loads, so neither can resolve a CSS custom property. This
   module is the single mirror of --pw-canvas for those call sites; keep both
   entries in step with the token blocks in app/globals.css. */
export const themes = ['dark', 'light'] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = 'dark';

export const THEME_STORAGE_KEY = 'promall-theme';

export const THEME_ATTRIBUTE = 'data-theme';

export const PAGE_BACKGROUND: Record<Theme, string> = {
  dark: '#080d17',
  light: '#f6f7f9',
};

export function isValidTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (themes as readonly string[]).includes(value);
}

/* Runs before first paint, ahead of hydration, so a returning light-mode
   visitor never sees a frame of the dark canvas. Deliberately ignores
   prefers-color-scheme: dark is the shipped design and light is opt-in. */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!==${JSON.stringify(themes[1])})return;var r=document.documentElement;r.setAttribute(${JSON.stringify(
  THEME_ATTRIBUTE,
)},t);r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',${JSON.stringify(
  PAGE_BACKGROUND.light,
)});}catch(e){}})();`;
