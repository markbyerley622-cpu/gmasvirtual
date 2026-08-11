import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Virtuals Protocol assets, used as supplied — never redrawn,
 * recoloured or stretched. `virtuals-logo-dark.svg` is the dark-background
 * lockup; the mark keeps its real gradient.
 */

export function VirtualsLogo({
  height = 34,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src="/assets/virtuals-logo-dark.svg"
      alt="Virtuals Protocol"
      width={141}
      height={48}
      style={{ height }}
      className={cn("w-auto object-contain", className)}
    />
  );
}

/** The symbol alone — used where the full wordmark would be too heavy. */
export function VirtualsIcon({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/assets/virtuals-icon.png"
      alt="Virtuals Protocol"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cn("object-contain", className)}
    />
  );
}

/** Inline "Powered by" credit for the bottom of product surfaces. */
export function PoweredByVirtuals({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-fg-faint", className)}>
      <VirtualsIcon size={13} className="opacity-80" />
      <span className="font-mono text-[10px] tracking-[0.06em]">Virtuals</span>
    </span>
  );
}
