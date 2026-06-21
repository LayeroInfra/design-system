import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardSectionHeader,
} from "../../components/ui/card";
import { Metric } from "../../components/ui/metric";
import { Sparkline } from "../../components/ui/sparkline";
import { Checklist, ChecklistItem } from "../../components/ui/checklist";
import { EmptyState } from "../../components/ui/empty-state";
import { BranchCard } from "../../components/ui/branch-card";
import { Button } from "../../components/ui/button";

const meta: Meta = {
  title: "Organisms/Cards",
  parameters: {
    docs: {
      description: {
        component:
          "Карточки дашборда — организмы из ДС: Card + CardSectionHeader + " +
          "Metric/Sparkline (мониторинг), Checklist (чеклист продакшена), " +
          "EmptyState (аналитика не подключена), BranchCard (ветка).",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const Chevron = () => (
  <button className="text-neutral-400 transition hover:text-foreground" aria-label="Открыть">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  </button>
);

export const ChecklistCard: Story = {
  name: "Чеклист продакшена",
  render: () => (
    <Card className="max-w-md">
      <CardSectionHeader title="Чеклист продакшена" meta="2 из 5" />
      <CardContent className="pb-4">
        <Checklist>
          <ChecklistItem interactive done>Подключить Git-репозиторий</ChecklistItem>
          <ChecklistItem interactive done>Сделать production-деплой</ChecklistItem>
          <ChecklistItem interactive>Добавить свой домен</ChecklistItem>
          <ChecklistItem interactive>Подключить веб-аналитику</ChecklistItem>
          <ChecklistItem interactive>Сделать аудит производительности</ChecklistItem>
        </Checklist>
      </CardContent>
    </Card>
  ),
};

export const MonitoringCard: Story = {
  name: "Мониторинг",
  render: () => (
    <Card className="max-w-sm">
      <CardSectionHeader title="Мониторинг" meta="за 24ч" action={<Chevron />} />
      <div className="px-5 pb-4">
        <div className="divide-y divide-neutral-100 [&>*]:py-2.5">
          <Metric
            label="Запросы"
            value="2 956"
            chart={<Sparkline data={[4, 7, 5, 9, 6, 11, 8, 13, 9, 15, 10, 14, 12]} tone="success" area format={(v) => Math.round(v).toLocaleString("ru-RU")} />}
          />
          <Metric
            label="Latency (p95)"
            value="1198 мс"
            chart={<Sparkline data={[3, 4, 3, 5, 4, 12, 4, 5, 4, 6, 5, 4, 5]} tone="info" area format={(v) => `${Math.round(v)} мс`} />}
          />
          <Metric
            label="Доля ошибок"
            value="0.3%"
            chart={<Sparkline data={[1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1]} tone="negative" area format={(v) => `${v.toFixed(1)}%`} />}
          />
        </div>
      </div>
    </Card>
  ),
};

export const AnalyticsEmptyCard: Story = {
  name: "Аналитика — пусто",
  render: () => (
    <Card className="max-w-sm">
      <CardSectionHeader title="Веб-аналитика" meta="за 7д" action={<Chevron />} />
      <CardContent className="pb-4">
        <EmptyState
          variant="plain"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3v18h18" />
              <path d="M7 14l4-4 3 3 5-6" />
            </svg>
          }
          description="Веб-аналитика ещё не подключена"
          action={<Button size="sm" variant="outline">Подключить</Button>}
        />
      </CardContent>
    </Card>
  ),
};

export const Branch: Story = {
  name: "Ветка",
  render: () => (
    <BranchCard
      className="max-w-sm"
      name="main"
      url="valya-team-ds.layero.ru"
      status="ready"
      statusLabel="Готов"
      timestamp="6 мин назад"
      production
    />
  ),
};
