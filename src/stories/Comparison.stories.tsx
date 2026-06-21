import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Avatar } from "../components/ui/avatar";
import { Cell } from "../components/ui/cell";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardContent,
  CardSectionHeader,
} from "../components/ui/card";
import { Metric } from "../components/ui/metric";
import { Sparkline } from "../components/ui/sparkline";
import { Checklist, ChecklistItem } from "../components/ui/checklist";
import { EmptyState } from "../components/ui/empty-state";
import { BranchCard } from "../components/ui/branch-card";
import { Button } from "../components/ui/button";

const meta: Meta = {
  title: "Сравнение/Before · After",
  parameters: {
    docs: {
      description: {
        component:
          "До миграции: слева — текущая вёрстка из прода (точная копия), справа — " +
          "та же сущность, собранная из ДС. Видны расхождения в размерах " +
          "(аватары, заголовки, значения) — по ним решаем, тянуть ДС к проду " +
          "или принять обновлённый вид.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

function Compare({ before, after }: { before: ReactNode; after: ReactNode }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
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

/* ── icons ─────────────────────────────────────────────────────────── */
const Search = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-neutral-400" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
const Check = ({ cls = "text-neutral-700" }: { cls?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);
const Grid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
);
const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);
const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-4 w-4 text-neutral-400" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
);

/* ── 1. Project switcher ───────────────────────────────────────────── */
export const ProjectSwitcher: Story = {
  name: "Свитчер проекта",
  render: () => (
    <Compare
      before={
        <div className="w-80 overflow-hidden rounded-lg border border-neutral-200 bg-card shadow-lg">
          <div className="px-2 pt-2">
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2"><Search /></span>
              <input placeholder="Найти проект…" className="w-full rounded-md border border-neutral-200 bg-card py-1.5 pl-8 pr-2 text-sm focus:border-neutral-900 focus:outline-none" />
            </div>
          </div>
          <ul className="px-1 pb-1 pt-2">
            <li className="flex items-center gap-2 rounded-md bg-neutral-100 px-2 py-1.5 text-sm">
              <Grid />
              <span className="flex-1 font-medium text-neutral-900">Все проекты</span>
              <Check />
            </li>
          </ul>
          <div className="border-t border-neutral-100 px-2 pb-1 pt-2 text-[11px] uppercase tracking-wider text-neutral-400">
            Проекты
          </div>
          <ul className="px-1 pb-1">
            <li className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm">
              <Avatar name="layero-docs" shape="square" className="h-5 w-5 text-[10px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-neutral-900">layero-docs</span>
                <span className="block truncate font-mono text-[11px] text-neutral-500">LayeroInfra/layero-docs</span>
              </span>
            </li>
            <li className="flex items-center gap-2 rounded-md bg-neutral-100 px-2 py-1.5 text-sm">
              <Avatar name="design-system" shape="square" className="h-5 w-5 text-[10px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-neutral-900">ds</span>
                <span className="block truncate font-mono text-[11px] text-neutral-500">LayeroInfra/design-system</span>
              </span>
              <Check />
            </li>
          </ul>
          <div className="border-t border-neutral-100 p-1">
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-700">
              <Plus /> Новый проект
            </button>
          </div>
        </div>
      }
      after={
        <div className="w-80 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          <div className="p-1.5">
            <Input search placeholder="Найти проект…" />
          </div>
          <div className="px-1 pb-1">
            <Cell interactive leading={<span className="flex h-5 w-5 items-center justify-center text-neutral-500"><Grid /></span>} title="Все проекты" />
          </div>
          <Separator className="bg-neutral-100" />
          <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-neutral-400">Проекты</div>
          <div className="px-1 pb-1">
            <Cell interactive leading={<Avatar name="layero-docs" shape="square" className="h-5 w-5 text-[10px]" />} title="layero-docs" subtitle="LayeroInfra/layero-docs" />
            <Cell interactive active leading={<Avatar name="design-system" shape="square" className="h-5 w-5 text-[10px]" />} title="ds" subtitle="LayeroInfra/design-system" trailing={<Check cls="text-foreground" />} />
          </div>
          <Separator className="bg-neutral-100" />
          <div className="px-1 py-1">
            <Cell interactive leading={<span className="flex h-5 w-5 items-center justify-center text-neutral-500"><Plus /></span>} title="Новый проект" />
          </div>
        </div>
      }
    />
  ),
};

/* ── 2. Branch card ────────────────────────────────────────────────── */
export const Branch: Story = {
  name: "Карточка ветки",
  render: () => (
    <Compare
      before={
        <div className="w-80 rounded-xl border border-neutral-200 bg-card p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-success-500" />
            <span className="truncate font-medium">main</span>
            <span className="ml-auto shrink-0 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
              production
            </span>
          </div>
          <div className="mb-2 font-mono text-xs text-neutral-500">valya-team-ds.layero.ru</div>
          <div className="text-xs text-neutral-400">Готов · 6 мин назад</div>
        </div>
      }
      after={
        <BranchCard className="w-80" name="main" url="valya-team-ds.layero.ru" status="ready" statusLabel="Готов" timestamp="6 мин назад" production />
      }
    />
  ),
};

/* ── 3. Checklist card ─────────────────────────────────────────────── */
const CHECK = [
  ["Подключить Git-репозиторий", true],
  ["Сделать production-деплой", true],
  ["Добавить свой домен", false],
  ["Подключить веб-аналитику", false],
  ["Сделать аудит производительности", false],
] as const;

export const ChecklistCard: Story = {
  name: "Чеклист продакшена",
  render: () => (
    <Compare
      before={
        <section className="flex w-80 flex-col rounded-2xl border border-neutral-200 bg-card p-5 pb-4">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Чеклист продакшена</h3>
            <span className="text-xs text-neutral-500">2 из 5</span>
          </div>
          <ul className="flex flex-col gap-1">
            {CHECK.map(([label, done]) => (
              <li key={label} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm">
                <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${done ? "border-success-500 bg-success-500 text-white" : "border-neutral-300 text-transparent"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className={done ? "text-neutral-400 line-through" : "text-foreground"}>{label}</span>
              </li>
            ))}
          </ul>
        </section>
      }
      after={
        <Card className="w-80 overflow-hidden">
          <CardSectionHeader interactive title="Чеклист продакшена" meta="2 из 5" />
          <CardContent className="pb-4">
            <Checklist>
              {CHECK.map(([label, done]) => (
                <ChecklistItem key={label} interactive done={done}>{label}</ChecklistItem>
              ))}
            </Checklist>
          </CardContent>
        </Card>
      }
    />
  ),
};

/* ── 4. Monitoring card ────────────────────────────────────────────── */
function BeforeSpark({ data, color }: { data: number[]; color: string }) {
  const w = 120, h = 40, pad = 3;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const step = w / (data.length - 1);
  const xy = (i: number): [number, number] => [i * step, h - pad - ((data[i] - min) / range) * (h - 2 * pad)];
  const line = data.map((_, i) => { const [x, y] = xy(i); return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`; }).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <div className={`w-[120px] shrink-0 ${color}`}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none">
        <path d={area} className="fill-current opacity-10" />
        <path d={line} className="fill-none stroke-current" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
const REQ = [4, 7, 5, 9, 6, 11, 8, 13, 9, 15, 10, 14, 12];
const LAT = [3, 4, 3, 5, 4, 12, 4, 5, 4, 6, 5, 4, 5];
const ERR = [1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1];

export const MonitoringCard: Story = {
  name: "Мониторинг",
  render: () => (
    <Compare
      before={
        <section className="w-80 rounded-2xl border border-neutral-200 bg-card p-5 pb-4">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Мониторинг</h3>
            <span className="text-xs text-neutral-500">за 24ч</span>
            <Chevron />
          </div>
          <div className="divide-y divide-neutral-100">
            {[
              ["Запросы", "2 956", REQ, "text-success-500"],
              ["Latency (p95)", "1198 мс", LAT, "text-info-500"],
              ["Доля ошибок", "0.3%", ERR, "text-negative-500"],
            ].map(([label, value, data, color]) => (
              <div key={label as string} className="flex items-center justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-xs text-neutral-500">{label}</div>
                  <div className="mt-0.5 text-base font-semibold tracking-tightish text-foreground">{value}</div>
                </div>
                <BeforeSpark data={data as number[]} color={color as string} />
              </div>
            ))}
          </div>
        </section>
      }
      after={
        <Card className="w-80 overflow-hidden">
          <CardSectionHeader interactive title="Мониторинг" meta="за 24ч" action={<span className="text-neutral-400"><Chevron /></span>} />
          <div className="px-5 pb-4">
            <div className="divide-y divide-neutral-100 [&>*]:py-2.5">
              <Metric label="Запросы" value="2 956" chart={<Sparkline data={REQ} tone="success" area format={(v) => Math.round(v).toLocaleString("ru-RU")} />} />
              <Metric label="Latency (p95)" value="1198 мс" chart={<Sparkline data={LAT} tone="info" area format={(v) => `${Math.round(v)} мс`} />} />
              <Metric label="Доля ошибок" value="0.3%" chart={<Sparkline data={ERR} tone="negative" area format={(v) => `${v.toFixed(1)}%`} />} />
            </div>
          </div>
        </Card>
      }
    />
  ),
};

/* ── 5. Analytics empty ────────────────────────────────────────────── */
const ChartIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
);

export const AnalyticsEmpty: Story = {
  name: "Аналитика — пусто",
  render: () => (
    <Compare
      before={
        <section className="flex w-80 flex-col rounded-2xl border border-neutral-200 bg-card p-5 pb-4">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Веб-аналитика</h3>
            <span className="text-xs text-neutral-500">за 7д</span>
            <Chevron />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">{ChartIcon}</div>
            <p className="mb-4 max-w-[220px] text-sm text-neutral-500">Веб-аналитика ещё не подключена</p>
            <Button variant="outline" size="sm">Подключить</Button>
          </div>
        </section>
      }
      after={
        <Card className="w-80 overflow-hidden">
          <CardSectionHeader interactive title="Веб-аналитика" meta="за 7д" action={<span className="text-neutral-400"><Chevron /></span>} />
          <CardContent className="pb-4">
            <EmptyState variant="plain" icon={ChartIcon} description="Веб-аналитика ещё не подключена" action={<Button size="sm" variant="outline">Подключить</Button>} />
          </CardContent>
        </Card>
      }
    />
  ),
};
