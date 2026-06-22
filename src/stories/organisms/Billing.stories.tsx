import type { Meta, StoryObj } from "@storybook/react";
import { PlanPanel } from "../../components/ui/plan-panel";
import { PaymentMethodCard } from "../../components/ui/payment-method";
import { PaymentHistory } from "../../components/ui/payment-history";
import { DiscountBanner } from "../../components/ui/discount-banner";
import { BetaProgramCard } from "../../components/ui/beta-card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const meta: Meta = {
  title: "Organisms/Billing",
  parameters: {
    docs: {
      description: {
        component:
          "Биллинг: тариф (`PlanPanel`), способ оплаты (`PaymentMethodCard`), " +
          "история (`PaymentHistory`), промо (`DiscountBanner`) и бета (`BetaProgramCard`).",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Plan: Story = {
  name: "Тариф",
  render: () => (
    <PlanPanel
      className="max-w-lg"
      planName="Pro"
      price="990 ₽/мес"
      badge={<Badge variant="secondary">Текущий</Badge>}
      features={[
        "Мониторинг и метрики",
        "Веб-аналитика",
        "Команды и роли",
        "Кастомные домены",
        "Приоритетная поддержка",
        "Бета-функции",
      ]}
      footer={
        <>
          <Button size="sm" variant="outline">
            Сменить тариф
          </Button>
          <Button size="sm" variant="ghost">
            Отменить подписку
          </Button>
        </>
      }
    />
  ),
};

export const PaymentMethod: Story = {
  name: "Способ оплаты",
  render: () => (
    <PaymentMethodCard
      className="max-w-md"
      card={{ brand: "visa", last4: "4242" }}
      autopay
      footer={
        <Button size="sm" variant="outline">
          Отвязать карту
        </Button>
      }
    />
  ),
};

export const History: Story = {
  name: "История платежей",
  render: () => (
    <PaymentHistory
      className="max-w-md"
      items={[
        { label: "Подписка Pro", date: "1 июня 2026", amount: "990 ₽", status: <Badge variant="success">Оплачено</Badge> },
        { label: "Подписка Pro", date: "1 мая 2026", amount: "990 ₽", status: <Badge variant="success">Оплачено</Badge> },
        { label: "Подписка Pro", date: "1 апреля 2026", amount: "990 ₽", status: <Badge variant="success">Оплачено</Badge> },
      ]}
    />
  ),
};

export const Discount: Story = {
  name: "Промо",
  render: () => (
    <DiscountBanner
      className="max-w-lg"
      title="Вернитесь со скидкой 20%"
      description="Оформите подписку в течение недели и получите скидку на первый месяц."
      daysLeft={7}
      code="LAYERO20"
    />
  ),
};

export const Beta: Story = {
  name: "Бета (состояния)",
  render: () => (
    <div className="max-w-md space-y-4">
      <BetaProgramCard state="apply" footer={<Button size="sm">Подать заявку</Button>} />
      <BetaProgramCard state="pending" />
      <BetaProgramCard state="joined" footer={<Button size="sm" variant="outline">Выйти из беты</Button>} />
      <BetaProgramCard state="rejected" />
    </div>
  ),
};
