import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta = { title: "Atoms/Slider", component: Slider, tags: ["autodocs"] } satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <div className="w-72"><Slider defaultValue={[40]} max={100} step={1} /></div> };
export const Range: Story = { render: () => <div className="w-72"><Slider defaultValue={[25, 75]} max={100} step={1} /></div> };
