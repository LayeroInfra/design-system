import figma from "@figma/code-connect";

import { Button } from "./button";

/**
 * Code Connect mapping: Figma «Button/*» component sets → the code `<Button>`.
 *
 * Each size lives in its own Figma component (Button/400 | 500 | 600), so size
 * is a literal per `figma.connect` call. The Variant axis maps to the `variant`
 * prop, the State axis (Disabled / Loading) maps to the matching boolean props,
 * and the «Leading icon» / «Trailing chevron» booleans map to leftIcon/rightIcon.
 *
 * Publish with: `npx figma connect publish` (requires a Figma Org/Enterprise plan
 * and the component published to a team library).
 */

// Placeholder icons — real call sites pass their own ReactNode.
const LeadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
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
    Primary: "default",
    Secondary: "secondary",
    Outline: "outline",
    Ghost: "ghost",
    Destructive: "destructive",
  }),
  // State axis → code booleans (Default / Hover carry no code prop).
  loading: figma.enum("State", { Loading: true }),
  disabled: figma.enum("State", { Disabled: true }),
  leftIcon: figma.boolean("Leading icon", {
    true: <LeadingIcon />,
    false: undefined,
  }),
  rightIcon: figma.boolean("Trailing chevron", {
    true: <Chevron />,
    false: undefined,
  }),
};

// Button/500 — default size
figma.connect(Button, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=14-132", {
  props: sharedProps,
  example: (props) => (
    <Button
      variant={props.variant}
      size="default"
      loading={props.loading}
      disabled={props.disabled}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Button>
  ),
});

// Button/400 — small size
figma.connect(Button, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=16-2", {
  props: sharedProps,
  example: (props) => (
    <Button
      variant={props.variant}
      size="sm"
      loading={props.loading}
      disabled={props.disabled}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Button>
  ),
});

// Button/600 — large size
figma.connect(Button, "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=17-2", {
  props: sharedProps,
  example: (props) => (
    <Button
      variant={props.variant}
      size="lg"
      loading={props.loading}
      disabled={props.disabled}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.label}
    </Button>
  ),
});
