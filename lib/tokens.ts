/* The web-app manifest and the <meta name="theme-color"> tag are consumed by the
   OS shell before any stylesheet loads, so they cannot read a CSS custom
   property. This module is the single mirror of --pw-black for those two call
   sites; keep it in step with the token block in app/globals.css. */
export const PAGE_BACKGROUND = '#080d17';
