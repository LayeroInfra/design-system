import type { Meta, StoryObj } from "@storybook/react";
import { MetricChart } from "./metric-chart";

/** Ряд правдоподобной формы: рост с шумом, шаг — минута. */
function series(count: number, base: number, spread: number) {
  const start = Date.UTC(2026, 8, 1, 16, 45) / 1000;
  return Array.from({ length: count }, (_, i) => {
    const wave = Math.sin(i / 4) * spread * 0.4;
    const drift = (i / count) * spread * 0.6;
    return [start + i * 60, Math.max(0, base + wave + drift)] as [number, number];
  });
}

const bytes = (v: number) =>
  v >= 1024 ** 3
    ? `${(v / 1024 ** 3).toFixed(1).replace(".", ",")} ГБ`
    : `${Math.round(v / 1024 ** 2)} МБ`;

const meta = {
  title: "Molecules/MetricChart",
  component: MetricChart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Карточка одного показателя: текущее значение, график и потолок — " +
          "квота, предел подключений, 100 %. Потолок рисуется пунктиром и " +
          "задаёт шкалу: без него читатель должен помнить квоту наизусть.",
      },
    },
  },
  args: {
    title: "Место",
    value: "410 МБ",
    limitLabel: "квота",
    points: series(60, 380 * 1024 ** 2, 40 * 1024 ** 2),
    format: bytes,
    limit: 512 * 1024 ** 2,
    startLabel: "16:45",
    endLabel: "17:45",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["default", "warning", "danger"] },
    height: { control: { type: "range", min: 64, max: 240, step: 4 } },
  },
} satisfies Meta<typeof MetricChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Без потолка: у показателя нет предела — только форма изменения. */
export const NoLimit: Story = {
  args: {
    title: "Запись в секунду",
    value: "14/с",
    points: series(60, 9, 8),
    format: (v) => `${Math.round(v)}/с`,
    limit: undefined,
    footer: "подтверждённых транзакций",
  },
};

/** Опасный тон: показатель подошёл к потолку вплотную. */
export const NearLimit: Story = {
  args: {
    title: "Место",
    value: "486 МБ",
    points: series(60, 470 * 1024 ** 2, 20 * 1024 ** 2),
    limit: 512 * 1024 ** 2,
    tone: "danger",
  },
};

/** Столбцами: так соседние значения сравниваются точнее, чем по линии.
 *  Вид переключается кнопками в карточке — это выбор читателя, не автора. */
export const Bars: Story = {
  args: {
    title: "Запись в секунду",
    value: "14/с",
    points: series(60, 9, 8),
    format: (v) => `${Math.round(v)}/с`,
    limit: undefined,
    defaultVariant: "bars",
  },
};

/** Пустой ряд: хранилище метрик молчит. Ноль здесь рисовать нельзя — он
 *  читается как «нагрузки нет». */
export const Empty: Story = {
  args: {
    title: "Подключения",
    value: "—",
    points: [],
    limit: 20,
    format: (v) => String(Math.round(v)),
  },
};
