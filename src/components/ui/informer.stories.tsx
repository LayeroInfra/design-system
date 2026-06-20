import type { Meta, StoryObj } from "@storybook/react";
import { Informer, InformerAction } from "./informer";

const meta = {
  title: "Components/Informer",
  component: Informer,
  tags: ["autodocs"],
  args: {
    title: "Сообщение",
    children:
      "Чем больше манипуляций потребуется сделать, чтобы воспользоваться той или иной функцией.",
  },
} satisfies Meta<typeof Informer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    onDismiss: () => {},
    actions: (
      <>
        <InformerAction>Действие</InformerAction>
        <InformerAction>Ещё действие</InformerAction>
      </>
    ),
  },
};

export const BodyOnly: Story = {
  args: { title: undefined, onDismiss: () => {} },
};

export const TitleOnly: Story = {
  args: { children: undefined },
};
