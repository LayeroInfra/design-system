import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ListPicker,
  ListPickerEmpty,
  ListPickerItem,
} from "./list-picker";
import { Avatar } from "./avatar";

const meta = {
  title: "Molecules/ListPicker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Поиск + список выбираемых строк + опц. футер. Общая основа для " +
          "пикеров и свитчеров (проекты/команды/репозитории). Позиционирование " +
          "(страница или дропдаун) — на стороне потребителя.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PROJECTS = ["paper-test", "storefront", "marketing", "fullstack", "cli-demo"];

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [q, setQ] = useState("");
      const items = PROJECTS.filter((p) => p.includes(q.trim().toLowerCase()));
      return (
        <div className="max-w-md">
          <ListPicker
            query={q}
            onQueryChange={setQ}
            searchPlaceholder="Найти проект…"
            footer={
              <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-neutral-600 hover:bg-neutral-100 hover:text-foreground">
                + Создать проект
              </button>
            }
          >
            {items.length === 0 ? (
              <ListPickerEmpty>Ничего не найдено</ListPickerEmpty>
            ) : (
              items.map((p) => (
                <ListPickerItem key={p}>
                  <Avatar name={p} seed={p} className="h-6 w-6 text-[11px]" />
                  <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                    {p}
                  </span>
                </ListPickerItem>
              ))
            )}
          </ListPicker>
        </div>
      );
    };
    return <Demo />;
  },
};
