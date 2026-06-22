import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "../../components/ui/project-card";
import { CtaCard } from "../../components/ui/cta-card";
import { StatusDot } from "../../components/ui/status-dot";
import { avatarGradient } from "../../components/ui/avatar";

const meta: Meta = {
  title: "Organisms/Projects",
  parameters: {
    docs: {
      description: {
        component:
          "Страница «Все проекты», собранная из ДС: сетка `ProjectCard` (превью " +
          "16:9, статус-пилюля, имя/репо/хост) и ряд `CtaCard` («новый проект»).",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const PROJECTS = [
  { name: "cli-uploads", repo: "demo/cli-uploads", host: "cli-uploads.layero.ru", status: <StatusDot tone="success">Готов</StatusDot> },
  { name: "storefront", repo: "demo/storefront", host: "storefront.layero.ru", status: <StatusDot tone="info">Сборка</StatusDot> },
  { name: "err-cdn-failed", repo: "demo/err-cdn", host: "err-cdn.layero.ru", status: <StatusDot tone="negative">Ошибка</StatusDot>, dimmed: true },
];

export const Grid: Story = {
  name: "Сетка проектов",
  render: () => (
    <ul className="grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p) => (
        <li key={p.name} className="min-w-0">
          <ProjectCard
            name={p.name}
            repo={p.repo}
            host={p.host}
            gradient={avatarGradient(p.name)}
            status={p.status}
            dimmed={p.dimmed}
          />
        </li>
      ))}
    </ul>
  ),
};

const DropPreview = (
  <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted text-xs text-neutral-400">
    Перетащите папку
  </div>
);
const RepoPreview = (
  <div className="space-y-2 rounded-xl border border-border bg-muted p-3">
    {["demo/cli-uploads", "demo/storefront", "demo/tables"].map((r) => (
      <div key={r} className="flex items-center justify-between rounded-md bg-card px-2 py-1.5 text-xs">
        <span className="font-mono text-neutral-600">{r}</span>
        <span className="text-neutral-400">Импорт</span>
      </div>
    ))}
  </div>
);
const CliPreview = (
  <div className="h-full rounded-xl bg-neutral-900 p-3 font-mono text-[11px] leading-relaxed text-neutral-300">
    <div>$ npx layero deploy</div>
    <div className="text-neutral-500">› building…</div>
    <div className="text-success-400">✓ Published</div>
  </div>
);
const McpPreview = (
  <div className="flex h-full items-center justify-center rounded-xl border border-border bg-muted px-3 text-center font-mono text-[11px] text-neutral-500">
    @layero задеплой в production
  </div>
);

export const NewProjectCtas: Story = {
  name: "Карточки «новый проект»",
  render: () => (
    <div className="grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <CtaCard title="Загрузить из папки" description="Перетащите папку — задеплоим статику или фреймворк" preview={DropPreview} />
      <CtaCard title="Импорт из репозитория" description="Подключите GitHub и импортируйте репозиторий" preview={RepoPreview} />
      <CtaCard title="Запуск из терминала" description="Деплой через layero CLI без git-репозитория" preview={CliPreview} />
      <CtaCard title="Подключить через MCP" description="MCP-сервер Layero прямо в AI-редакторе" preview={McpPreview} />
    </div>
  ),
};
