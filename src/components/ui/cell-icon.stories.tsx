import type { Meta, StoryObj } from "@storybook/react";
import { Database, Mail, ShieldAlert } from "lucide-react";
import { CellIcon } from "./cell-icon";
import { Cell } from "./cell";

const meta = {
  title: "Atoms/CellIcon",
  component: CellIcon,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Иконка ячейки — плашка 36 × 36 px и знак 18 × 18 px. Размер одинаковый на сером, белом и цветном фоне. Для пустых состояний доступен крупный размер 40/20." } } },
  args: { children: <Database /> },
} satisfies Meta<typeof CellIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Muted: Story = {};
export const Plain: Story = { args: { tone: "plain", children: <Mail /> } };
export const Large: Story = { args: { size: "large" } };
export const Error: Story = { args: { className: "text-negative-600", children: <ShieldAlert /> } };
export const Empty: Story = { args: { children: null } };
export const InCells: Story = {
  render: () => <div className="w-80 space-y-1 rounded-2xl border border-border bg-card p-3">
    <Cell leading={<CellIcon><Database /></CellIcon>} title="База данных" subtitle="PostgreSQL" />
    <Cell leading={<CellIcon tone="plain"><Mail /></CellIcon>} title="Почта" subtitle="user@example.com" />
    <Cell leading={<CellIcon className="text-negative-600"><ShieldAlert /></CellIcon>} title="Доступ ограничен" />
  </div>,
};
