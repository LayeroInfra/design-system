import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
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
