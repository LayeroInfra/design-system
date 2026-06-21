import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Atoms/Feedback & Layout",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeparatorDemo: Story = {
  name: "Separator",
  render: () => (
    <div className="w-72 text-sm">
      <p>Сверху</p>
      <Separator className="my-3" />
      <p>Снизу</p>
      <div className="mt-4 flex h-6 items-center gap-3">
        <span>A</span>
        <Separator orientation="vertical" />
        <span>B</span>
      </div>
    </div>
  ),
};

export const SkeletonDemo: Story = {
  name: "Skeleton",
  render: () => (
    <div className="w-72 space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  ),
};
