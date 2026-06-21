import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Полная палитра Layero. Нейтральная и green-шкалы завязаны на токены и " +
          "флипаются с темой; остальные семейства — для статусов/акцентов. Ниже — " +
          "семантические токены и системные акценты.",
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
  { name: "green", swatches: [["green-50","bg-green-50"], ["green-100","bg-green-100"], ["green-200","bg-green-200"], ["green-300","bg-green-300"], ["green-400","bg-green-400"], ["green-500","bg-green-500"], ["green-600","bg-green-600"], ["green-700","bg-green-700"], ["green-800","bg-green-800"], ["green-900","bg-green-900"], ["green-950","bg-green-950"]] as Array<[string,string]> },
  { name: "blue", swatches: [["blue-50","bg-blue-50"], ["blue-100","bg-blue-100"], ["blue-200","bg-blue-200"], ["blue-300","bg-blue-300"], ["blue-400","bg-blue-400"], ["blue-500","bg-blue-500"], ["blue-600","bg-blue-600"], ["blue-700","bg-blue-700"], ["blue-800","bg-blue-800"], ["blue-900","bg-blue-900"], ["blue-950","bg-blue-950"]] as Array<[string,string]> },
  { name: "red", swatches: [["red-50","bg-red-50"], ["red-100","bg-red-100"], ["red-200","bg-red-200"], ["red-300","bg-red-300"], ["red-400","bg-red-400"], ["red-500","bg-red-500"], ["red-600","bg-red-600"], ["red-700","bg-red-700"], ["red-800","bg-red-800"], ["red-900","bg-red-900"], ["red-950","bg-red-950"]] as Array<[string,string]> },
  { name: "orange", swatches: [["orange-50","bg-orange-50"], ["orange-100","bg-orange-100"], ["orange-200","bg-orange-200"], ["orange-300","bg-orange-300"], ["orange-400","bg-orange-400"], ["orange-500","bg-orange-500"], ["orange-600","bg-orange-600"], ["orange-700","bg-orange-700"], ["orange-800","bg-orange-800"], ["orange-900","bg-orange-900"], ["orange-950","bg-orange-950"]] as Array<[string,string]> },
  { name: "amber", swatches: [["amber-50","bg-amber-50"], ["amber-100","bg-amber-100"], ["amber-200","bg-amber-200"], ["amber-300","bg-amber-300"], ["amber-400","bg-amber-400"], ["amber-500","bg-amber-500"], ["amber-600","bg-amber-600"], ["amber-700","bg-amber-700"], ["amber-800","bg-amber-800"], ["amber-900","bg-amber-900"], ["amber-950","bg-amber-950"]] as Array<[string,string]> },
  { name: "yellow", swatches: [["yellow-50","bg-yellow-50"], ["yellow-100","bg-yellow-100"], ["yellow-200","bg-yellow-200"], ["yellow-300","bg-yellow-300"], ["yellow-400","bg-yellow-400"], ["yellow-500","bg-yellow-500"], ["yellow-600","bg-yellow-600"], ["yellow-700","bg-yellow-700"], ["yellow-800","bg-yellow-800"], ["yellow-900","bg-yellow-900"], ["yellow-950","bg-yellow-950"]] as Array<[string,string]> },
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

export const StatusAccents: Story = {
  name: "Системные акценты",
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {[
        ["green-500 · success", "bg-green-500"],
        ["amber-500 · warning", "bg-amber-500"],
        ["red-500 · danger", "bg-red-500"],
        ["blue-500 · info", "bg-blue-500"],
      ].map(([l, c]) => (
        <Swatch key={l} label={l} className={c} />
      ))}
    </div>
  ),
};
