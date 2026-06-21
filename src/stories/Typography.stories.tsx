import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Шрифт Geist (моно — Geist Mono). Шкала размеров, веса (400/500/600/700) " +
          "и трекинг. Заголовки — через .h1-title / .h2-section / .heading.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Row({ meta: m, children }: { meta: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-6 border-b border-border py-3">
      <div className="w-40 shrink-0 font-mono text-xs text-muted-foreground">{m}</div>
      <div className="min-w-0 flex-1 text-foreground">{children}</div>
    </div>
  );
}

export const Scale: Story = {
  name: "Шкала",
  render: () => (
    <div className="max-w-3xl">
      <Row meta="h1-title">
        <span className="h1-title">Заголовок страницы</span>
      </Row>
      <Row meta="h2-section">
        <span className="h2-section">Заголовок секции</span>
      </Row>
      <Row meta="text-xl / 600">
        <span className="text-xl font-semibold">Подзаголовок</span>
      </Row>
      <Row meta="text-base / 400">
        <span className="text-base">Основной текст — Geist, 16px, line-height 1.5.</span>
      </Row>
      <Row meta="text-sm / 400">
        <span className="text-sm">Вторичный текст 14px — описания, подписи.</span>
      </Row>
      <Row meta="text-xs / 500">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Eyebrow / метка
        </span>
      </Row>
      <Row meta="font-mono">
        <span className="font-mono text-sm">npx layero deploy — Geist Mono</span>
      </Row>
    </div>
  ),
};

export const Weights: Story = {
  name: "Веса",
  render: () => (
    <div className="space-y-2 text-lg text-foreground">
      <p className="font-normal">400 — Regular. Съешь ещё этих мягких булок.</p>
      <p className="font-medium">500 — Medium. Съешь ещё этих мягких булок.</p>
      <p className="font-semibold">600 — Semibold. Съешь ещё этих мягких булок.</p>
      <p className="font-bold">700 — Bold. Съешь ещё этих мягких булок.</p>
    </div>
  ),
};

export const Eyebrow: Story = {
  render: () => (
    <div className="eyebrow">
      <span className="dotmark" />
      Раздел
    </div>
  ),
};
