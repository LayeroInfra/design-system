import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { CtaCard } from "../components/ui/cta-card";
import { ProjectCard } from "../components/ui/project-card";
import { DeployRow } from "../components/ui/deploy-row";
import { WarmupPanel } from "../components/ui/warmup-panel";
import { BranchRow } from "../components/ui/branch-row";
import { ProductionCard, ProductionField } from "../components/ui/production-card";
import { StatusDot } from "../components/ui/status-dot";
import { Spinner } from "../components/ui/spinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { avatarGradient } from "../components/ui/avatar";

const meta: Meta = {
  title: "Сравнение/Before · After",
  parameters: {
    docs: {
      description: {
        component:
          "Текущая вёрстка из прода (слева, точная копия) против организма из ДС " +
          "(справа). По расхождениям решаем: мерджить как есть или доработать ДС.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function Compare({ before, after }: { before: ReactNode; after: ReactNode }) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <div>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
          Сейчас — в проде
        </div>
        {before}
      </div>
      <div>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-success-600">
          Через ДС
        </div>
        {after}
      </div>
    </div>
  );
}

/* ── shared bits ───────────────────────────────────────────────────── */
const DropPreview = (
  <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 text-xs text-neutral-400">
    Перетащите папку
  </div>
);
const RevealArrow = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
const Kebab = (
  <Button variant="ghost" size="icon-sm" aria-label="Меню">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>
  </Button>
);

/* ── 1. CtaCard (LauncherCard) ─────────────────────────────────────── */
export const Cta: Story = {
  name: "Карточка нового проекта",
  render: () => (
    <Compare
      before={
        <button className="group flex h-64 w-72 flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-card text-left shadow-[0_1px_2px_rgba(20,20,19,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-neutral-300">
          <div className="px-5 pt-5">
            <h3 className="flex items-center gap-1 text-base font-semibold text-neutral-900">
              Загрузить из папки
              {RevealArrow}
            </h3>
            <p className="mt-1.5 text-sm leading-snug text-neutral-500">
              Перетащите папку — задеплоим статику или фреймворк
            </p>
          </div>
          <div className="relative mx-5 mt-4 flex-1 overflow-hidden">{DropPreview}</div>
        </button>
      }
      after={
        <CtaCard
          className="w-72"
          title="Загрузить из папки"
          description="Перетащите папку — задеплоим статику или фреймворк"
          preview={DropPreview}
        />
      }
    />
  ),
};

/* ── 2. ProjectCard ────────────────────────────────────────────────── */
export const Project: Story = {
  name: "Карточка проекта",
  render: () => (
    <Compare
      before={
        <div className="w-72 overflow-hidden rounded-2xl border border-neutral-200/80 bg-card shadow-[0_1px_2px_rgba(20,20,19,0.04)]">
          <div className="relative aspect-[16/9] overflow-hidden border-b border-neutral-100" style={{ background: avatarGradient("cli-uploads") }}>
            <div className="absolute right-2 top-2 inline-flex items-center rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium leading-none">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                Готов
              </span>
            </div>
          </div>
          <div className="p-4">
            <div className="truncate font-semibold">cli-uploads</div>
            <div className="mt-0.5 truncate text-sm text-neutral-500">demo/cli-uploads</div>
            <div className="mt-2 truncate font-mono text-xs text-neutral-400">cli-uploads.layero.ru</div>
          </div>
        </div>
      }
      after={
        <ProjectCard
          className="w-72"
          name="cli-uploads"
          repo="demo/cli-uploads"
          host="cli-uploads.layero.ru"
          gradient={avatarGradient("cli-uploads")}
          status={<StatusDot tone="success">Готов</StatusDot>}
        />
      }
    />
  ),
};

/* ── 3. DeployRow ──────────────────────────────────────────────────── */
export const Deploy: Story = {
  name: "Строка деплоя",
  render: () => (
    <Compare
      before={
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-[color:var(--border-soft)] bg-card">
          <div className="relative px-5 py-4">
            <div className="absolute right-3 top-3">{Kebab}</div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="flex flex-col gap-1 pr-12 sm:w-[120px] sm:pr-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-success-500" />
                  <span className="font-medium text-foreground">Готов</span>
                </div>
                <div className="ml-4 font-mono text-sm text-neutral-500">1m 12s</div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-neutral-600">main</span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">Production</span>
                  <Badge variant="success">Активный</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-neutral-600">4139037</span>
                  <span className="text-neutral-600">Initial commit</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm sm:w-[140px] sm:text-right">
                <span className="text-neutral-600">5 дн назад</span>
                <span className="text-neutral-400">git push</span>
              </div>
            </div>
          </div>
        </div>
      }
      after={
        <DeployRow
          className="max-w-md"
          status={{ tone: "success", label: "Готов" }}
          duration="1m 12s"
          branch="main"
          env="Production"
          commitSha="4139037"
          commitMessage="Initial commit"
          timeAgo="5 дн назад"
          source="git push"
          active
          action={Kebab}
        />
      }
    />
  ),
};

/* ── 4. WarmupPanel ────────────────────────────────────────────────── */
export const Warmup: Story = {
  name: "Прогрев CDN",
  render: () => (
    <Compare
      before={
        <div className="max-w-xs px-6 text-center">
          <Spinner className="mx-auto mb-3 h-5 w-5 text-neutral-500" />
          <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400">PUBLISHING</div>
          <div className="mb-3 text-sm font-medium text-neutral-700">Публикуем на CDN</div>
          <div className="mb-2 h-1 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full bg-neutral-700" style={{ width: "62%" }} />
          </div>
          <div className="font-mono text-[11px] leading-relaxed text-neutral-400">
            ETA ~30с · elapsed 18с · ≈12с осталось
          </div>
          <div className="mt-3 text-[10px] leading-snug text-neutral-400">
            Первый деплой регистрирует hostname на edge-узлах.
          </div>
        </div>
      }
      after={
        <WarmupPanel
          stage="PUBLISHING"
          pipeline="Публикуем на CDN"
          percent={62}
          eta="ETA ~30с · elapsed 18с · ≈12с осталось"
          hint="Первый деплой регистрирует hostname на edge-узлах."
        />
      }
    />
  ),
};

/* ── 5. Branches popover panel ─────────────────────────────────────── */
const BRANCHES = [
  { name: "main", host: "paper-test.layero.ru", production: true },
  { name: "feature/new-checkout", host: "paper-test-feature-new-checkout.preview.layero.ru" },
];
export const Branches: Story = {
  name: "Попап веток (панель)",
  render: () => (
    <Compare
      before={
        <div className="w-72 overflow-hidden rounded-lg border border-neutral-200 bg-card shadow-lg">
          <ul className="divide-y divide-neutral-100">
            {BRANCHES.map((b) => (
              <li key={b.name} className="p-2.5 text-xs">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="truncate font-mono font-medium text-neutral-900">{b.name}</span>
                  {b.production && (
                    <span className="rounded bg-success-50 px-1 py-px text-[10px] font-medium text-success-700">production</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex-1 truncate font-mono text-[11px] text-neutral-500">{b.host}</span>
                  <span className="rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-600">Copy</span>
                  <span className="rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-600">Open</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
      after={
        <div className="w-72 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <ul className="divide-y divide-border">
            {BRANCHES.map((b) => (
              <BranchRow key={b.name} name={b.name} host={b.host} production={b.production} />
            ))}
          </ul>
        </div>
      }
    />
  ),
};

/* ── 6. ProductionCard (approx) ────────────────────────────────────── */
const ProdActions = (
  <>
    <Button variant="outline" size="sm">GitHub</Button>
    <Button size="sm">Открыть ↗</Button>
  </>
);
export const Production: Story = {
  name: "Production-карточка",
  render: () => (
    <Compare
      before={
        <div className="overflow-hidden rounded-xl border border-[color:var(--border-soft)] bg-card">
          <div className="flex items-center justify-between gap-2 border-b border-[color:var(--border-soft)] px-5 py-3">
            <h2 className="truncate text-[15px] font-semibold tracking-tightish text-foreground">paper-test</h2>
            <div className="flex items-center gap-2">{ProdActions}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="border-b border-[color:var(--border-soft)] bg-[#fafafa] lg:border-b-0 lg:border-r">
              <div className="aspect-[16/10] w-full" style={{ background: avatarGradient("paper-test") }} />
            </div>
            <div className="space-y-5 p-5">
              <div>
                <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-400">Адрес</div>
                <a className="break-all font-mono text-sm text-foreground" href="#">paper-test.layero.ru</a>
              </div>
              <div>
                <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-400">Статус</div>
                <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-success-500" />Опубликован · 5 дн назад</span>
              </div>
            </div>
          </div>
        </div>
      }
      after={
        <ProductionCard
          name="paper-test"
          actions={ProdActions}
          preview={<div className="h-full w-full" style={{ background: avatarGradient("paper-test") }} />}
        >
          <ProductionField label="Адрес">
            <a className="break-all font-mono text-sm text-foreground hover:underline" href="#">paper-test.layero.ru</a>
          </ProductionField>
          <ProductionField label="Статус">
            <StatusDot tone="success" className="text-sm text-foreground">Опубликован · 5 дн назад</StatusDot>
          </ProductionField>
        </ProductionCard>
      }
    />
  ),
};
