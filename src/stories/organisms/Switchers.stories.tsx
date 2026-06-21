import type { Meta, StoryObj } from "@storybook/react";
import { Cell } from "../../components/ui/cell";
import { Avatar } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

const meta: Meta = {
  title: "Organisms/Switchers",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Дропдауны выбора проекта и команды — организмы, собранные из атомов/" +
          "молекул ДС: Input (поиск), Cell + Avatar (строки), Badge, Separator.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Gear = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-400" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-80 rounded-lg border border-border bg-card p-2 shadow-lg">
      <div className="p-1.5">
        <Input placeholder="Найти проект…" />
      </div>
      {children}
    </div>
  );
}

export const ProjectSwitcher: Story = {
  name: "Выбор проекта",
  render: () => (
    <Panel>
      <Cell
        interactive
        className="mt-1"
        leading={
          <span className="flex h-5 w-5 items-center justify-center rounded bg-secondary text-neutral-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></svg>
          </span>
        }
        title="Все проекты"
      />
      <div className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
        Проекты
      </div>
      <Cell
        interactive
        leading={<Avatar name="layero-docs" shape="square" className="h-5 w-5 text-[10px]" />}
        title="layero-docs"
        subtitle="LayeroInfra/layero-docs"
      />
      <Cell
        interactive
        active
        leading={<Avatar name="design-system" shape="square" className="h-5 w-5 text-[10px]" />}
        title="ds"
        subtitle="LayeroInfra/design-system"
        trailing={<Check />}
      />
      <Separator className="my-1.5" />
      <Cell
        interactive
        leading={
          <span className="flex h-5 w-5 items-center justify-center rounded text-neutral-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        }
        title="Новый проект"
      />
    </Panel>
  ),
};

export const AccountSwitcher: Story = {
  name: "Выбор команды",
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-card p-2 shadow-lg">
      <div className="p-1.5">
        <Input placeholder="Найти команду…" />
      </div>
      <div className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
        Personal account
      </div>
      <Cell
        interactive
        leading={<Avatar name="mixa" className="h-5 w-5 text-[10px]" />}
        title="mixa"
        subtitle="Личный аккаунт"
      />
      <Separator className="my-1.5" />
      <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
        Teams
      </div>
      <Cell
        interactive
        active
        leading={<Avatar name="valya-team" className="h-5 w-5 text-[10px]" />}
        title="valya-team"
        subtitle="Admin · Team"
        trailing={
          <div className="flex items-center gap-2">
            <Gear />
            <Check />
          </div>
        }
      />
      <Cell
        interactive
        leading={<Avatar name="murzak" className="h-5 w-5 text-[10px]" />}
        title="murzak"
        subtitle="Admin · Team"
        trailing={<Gear />}
      />
      <Separator className="my-1.5" />
      <Cell
        interactive
        leading={
          <span className="flex h-5 w-5 items-center justify-center rounded text-neutral-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        }
        title="Создать команду"
      />
    </div>
  ),
};
