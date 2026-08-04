import Image, { type ImageProps } from 'next/image';
import { lightVariant } from '@/lib/themed-asset';

type ThemedImageProps = Omit<ImageProps, 'src'> & { src: string };

/* Both variants sit in the markup and CSS shows the one the active theme
   names — a runtime src swap would repaint the wrong landscape for a frame
   after hydration.

   Only the DARK copy is allowed an eager load. The hidden copy stays lazy, and
   a lazy image inside a `display: none` box never intersects, so the browser
   never fetches it: a default (dark) visit costs exactly what it did before
   light mode existed. A light visitor pays for one unused eager fetch, which
   is the right way round given dark is what ships by default. */
export function ThemedImage({ src, alt, loading, priority, ...rest }: ThemedImageProps) {
  return (
    <>
      <Image
        {...rest}
        src={src}
        alt={alt}
        loading={loading}
        priority={priority}
        data-theme-asset="dark"
      />
      <Image {...rest} src={lightVariant(src)} alt={alt} loading="lazy" data-theme-asset="light" />
    </>
  );
}
