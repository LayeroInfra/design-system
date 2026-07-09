import type { Meta, StoryObj } from "@storybook/react";
import { HeadingBuilder } from "./heading-builder";
import { Button } from "./button";

const meta = {
  title: "Molecules/HeadingBuilder",
  component: HeadingBuilder,
  tags: ["autodocs"],
  args: { title: "Производительность" },
} satisfies Meta<typeof HeadingBuilder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  render: () => (
    <div className="max-w-2xl">
      <HeadingBuilder title="Настройки проекта" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="max-w-2xl">
      <HeadingBuilder
        title="Домены"
        description="Привяжите свой домен — покажем, какие DNS-записи добавить у регистратора."
      />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="max-w-2xl">
      <HeadingBuilder
        title="Деплои"
        description="Все сборки проекта из каждой ветки."
        actions={
          <>
            <Button variant="outline" size="sm">
              Фильтры
            </Button>
            <Button size="sm">Новый деплой</Button>
          </>
        }
      />
    </div>
  ),
};
