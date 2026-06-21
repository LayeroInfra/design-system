import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardSectionHeader,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Поверхность-контейнер (rounded-2xl, hairline-бордер, card-фон) и её " +
          "части: Header/Title/Description/Content/Footer + CardSectionHeader " +
          "(заголовок · мета · действие).",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Базовая",
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Свой домен</CardTitle>
        <CardDescription>
          Привяжите домен и выпустите сертификат автоматически.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-secondary px-3 py-2 font-mono text-sm">
          app.example.com
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm">Подключить</Button>
        <Button size="sm" variant="outline">
          Отмена
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const SectionHeader: Story = {
  name: "Section header",
  render: () => (
    <Card className="max-w-sm">
      <CardSectionHeader
        title="Мониторинг"
        meta="за 24ч"
        action={
          <button className="text-neutral-400 transition hover:text-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        }
      />
      <CardContent className="text-sm text-neutral-500">
        Содержимое секции.
      </CardContent>
    </Card>
  ),
};
