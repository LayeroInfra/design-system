import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Тумблер. Крутится в Playground: checked, disabled. Цвет включённого " +
          "состояния — системный зелёный (--c-green).",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { checked: false, disabled: false },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <label className="flex items-center gap-2 text-sm">
        <Switch /> off
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Switch defaultChecked /> on
      </label>
      <label className="flex items-center gap-2 text-sm opacity-70">
        <Switch disabled defaultChecked /> disabled
      </label>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-start gap-3">
      <Switch defaultChecked className="mt-0.5" />
      <span className="text-sm">
        <span className="block font-medium text-foreground">Показывать плашку</span>
        <span className="block text-xs text-muted-foreground">
          Включите, когда идут техработы
        </span>
      </span>
    </label>
  ),
};
