import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Migration/Buttons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "«До → после» для кнопок. Слева — как кнопки написаны в control-plane " +
          "сейчас (сырые Tailwind-классы и CSS .btn*), справа — канонический " +
          "<Button>. Всё живое: наводи, кликай, переключай тему вверху.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Row({
  label,
  legacy,
  legacyCode,
  canon,
  canonCode,
}: {
  label: string;
  legacy: React.ReactNode;
  legacyCode: string;
  canon: React.ReactNode;
  canonCode: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 1fr",
        gap: 16,
        alignItems: "center",
        padding: "16px 0",
        borderTop: "1px solid var(--border, #e5e5e5)",
      }}
    >
      <div className="text-sm font-medium text-foreground">{label}</div>

      <div className="space-y-2">
        <div className="flex min-h-9 items-center">{legacy}</div>
        <code className="block text-[11px] leading-snug text-red-600 dark:text-red-400">
          {legacyCode}
        </code>
      </div>

      <div className="space-y-2">
        <div className="flex min-h-9 items-center">{canon}</div>
        <code className="block text-[11px] leading-snug text-green-700 dark:text-green-400">
          {canonCode}
        </code>
      </div>
    </div>
  );
}

export const ButtonsBeforeAfter: Story = {
  name: "Все варианты (до → после)",
  render: () => (
    <div className="max-w-3xl">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 1fr",
          gap: 16,
          paddingBottom: 4,
        }}
        className="text-xs uppercase tracking-wide text-neutral-400"
      >
        <div>вариант</div>
        <div>сейчас (legacy)</div>
        <div>канон &lt;Button&gt;</div>
      </div>

      <Row
        label="Primary"
        legacy={<button className="btn btn-primary">Сохранить</button>}
        legacyCode='.btn btn-primary  ·  bg-primary text-primary-foreground rounded-md px-4 py-2'
        canon={<Button>Сохранить</Button>}
        canonCode="<Button>Сохранить</Button>"
      />

      <Row
        label="Secondary / outline"
        legacy={
          <button className="inline-flex items-center rounded-md border border-[color:var(--border-soft)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--ink)] shadow-sm hover:bg-card dark:bg-card">
            Отмена
          </button>
        }
        legacyCode="bg-white border border-[--border-soft] rounded-md px-4 py-2"
        canon={<Button variant="outline">Отмена</Button>}
        canonCode='<Button variant="outline">Отмена</Button>'
      />

      <Row
        label=".btn-ghost → outline"
        legacy={<button className="btn-ghost px-3 py-1.5 text-sm">Логи деплоя</button>}
        legacyCode=".btn-ghost = bg-card + border + shadow (визуально outline!)"
        canon={
          <Button variant="outline" size="sm">
            Логи деплоя
          </Button>
        }
        canonCode='<Button variant="outline" size="sm">'
      />

      <Row
        label="Настоящий ghost"
        legacy={
          <button className="rounded-md px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
            Пункт меню
          </button>
        }
        legacyCode="прозрачный, hover:bg-neutral-100 (меню, табы)"
        canon={<Button variant="ghost">Пункт меню</Button>}
        canonCode='<Button variant="ghost">'
      />

      <Row
        label="Destructive"
        legacy={
          <button className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
            Удалить
          </button>
        }
        legacyCode=".btn-danger  ·  bg-red-500 text-white rounded-md px-4 py-2"
        canon={<Button variant="destructive">Удалить</Button>}
        canonCode='<Button variant="destructive">Удалить</Button>'
      />

      <Row
        label="Icon (×)"
        legacy={
          <button
            aria-label="Закрыть"
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        }
        legacyCode="p-1.5 text-neutral-500 hover:bg-neutral-100"
        canon={
          <Button variant="ghost" size="icon" aria-label="Закрыть">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Button>
        }
        canonCode='<Button variant="ghost" size="icon">'
      />

      <Row
        label="Link"
        legacy={
          <button className="text-sm font-medium text-[color:var(--ink)] underline underline-offset-4 hover:opacity-70">
            Подробнее
          </button>
        }
        legacyCode="text-sm underline underline-offset-4"
        canon={<Button variant="link">Подробнее</Button>}
        canonCode='<Button variant="link">Подробнее</Button>'
      />

      <Row
        label="Small"
        legacy={<button className="btn btn-primary btn-sm">Мелкая</button>}
        legacyCode=".btn-primary .btn-sm  ·  h-8 px-3 text-[13px]"
        canon={
          <Button size="sm">Мелкая</Button>
        }
        canonCode='<Button size="sm">Мелкая</Button>'
      />
    </div>
  ),
};

function OomBanner({ actions }: { actions: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5 dark:border-red-900/50 dark:bg-red-950/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg text-red-700 dark:bg-red-900/40">
        🧠
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-red-900 dark:text-red-200">
          Приложению не хватает памяти
        </h2>
        <p className="mt-1 text-sm text-red-900/80 dark:text-red-200/80">
          Сайт <span className="font-mono text-[13px]">app.example.ru</span>{" "}
          превысил лимит памяти инстанса и был остановлен платформой (OOM).
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">{actions}</div>
      </div>
    </div>
  );
}

export const InContextOomBanner: Story = {
  name: "В контексте: баннер «нехватка памяти»",
  parameters: {
    docs: {
      description: {
        story:
          "Тот самый экран (RuntimeOomBanner), где сейчас стоят .btn-ghost. " +
          "Видно, что .btn-ghost — это card + рамка + тень, т.е. визуально " +
          "outline. Поэтому канон здесь — <Button variant=\"outline\">, не ghost.",
      },
    },
  },
  render: () => (
    <div className="max-w-2xl space-y-5">
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
          Сейчас — .btn-ghost
        </div>
        <OomBanner
          actions={
            <>
              <button className="btn-ghost px-3 py-1.5 text-sm">Логи деплоя</button>
              <button className="btn-ghost px-3 py-1.5 text-sm">
                Настройки инстанса
              </button>
            </>
          }
        />
      </div>
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
          Канон — &lt;Button variant="outline"&gt;
        </div>
        <OomBanner
          actions={
            <>
              <Button variant="outline" size="sm">
                Логи деплоя
              </Button>
              <Button variant="outline" size="sm">
                Настройки инстанса
              </Button>
            </>
          }
        />
      </div>
    </div>
  ),
};

function BA({
  legacy,
  canon,
  canonLabel = '<Button>',
}: {
  legacy: React.ReactNode;
  canon: React.ReactNode;
  canonLabel?: string;
}) {
  return (
    <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
          сейчас
        </div>
        <div className="rounded-lg border border-dashed border-border p-4">{legacy}</div>
      </div>
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
          канон · {canonLabel}
        </div>
        <div className="rounded-lg border border-dashed border-border p-4">{canon}</div>
      </div>
    </div>
  );
}

export const InContextPublishFooter: Story = {
  name: "В контексте: футер «Опубликовать» (DropDeploy)",
  render: () => (
    <BA
      canonLabel='outline + default'
      legacy={
        <div className="flex items-center justify-between gap-2">
          <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100">
            Назад
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-neutral-700">
            Опубликовать
          </button>
        </div>
      }
      canon={
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline">Назад</Button>
          <Button>Опубликовать</Button>
        </div>
      }
    />
  ),
};

export const InContextDisabledPlaceholder: Story = {
  name: "В контексте: заглушка «Открыть» (Overview)",
  parameters: {
    docs: {
      description: {
        story:
          "Сейчас это <span class=btn-primary btn-sm opacity-40> — не кнопка, " +
          "а заглушка, пока деплой не готов. Канон: <Button size='sm' disabled>.",
      },
    },
  },
  render: () => (
    <BA
      canonLabel='size="sm" disabled'
      legacy={
        <span className="btn-primary btn-sm cursor-not-allowed select-none opacity-40">
          Открыть ↗
        </span>
      }
      canon={
        <Button size="sm" disabled>
          Открыть ↗
        </Button>
      }
    />
  ),
};

export const InContextCopyChip: Story = {
  name: "В контексте: чип «Копировать» (SupportWidget)",
  parameters: {
    docs: {
      description: {
        story:
          "Мелкий чип в строке с командой. Кандидат на secondary/outline, но " +
          "размер меньше sm — возможно нужен size='xs' в Button.",
      },
    },
  },
  render: () => (
    <BA
      canonLabel='outline size="sm"'
      legacy={
        <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
          <code className="flex-1 truncate font-mono text-sm">/start ab12cd</code>
          <button className="rounded-md border border-neutral-200 bg-card px-2 py-1 text-[11px] font-medium text-neutral-700">
            Копировать
          </button>
        </div>
      }
      canon={
        <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
          <code className="flex-1 truncate font-mono text-sm">/start ab12cd</code>
          <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
            Копировать
          </Button>
        </div>
      }
    />
  ),
};

export const InContextDestructiveLink: Story = {
  name: "В контексте: ссылка «Удалить» (Members / Team)",
  parameters: {
    docs: {
      description: {
        story:
          "Красные текст-ссылки удаления. Канон: <Button variant='link'> с " +
          "destructive-цветом. Возможно стоит завести вариант link-destructive.",
      },
    },
  },
  render: () => {
    const Row = ({ remove }: { remove: React.ReactNode }) => (
      <div className="flex items-center gap-3 text-sm">
        <span className="flex-1">maria@example.com</span>
        <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700">
          member
        </span>
        {remove}
      </div>
    );
    return (
      <BA
        canonLabel='variant="link" (destructive)'
        legacy={
          <Row
            remove={
              <button className="text-xs text-red-600 hover:underline dark:text-red-400">
                Удалить
              </button>
            }
          />
        }
        canon={
          <Row
            remove={
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-red-600 hover:text-red-700 dark:text-red-400"
              >
                Удалить
              </Button>
            }
          />
        }
      />
    );
  },
};

export const InContextSegmentedToggle: Story = {
  name: "В контексте: переключатель типа (NewProject) — остаётся",
  parameters: {
    docs: {
      description: {
        story:
          "Это segmented-переключатель, а не кнопка-действие. В <Button> не " +
          "переводим — кандидат на будущий компонент <Segmented>. Оставляем.",
      },
    },
  },
  render: () => (
    <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
      <button className="rounded-md bg-primary px-2.5 py-1.5 text-sm font-medium text-primary-foreground">
        Статика
      </button>
      <button className="rounded-md px-2.5 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300">
        Сервер
      </button>
    </div>
  ),
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export const Tier3IconButtons: Story = {
  name: "Tier 3: иконочные кнопки",
  parameters: {
    docs: {
      description: {
        story:
          "Иконочные контролы (крестики, удаление) → <Button variant='ghost'>. " +
          "Финальный маппинг: (1) крестик в шапке → size='icon' (36px); " +
          "(2) мелкий × в плотной строке → size='icon-sm' (28px). Оба дают " +
          "hover-фон и единый focus-ring.",
      },
    },
  },
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div>
        <div className="mb-3 text-sm font-medium">1. Крестик в шапке (модалка / баннер)</div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
              сейчас
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm font-medium">Заголовок</span>
              <button
                aria-label="Закрыть"
                className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800"
              >
                <span className="block h-[18px] w-[18px]">
                  <XIcon />
                </span>
              </button>
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
              канон · ghost size="icon"
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm font-medium">Заголовок</span>
              <Button variant="ghost" size="icon" aria-label="Закрыть">
                <XIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-sm font-medium">2. Мелкий × в плотной строке (env-var)</div>
        <p className="mb-3 text-xs text-neutral-500">
          size="icon-sm" (28×28) садится в плотную строку, не раздувая её, и
          даёт нормальную хит-область + focus-ring.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
              сейчас
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border p-2">
              <code className="flex-1 rounded-md bg-neutral-100 px-2 py-1.5 font-mono text-sm dark:bg-neutral-800">
                API_KEY=•••
              </code>
              <button
                aria-label="Удалить"
                className="shrink-0 px-2 text-sm text-neutral-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
              канон · ghost size="icon-sm"
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border p-2">
              <code className="flex-1 rounded-md bg-neutral-100 px-2 py-1.5 font-mono text-sm dark:bg-neutral-800">
                API_KEY=•••
              </code>
              <Button variant="ghost" size="icon-sm" aria-label="Удалить" className="shrink-0">
                <XIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
