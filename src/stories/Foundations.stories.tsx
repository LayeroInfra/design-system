import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-14 w-full rounded-lg border border-border ${className}`} />
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

// Literal class names — Tailwind only generates classes it can see as full
// strings, so a `bg-green-${s}` template would render blank swatches.
const GREEN: Array<[string, string]> = [
  ["green-50", "bg-green-50"],
  ["green-100", "bg-green-100"],
  ["green-200", "bg-green-200"],
  ["green-300", "bg-green-300"],
  ["green-400", "bg-green-400"],
  ["green-500", "bg-green-500"],
  ["green-600", "bg-green-600"],
  ["green-700", "bg-green-700"],
  ["green-800", "bg-green-800"],
  ["green-900", "bg-green-900"],
  ["green-950", "bg-green-950"],
];

export const Green: Story = {
  name: "Green (success)",
  render: () => (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Зелёная палитра успеха — построена вокруг системного зелёного тоггла
        (400/500/600 = --c-green). Тинты для фонов, тёмные для текста.
      </p>
      <div className="grid grid-cols-6 gap-3">
        {GREEN.map(([label, cls]) => (
          <Swatch key={label} label={label} className={cls} />
        ))}
      </div>
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      <Swatch label="background" className="bg-background" />
      <Swatch label="card" className="bg-card" />
      <Swatch label="muted" className="bg-muted" />
      <Swatch label="primary" className="bg-primary" />
      <Swatch label="secondary" className="bg-secondary" />
      <Swatch label="accent" className="bg-accent" />
      <Swatch label="destructive" className="bg-destructive" />
      <Swatch label="border" className="bg-border" />
    </div>
  ),
};

export const StatusAccents: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      <Swatch label="green-500" className="bg-green-500" />
      <Swatch label="amber-500" className="bg-amber-500" />
      <Swatch label="red-500" className="bg-red-500" />
      <Swatch label="orange-500" className="bg-orange-500" />
    </div>
  ),
};
