import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { SelectionBar } from "./selection-bar";

const meta = {
  title: "Patterns/SelectionBar",
  component: SelectionBar,
  tags: ["autodocs"],
  args: { count: 3, total: 12, onSelectAll: () => {}, onClear: () => {}, children: <Button size="sm">Редактировать доступ <ChevronDown /></Button> },
} satisfies Meta<typeof SelectionBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const AllSelected: Story = { args: { count: 12 } };
export const Pending: Story = { args: { disabled: true, children: <Button size="sm" loading>Редактировать доступ</Button> } };
export const Empty: Story = { args: { count: 0 } };
