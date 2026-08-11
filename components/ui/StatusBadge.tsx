import { STATUS, type StatusKey } from "@/lib/brand";
import { cn } from "@/lib/utils";

const tones: Record<StatusKey, string> = {
  live: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
  soon: "border-crust/30 bg-crust/10 text-crust",
  vision: "border-line-2 bg-white/[0.03] text-fg-mute",
};

/**
 * Shown wherever a feature is presented, so a visitor can always tell what
 * exists today from what is still a concept.
 */
export function StatusBadge({
  status,
  className,
}: {
  status: StatusKey;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] whitespace-nowrap",
        tones[status],
        className
      )}
    >
      {status === "live" && (
        <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
      )}
      {STATUS[status].label}
    </span>
  );
}
