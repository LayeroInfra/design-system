import type { Meta, StoryObj } from "@storybook/react";
import { Globe, ListChecks, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";

import { AccessModeCard } from "./access-mode-card";
import { AccessRuleRow } from "./access-rule-row";
import { Button } from "./button";
import { Card } from "./card";

const meta = {
  title: "Molecules/AccessModeCard",
  component: AccessModeCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Один вариант политики доступа к ресурсу. Карточка, а не строка " +
          "радио-списка: выбор дорогой, и каждому варианту нужна фраза о том, " +
          "что он делает на самом деле. Тон warning помечает вариант, при " +
          "котором ресурс остаётся доступен всем.",
      },
    },
  },
  args: {
    icon: ShieldCheck,
    title: "Только ресурсы Layero",
    description: "Снаружи не пускаем никого. Приложения проекта ходят как обычно.",
    selected: true,
  },
} satisfies Meta<typeof AccessModeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ВыборРежима: Story = {
  name: "Выбор режима",
  render: () => {
    const [mode, setMode] = useState("open");
    return (
      <div className="max-w-xl space-y-2" role="radiogroup" aria-label="Доступ к базе">
        <AccessModeCard
          icon={Globe}
          tone="warning"
          title="Открыто всем"
          description="Подключиться может кто угодно с любого адреса, если знает пароль."
          detail="Так база работает сейчас. Перебор пароля мы отсекаем банами, но список адресов надёжнее."
          selected={mode === "open"}
          onSelect={() => setMode("open")}
        />
        <AccessModeCard
          icon={ListChecks}
          title="Список адресов"
          description="Пускаем только с перечисленных адресов и подсетей."
          detail="Пустой список означает «никого снаружи» — это законный выбор."
          selected={mode === "allowlist"}
          onSelect={() => setMode("allowlist")}
        />
        <AccessModeCard
          icon={ShieldCheck}
          title="Только ресурсы Layero"
          description="Снаружи не пускаем никого; приложения проектов подключаются как обычно."
          selected={mode === "internal"}
          onSelect={() => setMode("internal")}
        />
      </div>
    );
  },
};

export const СписокАдресов: Story = {
  name: "Список адресов и баны",
  render: () => (
    <div className="max-w-xl space-y-4">
      <Card className="p-0">
        <div className="border-b border-border/60 px-4 py-2.5 text-sm font-medium">
          Разрешённые адреса
        </div>
        <div className="divide-y divide-border/60">
          <AccessRuleRow
            value="203.0.113.5/32"
            comment="Ноутбук, добавлен кнопкой «мой адрес»"
            meta="бессрочно"
            action={
              <Button variant="ghost" size="sm" aria-label="Удалить">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
          <AccessRuleRow
            value="198.51.100.0/24"
            comment="Офис подрядчика"
            meta="до 18 августа"
            action={
              <Button variant="ghost" size="sm" aria-label="Удалить">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
      </Card>

      <Card className="p-0">
        <div className="border-b border-border/60 px-4 py-2.5 text-sm font-medium">
          Заблокированы за перебор
        </div>
        <div className="divide-y divide-border/60">
          <AccessRuleRow
            tone="negative"
            value="45.156.87.10"
            comment="14 неудачных входов подряд"
            meta="разбан через 22 мин"
            action={
              <Button variant="ghost" size="sm">
                Разбанить
              </Button>
            }
          />
        </div>
      </Card>
    </div>
  ),
};
