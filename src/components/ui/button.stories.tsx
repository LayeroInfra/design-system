import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7z" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Базовая кнопка. Крутится в Playground: вариант, размер, иконки " +
          "слева/справа, loading, на всю ширину, текст. Иконочные размеры — " +
          "icon-sm / icon / icon-lg.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
      description: "Визуальный вариант",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon-sm", "icon", "icon-lg"],
      description: "Размер (icon-* — квадратные, под одну иконку)",
    },
    leftIcon: {
      control: "radio",
      options: ["none", "icon"],
      mapping: { none: undefined, icon: <CrownIcon /> },
      description: "Иконка слева (renderProp: ReactNode)",
    },
    rightIcon: {
      control: "radio",
      options: ["none", "chevron"],
      mapping: { none: undefined, chevron: <ChevronIcon /> },
      description: "Иконка справа (например, шеврон-disclosure)",
    },
    loading: { control: "boolean", description: "Спиннер + disabled" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean", description: "На всю ширину контейнера" },
    children: { control: "text", description: "Текст кнопки" },
    asChild: { table: { disable: true } },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    loading: false,
    disabled: false,
    fullWidth: false,
    leftIcon: "none" as unknown as ReactNode,
    rightIcon: "none" as unknown as ReactNode,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  name: "С иконкой",
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">leftIcon</div>
        <Button leftIcon={<CrownIcon />}>Button</Button>
      </div>
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">только иконка</div>
        <Button size="icon" aria-label="Crown">
          <CrownIcon />
        </Button>
      </div>
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">rightIcon (disclosure)</div>
        <Button rightIcon={<ChevronIcon />}>Button</Button>
      </div>
    </div>
  ),
};

export const IconSizes: Story = {
  name: "Размеры иконок",
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {(["icon-sm", "icon", "icon-lg"] as const).map((s) => (
        <div key={s} className="space-y-2 text-center">
          <div className="text-xs text-muted-foreground">{s}</div>
          <Button size={s} aria-label={s}>
            <CrownIcon />
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Сохраняем…</Button>
      <Button variant="outline" loading>
        Загрузка
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  name: "На всю ширину",
  render: () => (
    <div className="max-w-sm">
      <Button fullWidth>Продолжить</Button>
    </div>
  ),
};
