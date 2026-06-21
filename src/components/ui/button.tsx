import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:opacity-90 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90",
        outline:
          "border border-border bg-card text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-foreground/30",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:opacity-80",
        // Same hover shade as outline/secondary and the cell/checklist rows
        // (accent == secondary == #f3f1ea) for one consistent hover tint.
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-[13px]",
        default: "h-9 px-4 py-2",
        lg: "h-11 rounded-lg px-6 text-[15px]",
        "icon-sm": "h-8 w-8",
        icon: "h-9 w-9",
        "icon-lg": "h-11 w-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (Radix Slot) — e.g. wrap a router <Link>.
   *  In this mode icon/loading props are ignored; compose them in the child. */
  asChild?: boolean;
  /** Leading icon node (rendered before the label). */
  leftIcon?: React.ReactNode;
  /** Trailing icon node (rendered after the label) — e.g. a disclosure chevron. */
  rightIcon?: React.ReactNode;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      fullWidth && "w-full",
      className,
    );

    // asChild composes a single child (Slot constraint) — pass through as-is.
    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
