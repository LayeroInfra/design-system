import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

const meta = {
  title: "Molecules/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Открыть поповер</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm text-muted-foreground">
          Произвольный контент в поповере.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
