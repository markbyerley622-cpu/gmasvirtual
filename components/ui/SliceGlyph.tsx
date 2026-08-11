import { cn } from "@/lib/utils";

/**
 * A pizza-slice glyph: apex at the top, curved crust along the bottom.
 * Used instead of the 🍕 emoji so the mark renders identically on every
 * platform and can take brand colour. Toppings are punched in the ink colour
 * so they read whether the slice is set on yellow or on the dark canvas.
 */
export function SliceGlyph({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M16 3.2 28.4 25.6a1.4 1.4 0 0 1-.7 2A22.6 22.6 0 0 1 16 29.4a22.6 22.6 0 0 1-11.7-1.8 1.4 1.4 0 0 1-.7-2Z"
        fill="currentColor"
      />
      <circle cx="12.4" cy="18.2" r="2.1" fill="var(--color-ink)" />
      <circle cx="20" cy="20.4" r="1.7" fill="var(--color-ink)" />
      <circle cx="15.4" cy="24.6" r="1.6" fill="var(--color-ink)" />
    </svg>
  );
}
