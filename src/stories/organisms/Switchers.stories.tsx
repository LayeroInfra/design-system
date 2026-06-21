import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Cell } from "../../components/ui/cell";
import { Avatar } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";

const meta: Meta = {
  title: "Organisms/Switchers",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Дропдауны выбора проекта и команды — организмы, собранные из атомов/" +
          "молекул ДС: Input (поиск с иконкой), Cell + Avatar (строки), Separator.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);
const Gear = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);
const GridOutline = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
);
const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);

/** Search field — uses the Input atom's built-in search variant. */
function SearchRow({ placeholder }: { placeholder: string }) {
  return (
    <div className="p-1.5">
      <Input search placeholder={placeholder} />
    </div>
  );
}
/** Settings gear — the DS ghost icon button atom (size icon-sm, 32×32). Its
 *  translucent hover stays visible even on the selected row's grey bg; the icon
 *  inherits the button's foreground colour (dark, like the check). */
const GearButton = () => (
  <Button variant="ghost" size="icon-sm" aria-label="Настройки команды">
    <Gear />
  </Button>
);
const IconLead = ({ children }: { children: ReactNode }) => (
  <span className="flex h-5 w-5 items-center justify-center text-neutral-500">{children}</span>
);
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
    {children}
  </div>
);
const Divider = () => <Separator className="bg-neutral-100" />;
const Panel = ({ children }: { children: ReactNode }) => (
  <div className="w-80 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
    {children}
  </div>
);

export const ProjectSwitcher: Story = {
  name: "Выбор проекта",
  render: () => (
    <Panel>
      <SearchRow placeholder="Найти проект…" />
      <div className="px-1 pb-1">
        <Cell interactive leading={<IconLead><GridOutline /></IconLead>} title="Все проекты" />
      </div>
      <Divider />
      <Eyebrow>Проекты</Eyebrow>
      <div className="px-1 pb-1">
        <Cell interactive leading={<Avatar name="layero-docs" shape="square" className="h-5 w-5 text-[10px]" />} title="layero-docs" subtitle="LayeroInfra/layero-docs" />
        <Cell interactive active leading={<Avatar name="design-system" shape="square" className="h-5 w-5 text-[10px]" />} title="ds" subtitle="LayeroInfra/design-system" trailing={<Check />} />
      </div>
      <Divider />
      <div className="px-1 py-1">
        <Cell interactive leading={<IconLead><Plus /></IconLead>} title="Новый проект" />
      </div>
    </Panel>
  ),
};

export const AccountSwitcher: Story = {
  name: "Выбор команды",
  render: () => (
    <Panel>
      <SearchRow placeholder="Найти команду…" />
      <Eyebrow>Personal account</Eyebrow>
      <div className="px-1 pb-1">
        <Cell interactive leading={<Avatar name="mixa" className="h-5 w-5 text-[10px]" />} title="mixa" subtitle="Личный аккаунт" />
      </div>
      <Divider />
      <Eyebrow>Teams</Eyebrow>
      <div className="px-1 pb-1">
        <Cell
          interactive
          active
          leading={<Avatar name="valya-team" className="h-5 w-5 text-[10px]" />}
          title="valya-team"
          subtitle="Admin · Team"
          trailing={<div className="flex items-center gap-3"><GearButton /><Check /></div>}
        />
        <Cell interactive leading={<Avatar name="murzak" className="h-5 w-5 text-[10px]" />} title="murzak" subtitle="Admin · Team" trailing={<GearButton />} />
      </div>
      <Divider />
      <div className="px-1 py-1">
        <Cell interactive leading={<IconLead><Plus /></IconLead>} title="Создать команду" />
      </div>
    </Panel>
  ),
};
