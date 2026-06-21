import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  args: { value: 60 },
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (a) => <div className="w-80"><Progress {...a} /></div> };
export const Steps: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {[15, 50, 85, 100].map((v) => <Progress key={v} value={v} />)}
    </div>
  ),
};
