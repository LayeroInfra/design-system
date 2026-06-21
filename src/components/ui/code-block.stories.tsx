import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./code-block";

const meta = {
  title: "Molecules/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  args: { children: "npx layero deploy" },
} satisfies Meta<typeof CodeBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => <div className="max-w-md"><CodeBlock {...a} /></div> };
export const Multiline: Story = {
  render: () => (
    <div className="max-w-md">
      <CodeBlock>{`cd ./my-site\nnpx layero deploy`}</CodeBlock>
    </div>
  ),
};
