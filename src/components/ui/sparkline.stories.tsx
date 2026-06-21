import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "./sparkline";

const SERIES = [4, 7, 5, 9, 6, 11, 8, 13, 9, 15, 10, 14, 12, 18, 13];

const meta = {
  title: "Atoms/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Мини-тренд без зависимостей. Тон задаёт цвет линии; `area` рисует " +
          "заливку под ней. Используется в карточках метрик/мониторинга.",
      },
    },
  },
  args: { data: SERIES, tone: "info", width: 160, height: 44 },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["success", "info", "negative", "warning", "neutral"],
    },
    area: { control: "boolean" },
  },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  name: "Тоны",
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Sparkline data={SERIES} tone="success" area />
      <Sparkline data={SERIES} tone="info" area />
      <Sparkline data={[2, 2, 3, 2, 2, 9, 2, 2, 3, 2]} tone="negative" area />
    </div>
  ),
};
