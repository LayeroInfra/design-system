import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./date-picker";

const meta = {
  title: "Molecules/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Выбор даты в стиле панели: поле-триггер и календарь на месяц.",
          "",
          "**Почему не `input[type=date]`.** Он выглядит по-разному в каждом браузере и ни в",
          "одном — как остальные поля: своя иконка, свой шрифт, своё всплывающее окно, а в",
          "Safari календаря нет вовсе.",
          "",
          "**Формат значения** — строка `ГГГГ-ММ-ДД`, как у нативного поля: ручки принимают её",
          "без переводов, а компонент можно подменить, не трогая формы.",
          "",
          "**Ограничения.** Одна дата, без диапазонов и без времени. Неделя начинается с",
          "понедельника, месяц всегда рисуется шестью строками — иначе календарь прыгает по",
          "высоте при переключении месяцев.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { value: "", onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <div className="w-64"><DatePicker {...args} value={value} onChange={setValue} /></div>;
  },
};

export const Chosen: Story = {
  name: "С выбранной датой",
  args: { value: "2026-09-04", onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <div className="w-64"><DatePicker {...args} value={value} onChange={setValue} /></div>;
  },
};

export const FutureOnly: Story = {
  name: "Только будущие даты",
  parameters: {
    docs: {
      description: {
        story: "`min` закрывает прошедшие дни: срок действия роли в прошлом бессмыслен.",
      },
    },
  },
  args: { value: "", min: "2026-08-29", placeholder: "Без ограничения", onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <div className="w-64"><DatePicker {...args} value={value} onChange={setValue} /></div>;
  },
};
