import type { Meta, StoryObj } from "@storybook/react";
import { MemberRow } from "../../components/ui/member-row";
import { IntegrationCard } from "../../components/ui/integration-card";
import { DomainCard } from "../../components/ui/domain-card";
import { AddDomainCard } from "../../components/ui/add-domain";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const meta: Meta = {
  title: "Organisms/Members, Integrations, Domains",
  parameters: {
    docs: {
      description: {
        component:
          "Участники (`MemberRow`), интеграции (`IntegrationCard`), домены " +
          "(`AddDomainCard` + `DomainCard`).",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Members: Story = {
  name: "Участники",
  render: () => (
    <div className="max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card px-5">
      <MemberRow
        name="mixa"
        handle="@mixa"
        role={<Badge variant="secondary">Владелец</Badge>}
      />
      <MemberRow
        name="valya"
        handle="valya@layero.ru"
        role={<Badge variant="secondary">Админ</Badge>}
        action={
          <Button variant="ghost" size="sm" className="text-neutral-500">
            Удалить
          </Button>
        }
      />
      <MemberRow
        name="guest"
        handle="@guest"
        role={<Badge variant="outline">Участник</Badge>}
        action={
          <Button variant="ghost" size="sm" className="text-neutral-500">
            Удалить
          </Button>
        }
      />
    </div>
  ),
};

const ChartIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

export const Integration: Story = {
  name: "Интеграция",
  render: () => (
    <IntegrationCard
      className="max-w-2xl"
      icon={ChartIcon}
      title="Яндекс Метрика"
      description="Трафик, источники и популярные страницы прямо в дашборде."
      connected
      footer={
        <>
          <Button size="sm" variant="outline">
            Открыть в Метрике
          </Button>
          <Button size="sm" variant="ghost" className="text-neutral-500">
            Отключить
          </Button>
        </>
      }
    >
      <div className="rounded-lg border border-border px-3 py-2 text-sm text-neutral-600">
        Счётчик 98765432 · ветка production
      </div>
    </IntegrationCard>
  ),
};

export const Domains: Story = {
  name: "Домены",
  render: () => (
    <div className="max-w-2xl space-y-4">
      <AddDomainCard
        action={<Button size="sm">Добавить</Button>}
        hint="Например, app.example.com — после добавления покажем DNS-записи."
      />
      <DomainCard
        domain="app.example.com"
        stage="live"
        footer={
          <Button size="sm" variant="ghost" className="text-neutral-500">
            Удалить
          </Button>
        }
      />
      <DomainCard
        domain="shop.example.com"
        stage="needs-dns"
        records={[
          { type: "CNAME", name: "shop", value: "cname.layero.ru" },
          { type: "TXT", name: "_layero", value: "verify=ab12cd34" },
        ]}
        footer={
          <>
            <Button size="sm" variant="outline">
              Проверить
            </Button>
            <Button size="sm" variant="ghost" className="text-neutral-500">
              Удалить
            </Button>
          </>
        }
      />
    </div>
  ),
};
