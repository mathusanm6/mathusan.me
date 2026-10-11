/* eslint-disable @next/next/no-img-element */

/**
 * Article cover. Uses the post's image when there is one, otherwise a calm
 * striped gradient so every post still has a header image.
 */
export default function Cover({ src, alt }: { src?: string; alt: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="aspect-[2/1] w-full rounded-xl border border-line object-cover"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className="aspect-[2/1] w-full rounded-xl border border-line"
      style={{
        backgroundImage: [
          'repeating-linear-gradient(90deg, color-mix(in srgb, var(--bg) 22%, transparent) 0 2px, transparent 2px 9px)',
          'linear-gradient(135deg, #7dd3fc 0%, #3b82f6 55%, #4338ca 100%)',
        ].join(', '),
      }}
    />
  );
}
