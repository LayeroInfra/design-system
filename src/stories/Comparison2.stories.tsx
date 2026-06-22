import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { PlanPanel } from "../components/ui/plan-panel";
import { PaymentMethodCard } from "../components/ui/payment-method";
import { PaymentHistory } from "../components/ui/payment-history";
import { DiscountBanner } from "../components/ui/discount-banner";
import { BetaProgramCard } from "../components/ui/beta-card";
import { MemberRow } from "../components/ui/member-row";
import { IntegrationCard } from "../components/ui/integration-card";
import { DomainCard } from "../components/ui/domain-card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Avatar } from "../components/ui/avatar";

const meta: Meta = {
  title: "Сравнение/Биллинг, участники, домены",
  parameters: {
    docs: {
      description: {
        component:
          "Текущая прод-вёрстка (слева) против ДС-организма (справа) — для " +
          "биллинга, участников, интеграций и доменов. Видны расхождения " +
          "(футер-бары, цвет промо, иконка-тайл) — решаем мерджить/дорабатывать.",
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

const FEATURES = [
  "Мониторинг и метрики",
  "Веб-аналитика",
  "Команды и роли",
  "Кастомные домены",
  "Приоритетная поддержка",
  "Бета-функции",
];
const FeatureGridBefore = (
  <div className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
    {FEATURES.map((f) => (
      <div key={f} className="flex items-start gap-2 text-sm text-neutral-600">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-success-500" aria-hidden><polyline points="20 6 9 17 4 12" /></svg>
        {f}
      </div>
    ))}
  </div>
);

/* ── 1. PlanPanel ──────────────────────────────────────────────────── */
export const Plan: Story = {
  name: "Тариф",
  render: () => (
    <Compare
      before={
        <section className="max-w-lg overflow-hidden rounded-2xl border border-border bg-card">
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-semibold text-foreground">Pro</h2>
                <Badge variant="success">Активна</Badge>
              </div>
              <span className="text-sm text-neutral-500">990 ₽ / мес</span>
            </div>
            {FeatureGridBefore}
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-border bg-muted px-6 py-3">
            <Button variant="outline" size="sm">Отменить подписку</Button>
          </div>
        </section>
      }
      after={
        <PlanPanel
          className="max-w-lg"
          planName="Pro"
          price="990 ₽/мес"
          badge={<Badge variant="secondary">Текущий</Badge>}
          features={FEATURES}
          footer={<Button size="sm" variant="outline">Отменить подписку</Button>}
        />
      }
    />
  ),
};

/* ── 2. PaymentMethod ──────────────────────────────────────────────── */
const CardGlyph = (
  <span className="flex h-7 w-10 items-center justify-center rounded bg-neutral-900 text-[10px] font-semibold uppercase text-white">visa</span>
);
export const Payment: Story = {
  name: "Способ оплаты",
  render: () => (
    <Compare
      before={
        <section className="max-w-md overflow-hidden rounded-2xl border border-border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Способ оплаты</h2>
            <p className="mt-1 text-sm text-neutral-500">Оплата доменов и подписки привязанной картой</p>
            <div className="mt-4 flex items-center gap-3">
              {CardGlyph}
              <div>
                <div className="text-base font-medium text-foreground">visa •••• 4242</div>
                <div className="text-xs text-neutral-500">Сохранённая карта для оплаты подписки</div>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-border p-3">
              <Switch checked aria-label="Автопродление" className="mt-0.5" />
              <span className="text-sm">
                <span className="font-medium text-foreground">Автопродление подписки</span>
                <span className="mt-1 block text-xs text-neutral-500">Выключите, чтобы остановить автосписания, но оставить карту.</span>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end border-t border-border bg-muted px-6 py-3">
            <Button variant="outline" size="sm">Удалить карту</Button>
          </div>
        </section>
      }
      after={
        <PaymentMethodCard
          className="max-w-md"
          card={{ brand: "visa", last4: "4242" }}
          autopay
          footer={<Button size="sm" variant="outline">Отвязать карту</Button>}
        />
      }
    />
  ),
};

/* ── 3. PaymentHistory ─────────────────────────────────────────────── */
const HISTORY = [
  { label: "Подписка Pro", date: "1 июня 2026", amount: "990 ₽" },
  { label: "Подписка Pro", date: "1 мая 2026", amount: "990 ₽" },
];
export const History: Story = {
  name: "История платежей",
  render: () => (
    <Compare
      before={
        <section className="max-w-md rounded-2xl border border-border bg-card p-6">
          <div className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">История платежей</div>
          <div className="mt-4 divide-y divide-border">
            {HISTORY.map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-3 text-sm first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="truncate text-foreground">{p.label}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">{p.date}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-medium text-foreground">{p.amount}</div>
                  <div className="text-xs text-success-600">Оплачено</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      }
      after={
        <PaymentHistory
          className="max-w-md"
          items={HISTORY.map((p) => ({ ...p, status: <Badge variant="success">Оплачено</Badge> }))}
        />
      }
    />
  ),
};

/* ── 4. DiscountBanner (colour divergence) ─────────────────────────── */
export const Discount: Story = {
  name: "Промо",
  render: () => (
    <Compare
      before={
        <section className="max-w-lg rounded-2xl border-2 border-violet-300 bg-gradient-to-br from-violet-50 to-fuchsia-50/40 p-6">
          <h3 className="text-lg font-semibold text-violet-900">Бета-триал завершился — скидка 20% на Pro</h3>
          <p className="mt-1.5 text-sm text-violet-900/80">Включите Pro со скидкой 20% на первый месяц.</p>
          <p className="mt-2 text-xs text-violet-900/70">Скидка сгорает через 7 дней.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-card px-3 py-2 font-mono text-sm text-violet-900">
            <span className="text-violet-500">Промокод:</span>
            <code className="font-semibold">LAYERO20</code>
            <button className="ml-1 text-xs text-violet-600 underline-offset-2 hover:underline">скопировать</button>
          </div>
        </section>
      }
      after={
        <DiscountBanner
          className="max-w-lg"
          title="Вернитесь со скидкой 20%"
          description="Оформите подписку в течение недели и получите скидку на первый месяц."
          daysLeft={7}
          code="LAYERO20"
        />
      }
    />
  ),
};

/* ── 5. BetaProgramCard ────────────────────────────────────────────── */
export const Beta: Story = {
  name: "Бета-программа",
  render: () => (
    <Compare
      before={
        <section className="max-w-md overflow-hidden rounded-2xl border border-border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Бета-программа</h2>
            <p className="mt-1 text-sm text-neutral-500">90 дней Pro бесплатно. Взамен — короткие опросы и репорты о проблемах.</p>
          </div>
          <div className="flex items-center justify-end border-t border-border bg-muted px-6 py-3">
            <Button size="sm">Подать заявку</Button>
          </div>
        </section>
      }
      after={
        <BetaProgramCard
          className="max-w-md"
          state="apply"
          footer={<Button size="sm">Подать заявку</Button>}
        />
      }
    />
  ),
};

/* ── 6. MemberRow ──────────────────────────────────────────────────── */
export const Members: Story = {
  name: "Участники",
  render: () => (
    <Compare
      before={
        <ul className="max-w-md divide-y divide-border rounded-lg border border-border">
          {[
            { name: "mixa", handle: "@mixa", role: <Badge variant="success">owner</Badge> },
            { name: "valya@layero.ru", handle: "@valya", role: <Badge variant="secondary">editor</Badge>, rm: true },
          ].map((m) => (
            <li key={m.name} className="flex items-center gap-3 px-4 py-3">
              <Avatar name={m.name} shape="circle" className="h-8 w-8 text-[11px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-neutral-500">{m.handle}</p>
              </div>
              {m.role}
              {m.rm && <button className="h-auto p-0 text-xs text-negative-600">Удалить</button>}
            </li>
          ))}
        </ul>
      }
      after={
        <div className="max-w-md divide-y divide-border rounded-2xl border border-border bg-card px-4">
          <MemberRow name="mixa" handle="@mixa" role={<Badge variant="secondary">Владелец</Badge>} />
          <MemberRow
            name="valya@layero.ru"
            handle="@valya"
            role={<Badge variant="secondary">Админ</Badge>}
            action={<Button variant="ghost" size="sm" className="text-neutral-500">Удалить</Button>}
          />
        </div>
      }
    />
  ),
};

/* ── 7. IntegrationCard (structure divergence) ─────────────────────── */
const ChartIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
);
export const Integration: Story = {
  name: "Интеграция",
  render: () => (
    <Compare
      before={
        <div className="max-w-xl rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tightish">Яндекс.Метрика</h2>
                <Badge variant="success">подключено</Badge>
              </div>
              <p className="mt-1 text-sm text-neutral-500">Визиты, источники трафика и устройства — прямо в панели Layero.</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border px-3 py-2 text-sm text-neutral-600">Счётчик 98765432 · ветка production</div>
        </div>
      }
      after={
        <IntegrationCard
          className="max-w-xl"
          icon={ChartIcon}
          title="Яндекс Метрика"
          description="Трафик, источники и популярные страницы прямо в дашборде."
          connected
          footer={<Button size="sm" variant="outline">Открыть в Метрике</Button>}
        >
          <div className="rounded-lg border border-border px-3 py-2 text-sm text-neutral-600">Счётчик 98765432 · ветка production</div>
        </IntegrationCard>
      }
    />
  ),
};

/* ── 8. DomainCard ─────────────────────────────────────────────────── */
export const Domain: Story = {
  name: "Домен",
  render: () => (
    <Compare
      before={
        <article className="max-w-xl overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between gap-3 p-4">
            <span className="truncate font-mono text-sm font-medium text-foreground">app.example.com</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
              Активен
            </span>
          </div>
        </article>
      }
      after={
        <DomainCard
          className="max-w-xl"
          domain="app.example.com"
          stage="live"
          footer={<Button size="sm" variant="ghost" className="text-neutral-500">Удалить</Button>}
        />
      }
    />
  ),
};
