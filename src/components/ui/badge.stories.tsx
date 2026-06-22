import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const meta = {
  title: "Atoms/Badge",
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
    // Figma ↔ Storybook: вкладка «Design» показывает компонент-сет Badge
    // из библиотеки Layero Design System.
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MmHTzOAWbir8pBzt5HtOtM/Layero-Design-System?node-id=9-14",
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "secondary", "outline", "success", "warning", "destructive"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Размер (Figma: Badge/400 · 500 · 600)",
    },
    leftIcon: {
      control: "radio",
      options: ["none", "dot"],
      mapping: { none: undefined, dot: <DotIcon /> },
      description: "Иконка слева (renderProp: ReactNode)",
    },
    rightIcon: {
      control: "radio",
      options: ["none", "chevron"],
      mapping: { none: undefined, chevron: <ChevronDownIcon /> },
      description: "Шеврон справа (renderProp: ReactNode)",
    },
    children: { control: "text" },
  },
  args: { children: "Badge", variant: "success", size: "md" },
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

export const Sizes: Story = {
  name: "Размеры",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" size="sm">400 / sm</Badge>
      <Badge variant="success" size="md">500 / md</Badge>
      <Badge variant="success" size="lg">600 / lg</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "С иконкой и шевроном",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success" leftIcon={<DotIcon />}>Активна</Badge>
      <Badge variant="secondary" rightIcon={<ChevronDownIcon />}>production</Badge>
      <Badge variant="outline" leftIcon={<DotIcon />} rightIcon={<ChevronDownIcon />}>
        Фильтр
      </Badge>
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
