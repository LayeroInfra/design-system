import type { Meta, StoryObj } from "@storybook/react";
import { Metric } from "./metric";
import { Sparkline } from "./sparkline";

const meta = {
  title: "Molecules/Metric",
  component: Metric,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Одна метрика: подпись + крупное значение слева, опц. тренд справа. " +
          "Несколько штук с разделителями складываются в карточку мониторинга.",
      },
    },
  },
  args: { label: "Запросы", value: "2 956" },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    chart: <Sparkline data={[4, 7, 5, 9, 6, 11, 8, 13, 9, 15]} tone="success" area />,
  },
};

export const Stacked: Story = {
  name: "Стопка",
  render: () => (
    <div className="w-80 divide-y divide-border rounded-2xl border border-border bg-card [&>*]:px-5 [&>*]:py-4">
      <Metric
        label="Запросы"
        value="2 956"
        chart={<Sparkline data={[4, 7, 5, 9, 6, 11, 8, 13, 9, 15]} tone="success" area />}
      />
      <Metric
        label="Latency (p95)"
        value="1198 мс"
        chart={<Sparkline data={[3, 4, 3, 5, 4, 12, 4, 5, 4, 6]} tone="info" area />}
      />
      <Metric
        label="Доля ошибок"
        value="0.3%"
        chart={<Sparkline data={[1, 1, 1, 1, 9, 1, 1, 1, 1, 1]} tone="negative" area />}
      />
    </div>
  ),
};
