import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border font-medium normal-case transition-colors focus:outline-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        success:
          "border-transparent bg-success-50 text-success-700 dark:bg-success-950/60 dark:text-success-400",
        warning:
          "border-transparent bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300",
        destructive:
          "border-transparent bg-negative-50 text-negative-700 dark:bg-negative-950/40 dark:text-negative-300",
      },
      // Sizes mirror the Figma «Badge/400 · 500 · 600» components (sm · md · lg).
      size: {
        sm: "px-1.5 py-0.5 text-[10px] [&_svg]:size-3",
        md: "px-2 py-0.5 text-[11px] [&_svg]:size-3.5",
        lg: "px-2.5 py-1 text-[12px] [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Leading icon node (rendered before the label). */
  leftIcon?: React.ReactNode;
  /** Trailing icon node (rendered after the label) — e.g. a disclosure chevron. */
  rightIcon?: React.ReactNode;
}

/** Sentence-case: first letter upper, rest lower — the single casing rule for
 *  all badge labels. Only applied to plain-string children; nodes (icon+text)
 *  are left untouched so the call site controls them. */
function sentenceCase(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
    const content =
      typeof children === "string" ? sentenceCase(children) : children;
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {leftIcon}
        {content}
        {rightIcon}
      </div>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
