import type { Meta, StoryObj } from "@storybook/react";
import { Hint } from "./hint";

const meta = {
  title: "Molecules/Hint",
  component: Hint,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Подсказка у значка. С курсором — тултип по наведению, на тач-экране " +
          "— поповер: он открывается нажатием и держится, пока не нажмут в " +
          "другом месте. Тултип пальцем открыть нельзя, и текст не доходил до " +
          "половины читателей.",
      },
    },
  },
  args: {
    children:
      "Канал шифруется в любом случае. Проверка защищает ещё и от подмены сервера.",
  },
} satisfies Meta<typeof Hint>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Значок (i) — умолчание. */
export const Playground: Story = {};

/** Свой триггер: счётчик, бейдж, что угодно. */
export const CustomTrigger: Story = {
  args: {
    trigger: (
      <span className="rounded-md border border-border bg-card px-1.5 text-[10px] font-medium">
        +2
      </span>
    ),
    children: "u_9f2c1b_storefront, u_9f2c1b_analytics",
  },
};
