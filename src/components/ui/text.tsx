import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      title: "text-2xl font-semibold tracking-tightish text-foreground",
      section: "text-lg font-semibold text-foreground",
      body: "text-sm leading-relaxed text-foreground",
      muted: "text-sm leading-relaxed text-neutral-500",
      eyebrow:
        "text-[11px] font-medium uppercase tracking-wide text-neutral-400",
      mono: "font-mono text-sm text-neutral-600",
    },
  },
  defaultVariants: { variant: "body" },
});

const DEFAULT_TAG: Record<string, keyof JSX.IntrinsicElements> = {
  title: "h2",
  section: "h3",
  body: "p",
  muted: "p",
  eyebrow: "div",
  mono: "span",
};

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** Override the rendered element. Defaults per variant. */
  as?: keyof JSX.IntrinsicElements;
}

/** Typographic text block — one component for every text style in the system.
 *  Picks a sensible element per variant; override with `as`. */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = "body", as, className, ...props }, ref) => {
    const Tag = (as ?? DEFAULT_TAG[variant ?? "body"]) as "p";
    return (
      <Tag
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { textVariants };
