import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./copy-button";

const meta = {
  title: "Atoms/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Кнопка «скопировать» с временным ✓ после копирования. Используется в " +
          "BranchRow / попапе веток, сниппетах и т.п.",
      },
    },
  },
  args: { value: "https://app.layero.ru/", label: "Copy" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
