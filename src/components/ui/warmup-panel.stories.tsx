import type { Meta, StoryObj } from "@storybook/react";
import { WarmupPanel } from "./warmup-panel";

const meta = {
  title: "Molecules/WarmupPanel",
  component: WarmupPanel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Панель прогресса прогрева CDN: спиннер + стадия + описание + тонкий " +
          "прогресс-бар (атом Progress) + ETA/подсказка.",
      },
    },
  },
  args: {
    stage: "PUBLISHING",
    pipeline: "Публикуем на CDN",
    percent: 62,
    eta: "ETA ~30с (p95 60с) · elapsed 18с · ≈12с осталось",
    hint: "Первый деплой: CDN регистрирует hostname на edge-узлах.",
  },
} satisfies Meta<typeof WarmupPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
