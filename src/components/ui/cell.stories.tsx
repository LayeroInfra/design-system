import type { Meta, StoryObj } from "@storybook/react";
import { Cell } from "./cell";
import { Avatar } from "./avatar";
import { Badge } from "./badge";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const meta = {
  title: "Molecules/Cell",
  component: Cell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Строка списка: лидирующая медиа · заголовок + подзаголовок · трейлинг. " +
          "Базовый блок для свитчеров, пикеров и списков настроек.",
      },
    },
  },
  args: {
    title: "ds",
    subtitle: "LayeroInfra/design-system",
    interactive: true,
  },
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    leading: <Avatar name="ds" shape="square" className="h-8 w-8" />,
    trailing: <Check />,
    active: true,
  },
};

export const List: Story = {
  name: "Список",
  render: () => (
    <div className="w-72 space-y-1 rounded-xl border border-border bg-card p-1.5">
      <Cell
        interactive
        leading={<Avatar name="layero-docs" shape="square" className="h-8 w-8" />}
        title="layero-docs"
        subtitle="LayeroInfra/layero-docs"
      />
      <Cell
        interactive
        active
        leading={<Avatar name="ds" shape="square" className="h-8 w-8" />}
        title="ds"
        subtitle="LayeroInfra/design-system"
        trailing={<Check />}
      />
      <Cell
        interactive
        leading={<Avatar name="valya-team" className="h-8 w-8" />}
        title="valya-team"
        subtitle="Admin · Team"
        trailing={<Badge variant="secondary">Team</Badge>}
      />
    </div>
  ),
};
