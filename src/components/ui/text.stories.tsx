import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Текстовый блок — один компонент на все стили текста: title, section, " +
          "body, muted, eyebrow, mono. Элемент подбирается по варианту (override — `as`).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["title", "section", "body", "muted", "eyebrow", "mono"],
    },
  },
  args: { variant: "body", children: "Деплой опубликован и доступен по домену." },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scale: Story = {
  name: "Все стили",
  render: () => (
    <div className="space-y-3">
      <Text variant="eyebrow">Eyebrow · подзаголовок</Text>
      <Text variant="title">Заголовок страницы</Text>
      <Text variant="section">Заголовок секции</Text>
      <Text variant="body">Основной текст абзаца — комфортный межстрочный интервал.</Text>
      <Text variant="muted">Вторичный приглушённый текст.</Text>
      <Text variant="mono">valya-team-ds.layero.ru</Text>
    </div>
  ),
};
