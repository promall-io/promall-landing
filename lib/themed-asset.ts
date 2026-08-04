/* Every raster the retint pipeline touches ships twice — the ink original and
   a `-light` sibling generated from the same pristine source in
   public/_source. scripts/retint-assets.mjs writes the second name; this is
   the only place the app reads it. */
export function lightVariant(src: string): string {
  return src.replace(/(\.[a-z0-9]+)$/i, '-light$1');
}
