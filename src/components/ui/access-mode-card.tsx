import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccessModeTone = "neutral" | "warning";

export interface AccessModeCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "onSelect"> {
  icon?: React.ComponentType<{ className?: string }>;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Shown under the description when the mode is the selected one. */
  detail?: React.ReactNode;
  selected?: boolean;
  tone?: AccessModeTone;
  onSelect?: () => void;
}

/**
 * One choice in a mutually exclusive access policy — «open to everyone»,
 * «list of addresses», «platform only».
 *
 * A card rather than a radio row because the choice is consequential: each
 * option needs a sentence saying what it actually does, and a plain radio
 * list pushes that sentence out of sight. `tone="warning"` marks the option
 * that leaves the resource reachable by anyone — visible without being a
 * scare.
 */
export const AccessModeCard = React.forwardRef<HTMLButtonElement, AccessModeCardProps>(
  (
    {
      icon: Icon,
      title,
      description,
      detail,
      selected = false,
      tone = "neutral",
      onSelect,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition",
        selected
          ? tone === "warning"
            ? "border-warning-400 bg-warning-50/60 dark:border-warning-500/40 dark:bg-warning-500/5"
            : "border-neutral-900 bg-overlay dark:border-neutral-100"
          : "border-border hover:border-neutral-400 hover:bg-overlay/50",
        className,
      )}
      {...props}
    >
      <span className="flex items-start gap-3">
        {Icon && (
          <Icon
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              selected ? "text-foreground" : "text-neutral-400",
            )}
          />
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            {selected && <Check className="h-3.5 w-3.5 text-foreground" />}
          </span>
          {description && (
            <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
              {description}
            </span>
          )}
          {selected && detail && (
            <span className="mt-2 block text-xs leading-relaxed text-neutral-600">
              {detail}
            </span>
          )}
        </span>
      </span>
    </button>
  ),
);
AccessModeCard.displayName = "AccessModeCard";
