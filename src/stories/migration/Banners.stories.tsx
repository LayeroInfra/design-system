import type { Meta, StoryObj } from "@storybook/react";
import { Informer } from "@/components/ui/informer";

const meta = {
  title: "Migration/Banners",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "«До → после» для баннеров проекта. Слева — текущие самописные " +
          "баннеры (RuntimeOom/CdnFailed/Suspended/RuntimeType/Maintenance), " +
          "справа — <Informer> с тоном. Заголовок нейтральный, текст серый, " +
          "иконка по тону.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Block({
  caption,
  legacy,
  tone,
  title,
  body,
}: {
  caption: string;
  legacy: React.ReactNode;
  tone: "success" | "warning" | "danger" | "info";
  title: string;
  body: string;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{caption}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
            сейчас
          </div>
          {legacy}
        </div>
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
            канон · tone="{tone}"
          </div>
          <Informer tone={tone} title={title}>
            {body}
          </Informer>
        </div>
      </div>
    </div>
  );
}

export const BannersBeforeAfter: Story = {
  name: "До → после",
  render: () => (
    <div className="max-w-4xl space-y-8">
      <Block
        caption="OOM (RuntimeOomBanner)"
        tone="danger"
        title="Приложению не хватает памяти"
        body="Сайт превысил лимит памяти инстанса и был остановлен платформой (OOM)."
        legacy={
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg text-red-700 dark:bg-red-900/40">
              🧠
            </div>
            <div>
              <div className="text-sm font-semibold text-red-900 dark:text-red-200">
                Приложению не хватает памяти
              </div>
              <p className="mt-1 text-sm text-red-900/80 dark:text-red-200/80">
                Сайт превысил лимит памяти инстанса и был остановлен (OOM).
              </p>
            </div>
          </div>
        }
      />
      <Block
        caption="Ручной деплой (RuntimeTypeBanner)"
        tone="info"
        title="Автодеплой включён"
        body="Каждый push в main мгновенно становится production. Можно переключить на ручную публикацию."
        legacy={
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200">
            Каждый push в main мгновенно становится production. Можно переключить
            на ручную публикацию.
          </div>
        }
      />
      <Block
        caption="Лимит сборок (warning)"
        tone="warning"
        title="Лимит сборок почти исчерпан"
        body="Осталось 2 из 100 сборок в этом месяце."
        legacy={
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
            Лимит сборок почти исчерпан — осталось 2 из 100.
          </div>
        }
      />
    </div>
  ),
};
