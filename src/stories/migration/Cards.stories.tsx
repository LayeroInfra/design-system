import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Migration/Cards",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Канон контейнера-карточки — CSS-класс .surface (15 использований, " +
          "тематизирован токенами). Компонент ui/card.tsx не используется (0 " +
          "импортов) и подлежит удалению. Ad-hoc карточки приводим к .surface.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardsBeforeAfter: Story = {
  name: "До → после",
  render: () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
          сейчас — ad-hoc
        </div>
        <div className="rounded-xl border border-neutral-200 bg-card p-5 dark:border-neutral-800">
          <div className="font-semibold text-foreground">Заголовок</div>
          <p className="mt-1 text-sm text-muted-foreground">Контент карточки.</p>
        </div>
        <code className="block text-[11px] text-neutral-500">
          rounded-xl border border-neutral-200 bg-card p-5
        </code>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
          канон — .surface
        </div>
        <div className="surface p-5">
          <div className="font-semibold text-foreground">Заголовок</div>
          <p className="mt-1 text-sm text-muted-foreground">Контент карточки.</p>
        </div>
        <code className="block text-[11px] text-neutral-500">{'className="surface p-5"'}</code>
      </div>
    </div>
  ),
};
