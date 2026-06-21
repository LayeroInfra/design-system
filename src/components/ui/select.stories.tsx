import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Molecules/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Выпадающий выбор (Radix). Состояния: обычное, disabled, с группами.",
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="prod">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Окружение" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="prod">Production</SelectItem>
        <SelectItem value="preview">Preview</SelectItem>
        <SelectItem value="dev">Development</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Выберите окружение" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="prod">Production</SelectItem>
        <SelectItem value="preview">Preview</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="prod">
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="prod">Production</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Регион" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Европа</SelectLabel>
          <SelectItem value="ru">Россия</SelectItem>
          <SelectItem value="de">Германия</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Азия</SelectLabel>
          <SelectItem value="sg">Сингапур</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
