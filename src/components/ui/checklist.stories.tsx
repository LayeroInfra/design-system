import type { Meta, StoryObj } from "@storybook/react";
import { Checklist, ChecklistItem } from "./checklist";

const meta = {
  title: "Molecules/Checklist",
  component: Checklist,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Список шагов: выполненные — залитый success-кружок с галочкой и " +
          "зачёркнутым текстом, остальные — пустой кружок.",
      },
    },
  },
} satisfies Meta<typeof Checklist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Чеклист",
  render: () => (
    <Checklist className="max-w-sm">
      <ChecklistItem done>Подключить Git-репозиторий</ChecklistItem>
      <ChecklistItem done>Сделать production-деплой</ChecklistItem>
      <ChecklistItem>Добавить свой домен</ChecklistItem>
      <ChecklistItem>Подключить веб-аналитику</ChecklistItem>
      <ChecklistItem>Сделать аудит производительности</ChecklistItem>
    </Checklist>
  ),
};
