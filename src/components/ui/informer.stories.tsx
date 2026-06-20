import type { Meta, StoryObj } from "@storybook/react";
import { Informer, InformerAction } from "./informer";

const meta = {
  title: "Components/Informer",
  component: Informer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Инлайн-уведомление с тоном (success/warning/danger/info). Крутится в " +
          "Playground: тон, заголовок, текст, крестик. Кнопки действий — " +
          "<InformerAction>.",
      },
    },
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["success", "warning", "danger", "info"],
    },
    title: { control: "text" },
    children: { control: "text" },
    onDismiss: {
      control: "boolean",
      mapping: { true: () => {}, false: undefined },
      description: "Показать крестик закрытия",
    },
  },
  args: {
    tone: "success",
    title: "Сообщение",
    children:
      "Чем больше манипуляций потребуется сделать, чтобы воспользоваться той или иной функцией.",
    onDismiss: false as unknown as () => void,
  },
} satisfies Meta<typeof Informer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <Informer tone="success" title="Готово">
        Деплой опубликован и доступен по основному домену.
      </Informer>
      <Informer tone="info" title="К сведению">
        Сертификат продлится автоматически за 30 дней до истечения.
      </Informer>
      <Informer tone="warning" title="Внимание">
        Лимит сборок почти исчерпан — осталось 2 из 100 в этом месяце.
      </Informer>
      <Informer tone="danger" title="Ошибка">
        Контейнер упал при старте (OOM) — приложению не хватает памяти.
      </Informer>
    </div>
  ),
};

export const WithActions: Story = {
  args: {
    onDismiss: (() => {}) as () => void,
    actions: (
      <>
        <InformerAction>Действие</InformerAction>
        <InformerAction>Ещё действие</InformerAction>
      </>
    ),
  },
};

export const BodyOnly: Story = {
  args: { title: undefined, onDismiss: (() => {}) as () => void },
};
