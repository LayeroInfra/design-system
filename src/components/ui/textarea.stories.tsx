import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { Label } from "./label";

const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Многострочное поле. Крутится в Playground: placeholder, rows, disabled, " +
          "invalid (ошибка). Тот же визуальный язык, что у <Input>.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 12 } },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {
    placeholder: "Идут технические работы — некоторые функции могут быть недоступны",
    rows: 3,
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <div className="w-96"><Textarea {...args} /></div> };

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="msg">Текст плашки</Label>
      <Textarea id="msg" {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid w-96 gap-3">
      <Textarea placeholder="Обычное" rows={2} />
      <Textarea placeholder="Disabled" rows={2} disabled value="readonly" readOnly />
      <Textarea placeholder="Invalid" rows={2} invalid defaultValue="неверно" />
    </div>
  ),
};
