import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./filter-chip";

const meta = {
  title: "Components/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Пилюля-фильтр с опц. статус-точкой и счётчиком. Один активен. " +
          "Пример — фильтры статусов проектов на дашборде.",
      },
    },
  },
  argTypes: {
    active: { control: "boolean" },
    count: { control: "number" },
    tone: { control: "inline-radio", options: [undefined, "blue", "green", "amber", "red"] },
    children: { control: "text" },
  },
  args: { active: true, count: 7, children: "Активные", tone: "green" },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FilterRow: Story = {
  name: "Ряд фильтров",
  render: () => {
    const Demo = () => {
      const [f, setF] = useState("all");
      const chips = [
        { id: "all", label: "Все", count: 7, tone: undefined },
        { id: "build", label: "Сборка", count: 1, tone: "blue" as const },
        { id: "active", label: "Активные", count: 3, tone: "green" as const },
        { id: "error", label: "Ошибки", count: 1, tone: "red" as const },
        { id: "idle", label: "Приостановлено", count: 2, tone: "amber" as const },
      ];
      return (
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <FilterChip key={c.id} active={f === c.id} tone={c.tone} count={c.count} onClick={() => setF(c.id)}>
              {c.label}
            </FilterChip>
          ))}
        </div>
      );
    };
    return <Demo />;
  },
};
