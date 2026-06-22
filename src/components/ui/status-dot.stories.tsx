import type { Meta, StoryObj } from "@storybook/react";
import { StatusDot, type StatusTone } from "./status-dot";

const meta = {
  title: "Atoms/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Цветная статус-точка с опц. подписью — общий индикатор статуса для " +
          "строк проектов, деплоев, доменов, веток.",
      },
    },
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["success", "info", "warning", "negative", "neutral"],
    },
  },
  args: { tone: "success", children: "Готов" },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  name: "Все тоны",
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          ["success", "Готов"],
          ["info", "Сборка"],
          ["warning", "Внимание"],
          ["negative", "Ошибка"],
          ["neutral", "Idle"],
        ] as [StatusTone, string][]
      ).map(([t, l]) => (
        <StatusDot key={t} tone={t}>
          {l}
        </StatusDot>
      ))}
    </div>
  ),
};
