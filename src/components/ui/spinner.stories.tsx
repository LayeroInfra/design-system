import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Индикатор загрузки. Размер и цвет — через className (currentColor). " +
          "Используется и внутри <Button loading>.",
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-neutral-700">
      <Spinner className="h-4 w-4" />
      <Spinner className="h-5 w-5" />
      <Spinner className="h-8 w-8" />
      <Spinner className="h-10 w-10 text-blue-500" />
    </div>
  ),
};
