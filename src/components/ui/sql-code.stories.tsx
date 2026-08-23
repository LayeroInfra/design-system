import type { Meta, StoryObj } from "@storybook/react";
import { SqlCode } from "./sql-code";

const meta = {
  title: "Molecules/SqlCode",
  component: SqlCode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Фрагмент SQL: серый блок, подсветка, копирование по наведению.",
          "",
          "Для показа запроса, который выполнит панель, — в окне создания таблицы, в",
          "подтверждении доступа, в подсказке миграции. Человек видит настоящую команду и",
          "может повторить её у себя.",
          "",
          "**Ограничения.** Только для чтения: правка означала бы редактор с проверкой и",
          "историей — это отдельный экран (SQL-редактор на CodeMirror). Подсветка словарная",
          "(ключевые слова, типы, строки, числа, комментарии), без разбора грамматики:",
          "названия таблиц и функций остаются обычным текстом.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof SqlCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: [
      "create table public.orders (",
      "  id bigint generated always as identity primary key,",
      "  created_at timestamptz not null default now()",
      ");",
    ].join("\n"),
  },
};

export const WithComment: Story = {
  name: "С комментарием и строками",
  args: {
    children: [
      "-- политика: заказы видит только их владелец",
      "create policy orders_own_read on public.orders",
      "  for select to authenticated",
      "  using (user_id = auth.uid());",
    ].join("\n"),
  },
};
