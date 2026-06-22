import figma from "@figma/code-connect";

import { Badge } from "./badge";

/**
 * Code Connect mapping: Figma «Badge/*» component sets → the code `<Badge>`.
 *
 * Mirrors the Button setup: each size is its own Figma component
 * (Badge/400 | 500 | 600 → sm | md | lg). Variant maps to `variant`, the
 * «Leading icon» / «Trailing chevron» booleans map to leftIcon/rightIcon,
 * and the Label text maps to children.
 */

// Placeholder icons — real call sites pass their own ReactNode.
const Dot = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="6" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const sharedProps = {
  label: figma.string("Label"),
  variant: figma.enum("Variant", {
    Default: "default",
    Secondary: "secondary",
    Outline: "outline",
    Success: "success",
    Warning: "warning",
    Destructive: "destructive",
  }),
  leftIcon: figma.boolean("Leading icon", {
    true: <Dot />,
    false: undefined,
  }),
  rightIcon: figma.boolean("Trailing chevron", {
    true: <Chevron />,
    false: undefined,
  }),
};

// Badge/500 — default size
figma.connect(Badge, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=21-32", {
  props: sharedProps,
  example: (props) => (
    <Badge
      variant={props.variant}
      size="md"
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Badge>
  ),
});

// Badge/400 — small size
figma.connect(Badge, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=22-2", {
  props: sharedProps,
  example: (props) => (
    <Badge
      variant={props.variant}
      size="sm"
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Badge>
  ),
});

// Badge/600 — large size
figma.connect(Badge, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=22-33", {
  props: sharedProps,
  example: (props) => (
    <Badge
      variant={props.variant}
      size="lg"
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Badge>
  ),
});
