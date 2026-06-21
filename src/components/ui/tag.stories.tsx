import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "production" },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Removable: Story = { args: { onRemove: () => {} } };
export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["react", "vite", "typescript"].map((t) => <Tag key={t} onRemove={() => {}}>{t}</Tag>)}
    </div>
  ),
};
