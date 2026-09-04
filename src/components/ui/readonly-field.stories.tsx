import type { Meta, StoryObj } from "@storybook/react";
import { ReadonlyField } from "./readonly-field";
import { Label } from "./label";

const meta = {
  title: "Atoms/ReadonlyField",
  component: ReadonlyField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Значение, которое показывают, но не дают править: адрес деплой-хука, " +
          "путь к папке, строка подключения. Выглядит как поле ввода, залито " +
          "серым, фокус не принимает. Текст выделяется мышью — копирование " +
          "кнопкой рядом это удобство, а не единственный способ забрать значение.",
      },
    },
  },
  argTypes: {
    mono: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    value: "https://api.layero.ru/hooks/deploy/2f9c1a6b8e4d7053",
    mono: true,
  },
} satisfies Meta<typeof ReadonlyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-96">
      <ReadonlyField {...args} />
    </div>
  ),
};

/** Пустое значение: печатается подсказка, и печатается приглушённо — иначе
 *  «здесь пусто» неотличимо от «здесь вот такое значение». */
export const Empty: Story = {
  args: { value: "", placeholder: "Адрес появится после создания хука" },
  render: (args) => (
    <div className="w-96">
      <ReadonlyField {...args} />
    </div>
  ),
};

/** Обычный текст вместо моноширинного — для имён и названий. */
export const Plain: Story = {
  args: { value: "Основное окружение", mono: false },
  render: (args) => (
    <div className="w-96">
      <ReadonlyField {...args} />
    </div>
  ),
};

/** Длинное значение обрезается многоточием, а не ломает ряд. */
export const Truncated: Story = {
  args: {
    value:
      "postgresql://app:пароль@rc1a-abcdefghij0123456.mdb.yandexcloud.net:6432/production?sslmode=verify-full",
  },
  render: (args) => (
    <div className="w-96">
      <ReadonlyField {...args} />
    </div>
  ),
};

/**
 * Копирование встроено В поле: иконка справа, после нажатия на полторы
 * секунды становится галочкой. Кнопка рядом отъедала бы ширину у значения —
 * ровно там, где значение длинное и его и так обрезает.
 */
export const Copyable: Story = {
  args: { copyable: true },
  render: (args) => (
    <div className="grid w-[28rem] gap-1.5">
      <Label>Адрес хука</Label>
      <ReadonlyField {...args} copyable value={args.value as string} />
    </div>
  ),
};
