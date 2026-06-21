import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./kbd";

const meta = { title: "Atoms/Kbd", component: Kbd, tags: ["autodocs"], args: { children: "K" } } satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Combo: Story = {
  render: () => (
    <span className="flex items-center gap-1 text-sm text-muted-foreground">
      Открыть палитру <Kbd>⌘</Kbd><Kbd>K</Kbd>
    </span>
  ),
};
