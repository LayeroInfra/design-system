import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

const meta = {
  title: "Primitives/Checkbox & Radio",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Checkboxes: Story = {
  render: () => (
    <div className="space-y-3 text-sm">
      <label className="flex items-center gap-2"><Checkbox defaultChecked /> Включено</label>
      <label className="flex items-center gap-2"><Checkbox /> Выключено</label>
      <label className="flex items-center gap-2 opacity-60"><Checkbox disabled /> Disabled</label>
    </div>
  ),
};

export const Radios: Story = {
  render: () => (
    <div className="space-y-3 text-sm">
      <label className="flex items-center gap-2"><Radio name="r" defaultChecked /> Вариант A</label>
      <label className="flex items-center gap-2"><Radio name="r" /> Вариант B</label>
      <label className="flex items-center gap-2 opacity-60"><Radio name="r" disabled /> Disabled</label>
    </div>
  ),
};
