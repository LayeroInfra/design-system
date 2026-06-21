import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./breadcrumbs";

const meta = { title: "Molecules/Breadcrumbs", component: Breadcrumbs, tags: ["autodocs"] } satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "mixa", href: "#" },
      { label: "woys", href: "#" },
      { label: "Настройки" },
    ],
  },
};
