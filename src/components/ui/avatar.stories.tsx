import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Аватар сущности: картинка (фавикон/фото), иначе детерминированный " +
          "градиент по seed + первая буква. Один примитив для проектов " +
          "(square) и аккаунтов/команд (circle).",
      },
    },
  },
  argTypes: {
    name: { control: "text" },
    seed: { control: "text", description: "Сид градиента (по умолчанию name)" },
    shape: { control: "inline-radio", options: ["square", "circle"] },
    src: { control: "text", description: "URL картинки (иначе градиент+буква)" },
    gradient: { control: "text", description: "Явный градиент-оверрайд" },
  },
  args: { name: "Storefront", seed: "storefront", shape: "square", className: "h-10 w-10 text-base" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">square (проект)</div>
        <Avatar name="Storefront" seed="storefront" shape="square" className="h-10 w-10 text-base" />
      </div>
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">circle (команда)</div>
        <Avatar name="Acme" seed="acme" shape="circle" className="h-10 w-10 text-base" />
      </div>
      <div className="space-y-2 text-center">
        <div className="text-xs text-muted-foreground">personal (override)</div>
        <Avatar name="Mixa" seed="mixa" shape="circle" gradient="linear-gradient(135deg, #34d399, #06b6d4)" className="h-10 w-10 text-base" />
      </div>
    </div>
  ),
};

export const DeterministicColors: Story = {
  name: "Цвет по seed",
  render: () => (
    <div className="flex flex-wrap gap-3">
      {["paper", "storefront", "marketing", "fullstack", "acme", "layero", "demo", "woys"].map(
        (s) => (
          <Avatar key={s} name={s} seed={s} className="h-10 w-10 text-base" />
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Layero" seed="layero" className="h-5 w-5 text-[10px]" />
      <Avatar name="Layero" seed="layero" className="h-6 w-6 text-[11px]" />
      <Avatar name="Layero" seed="layero" className="h-8 w-8 text-sm" />
      <Avatar name="Layero" seed="layero" className="h-12 w-12 text-lg" />
    </div>
  ),
};
