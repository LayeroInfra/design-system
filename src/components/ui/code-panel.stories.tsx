import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { CodePanel } from "./code-panel";

const DSN =
  "postgresql://r_9f2c1b:<пароль>@db.layero.ru:5432/db_9f2c1b?sslmode=require";

const meta = {
  title: "Molecules/CodePanel",
  component: CodePanel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Сниппет в рамке: подсвеченный код и полоса действий под ним. Высота " +
          "фиксирована — при переключении вида сниппета блок разной высоты " +
          "дёргает кнопки под собой ровно тогда, когда на них целятся.",
      },
    },
  },
  args: {
    children: DSN,
    actions: (
      <Button variant="outline" size="sm">
        Скопировать
      </Button>
    ),
  },
} satisfies Meta<typeof CodePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Строка подключения: `//` внутри адреса не должно уходить в комментарий. */
export const Playground: Story = {};

/** Сниппет с комментариями и строками — тем же блоком той же высоты. */
export const Snippet: Story = {
  args: {
    children:
      `// .env\nDATABASE_URL="${DSN}"\n\n// schema.prisma\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}`,
  },
};

/** Без действий: панель как есть. */
export const Plain: Story = {
  args: { actions: undefined },
};
