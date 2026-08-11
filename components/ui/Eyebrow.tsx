import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section label with a leading rule — the site's consistent section opener. */
export function Eyebrow({
  children,
  tone = "slice",
  className,
}: {
  children: ReactNode;
  tone?: "slice" | "crust" | "mute" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-2.5",
        tone === "slice" && "text-slice-300",
        tone === "crust" && "text-crust",
        tone === "mute" && "text-fg-mute",
        tone === "dark" && "text-slice-600",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6 shrink-0",
          tone === "slice" && "bg-slice-400",
          tone === "crust" && "bg-crust",
          tone === "mute" && "bg-fg-faint",
          tone === "dark" && "bg-slice-600"
        )}
      />
      {children}
    </div>
  );
}
