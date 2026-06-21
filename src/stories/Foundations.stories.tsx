import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Семантическая палитра Layero. Цвета именуются по назначению: success " +
          "(зелёный), warning (оранжевый), negative (красный), info (синий) + " +
          "neutral. Саб-акценты 400/500/600 — системные, тема-зависимые.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-12 w-full rounded-md border border-border ${className}`} />
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

const SCALES: Array<{ name: string; swatches: Array<[string, string]> }> = [
  { name: "neutral", swatches: [["neutral-50","bg-neutral-50"], ["neutral-100","bg-neutral-100"], ["neutral-200","bg-neutral-200"], ["neutral-300","bg-neutral-300"], ["neutral-400","bg-neutral-400"], ["neutral-500","bg-neutral-500"], ["neutral-600","bg-neutral-600"], ["neutral-700","bg-neutral-700"], ["neutral-800","bg-neutral-800"], ["neutral-900","bg-neutral-900"]] as Array<[string,string]> },
  { name: "success", swatches: [["success-50","bg-success-50"], ["success-100","bg-success-100"], ["success-200","bg-success-200"], ["success-300","bg-success-300"], ["success-400","bg-success-400"], ["success-500","bg-success-500"], ["success-600","bg-success-600"], ["success-700","bg-success-700"], ["success-800","bg-success-800"], ["success-900","bg-success-900"], ["success-950","bg-success-950"]] as Array<[string,string]> },
  { name: "warning", swatches: [["warning-50","bg-warning-50"], ["warning-100","bg-warning-100"], ["warning-200","bg-warning-200"], ["warning-300","bg-warning-300"], ["warning-400","bg-warning-400"], ["warning-500","bg-warning-500"], ["warning-600","bg-warning-600"], ["warning-700","bg-warning-700"], ["warning-800","bg-warning-800"], ["warning-900","bg-warning-900"], ["warning-950","bg-warning-950"]] as Array<[string,string]> },
  { name: "negative", swatches: [["negative-50","bg-negative-50"], ["negative-100","bg-negative-100"], ["negative-200","bg-negative-200"], ["negative-300","bg-negative-300"], ["negative-400","bg-negative-400"], ["negative-500","bg-negative-500"], ["negative-600","bg-negative-600"], ["negative-700","bg-negative-700"], ["negative-800","bg-negative-800"], ["negative-900","bg-negative-900"], ["negative-950","bg-negative-950"]] as Array<[string,string]> },
  { name: "info", swatches: [["info-50","bg-info-50"], ["info-100","bg-info-100"], ["info-200","bg-info-200"], ["info-300","bg-info-300"], ["info-400","bg-info-400"], ["info-500","bg-info-500"], ["info-600","bg-info-600"], ["info-700","bg-info-700"], ["info-800","bg-info-800"], ["info-900","bg-info-900"], ["info-950","bg-info-950"]] as Array<[string,string]> },
];

export const Palette: Story = {
  name: "Палитра",
  render: () => (
    <div className="max-w-4xl space-y-6">
      {SCALES.map((s) => (
        <div key={s.name}>
          <div className="mb-2 text-sm font-medium capitalize text-foreground">{s.name}</div>
          <div className="grid grid-cols-11 gap-2">
            {s.swatches.map(([label, cls]) => (
              <Swatch key={label} label={label.replace(s.name + "-", "")} className={cls} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SemanticTokens: Story = {
  name: "Семантические токены",
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {[
        ["background", "bg-background"],
        ["card", "bg-card"],
        ["muted", "bg-muted"],
        ["primary", "bg-primary"],
        ["secondary", "bg-secondary"],
        ["accent", "bg-accent"],
        ["destructive", "bg-destructive"],
        ["border", "bg-border"],
      ].map(([l, c]) => (
        <Swatch key={l} label={l} className={c} />
      ))}
    </div>
  ),
};

export const Intents: Story = {
  name: "Назначения",
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {[
        ["success", "bg-success-500"],
        ["warning", "bg-warning-500"],
        ["negative", "bg-negative-500"],
        ["info", "bg-info-500"],
      ].map(([l, c]) => (
        <Swatch key={l} label={l} className={c} />
      ))}
    </div>
  ),
};
