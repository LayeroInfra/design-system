import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Бейдж/статус-метка. Крутится в Playground: вариант и текст. " +
          "Заменяет legacy .pill* и инлайновые статус-спаны (см. Migration/Badges).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "secondary", "outline", "success", "warning", "destructive"],
    },
    children: { control: "text" },
  },
  args: { children: "Badge", variant: "success" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const InContext: Story = {
  name: "В строке",
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">app.example.ru</span>
      <Badge variant="success">Активна</Badge>
      <Badge variant="secondary">production</Badge>
    </div>
  ),
};
