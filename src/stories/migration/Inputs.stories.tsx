import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Migration/Inputs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "«До → после» для полей ввода. Слева — сырые <input className> из " +
          "control-plane, справа — канонический <Input>.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputsBeforeAfter: Story = {
  name: "До → после",
  render: () => (
    <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
          сейчас — сырой input
        </div>
        <input
          placeholder="you@example.com"
          className="w-full rounded-md border border-neutral-200 bg-card px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
        />
        <code className="block text-[11px] text-neutral-500">
          rounded-md border px-3 py-2 focus:border-neutral-900
        </code>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
          канон — &lt;Input&gt;
        </div>
        <Input placeholder="you@example.com" />
        <code className="block text-[11px] text-neutral-500">{"<Input placeholder=… />"}</code>
      </div>
    </div>
  ),
};
