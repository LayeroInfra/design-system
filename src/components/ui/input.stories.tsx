import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Текстовое поле. Крутится в Playground: placeholder, type, disabled, " +
          "invalid (ошибка). Заменяет сырые <input> (см. Migration/Inputs).",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "password", "number"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: { placeholder: "you@example.com", type: "text", disabled: false, invalid: false },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid w-72 gap-3">
      <Input placeholder="Обычное" />
      <Input placeholder="Disabled" disabled value="readonly" readOnly />
      <Input placeholder="Invalid" invalid defaultValue="неверно" />
    </div>
  ),
};
