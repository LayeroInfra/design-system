import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const meta = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ Сейчас не используется в приложении (0 импортов) — везде применяется CSS-класс `.surface`. Кандидат на консолидацию: выбрать один канонический контейнер.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
        <CardDescription>Короткое описание под заголовком.</CardDescription>
      </CardHeader>
      <CardContent>Контент карточки.</CardContent>
      <CardFooter>
        <Button size="sm">Действие</Button>
      </CardFooter>
    </Card>
  ),
};
