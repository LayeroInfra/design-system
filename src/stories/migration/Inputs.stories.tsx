import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Migration/Inputs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "«До → после» для полей мастера ProjectSetup. Слева — текущие сырые " +
          "<input> (единый класс rounded-lg border … font-mono), справа — " +
          "канон <Input> (border/bg/focus в компоненте; mono/ширина через " +
          "className).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const LEGACY =
  "w-full rounded-lg border border-neutral-200 bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:border-neutral-900 dark:bg-card dark:border-neutral-800";

function Col({ tone, label, children }: { tone: "now" | "canon"; label: string; children: ReactNode }) {
  const c = tone === "now" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-400";
  return (
    <div className="space-y-2">
      <div className={`text-xs font-medium uppercase tracking-wide ${c}`}>{label}</div>
      {children}
    </div>
  );
}

export const InputsBeforeAfter: Story = {
  name: "Поля ProjectSetup (до → после)",
  render: () => (
    <div className="max-w-3xl space-y-8">
      <div>
        <div className="mb-3 text-sm font-medium">Команда сборки / каталог вывода</div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Col tone="now" label="сейчас — сырой input">
            <input defaultValue="npm run build" className={LEGACY} />
            <code className="block text-[11px] text-neutral-500">rounded-lg border … font-mono</code>
          </Col>
          <Col tone="canon" label="канон — <Input>">
            <Input defaultValue="npm run build" className="font-mono" />
            <code className="block text-[11px] text-neutral-500">{'<Input className="font-mono" />'}</code>
          </Col>
        </div>
      </div>

      <div>
        <div className="mb-3 text-sm font-medium">Папка монорепо (с label)</div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Col tone="now" label="сейчас">
            <label className="mb-1 block text-xs text-neutral-500">Папка</label>
            <input defaultValue="frontend" placeholder="frontend" className={LEGACY} />
          </Col>
          <Col tone="canon" label="канон">
            <label className="mb-1 block text-xs text-muted-foreground">Папка</label>
            <Input defaultValue="frontend" placeholder="frontend" className="font-mono" />
          </Col>
        </div>
      </div>

      <div>
        <div className="mb-3 text-sm font-medium">Строка переменной окружения (key + value + удалить)</div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Col tone="now" label="сейчас">
            <div className="flex items-center gap-2">
              <input defaultValue="API_KEY" placeholder="KEY" className="w-28 shrink-0 rounded-lg border border-neutral-200 bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:border-neutral-900 dark:border-neutral-800" />
              <input defaultValue="secret" placeholder="value" className="flex-1 min-w-0 rounded-lg border border-neutral-200 bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:border-neutral-900 dark:border-neutral-800" />
              <button aria-label="Удалить" className="shrink-0 px-2 text-sm text-neutral-400 hover:text-red-600">×</button>
            </div>
          </Col>
          <Col tone="canon" label="канон">
            <div className="flex items-center gap-2">
              <Input defaultValue="API_KEY" placeholder="KEY" className="w-28 shrink-0 font-mono" />
              <Input defaultValue="secret" placeholder="value" className="flex-1 font-mono" />
              <Button variant="ghost" size="icon-sm" aria-label="Удалить" className="shrink-0 text-neutral-400 hover:text-red-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </Button>
            </div>
          </Col>
        </div>
      </div>

      <div className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
        Остаётся как есть: <code>labelDraft</code> — сгруппированное поле с
        префиксом (как slug команды), не отдельный `&lt;Input&gt;`.
      </div>
    </div>
  ),
};
