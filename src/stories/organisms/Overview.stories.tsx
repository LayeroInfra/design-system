import type { Meta, StoryObj } from "@storybook/react";
import { ProductionCard, ProductionField } from "../../components/ui/production-card";
import { WarmupPanel } from "../../components/ui/warmup-panel";
import { BranchesPopover } from "../../components/ui/branches-popover";
import { StatusDot } from "../../components/ui/status-dot";
import { Button } from "../../components/ui/button";
import { avatarGradient } from "../../components/ui/avatar";

const meta: Meta = {
  title: "Organisms/Overview",
  parameters: {
    docs: {
      description: {
        component:
          "Hero-карточка проекта (`ProductionCard`) и попап веток " +
          "(`BranchesPopover`) — собраны из атомов/молекул ДС: WarmupPanel, " +
          "StatusDot, ProductionField, BranchRow, CopyButton, Button.",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const Actions = (
  <>
    <Button variant="outline" size="sm">
      GitHub
    </Button>
    <Button size="sm">Открыть ↗</Button>
  </>
);

const Info = (
  <>
    <ProductionField label="Адрес">
      <a className="break-all font-mono text-sm text-foreground hover:underline" href="#">
        paper-test.layero.ru
      </a>
    </ProductionField>
    <ProductionField label="Статус">
      <StatusDot tone="success" className="text-sm text-foreground">
        Опубликован · 5 дн назад
      </StatusDot>
    </ProductionField>
    <ProductionField label="Источник">
      <span className="font-mono text-sm text-neutral-600">main · 4139037</span>
    </ProductionField>
  </>
);

export const Production: Story = {
  name: "Production-карточка",
  render: () => (
    <ProductionCard
      className="max-w-3xl"
      name="paper-test"
      actions={Actions}
      preview={
        <div
          className="h-full w-full"
          style={{ background: avatarGradient("paper-test") }}
        />
      }
    >
      {Info}
    </ProductionCard>
  ),
};

export const Warming: Story = {
  name: "Production — прогрев CDN",
  render: () => (
    <ProductionCard
      className="max-w-3xl"
      name="paper-test"
      actions={Actions}
      preview={
        <WarmupPanel
          stage="PUBLISHING"
          pipeline="Публикуем на CDN"
          percent={62}
          eta="ETA ~30с · elapsed 18с · ≈12с осталось"
          hint="Первый деплой регистрирует hostname на edge-узлах."
        />
      }
    >
      {Info}
    </ProductionCard>
  ),
};

export const Branches: Story = {
  name: "Попап веток",
  render: () => (
    <div className="flex min-h-[24rem] items-start justify-center pt-4">
      <BranchesPopover
        defaultOpen
        branches={[
          { name: "main", host: "paper-test.layero.ru", production: true },
          { name: "feature/new-checkout", host: "paper-test-feature-new-checkout.preview.layero.ru" },
          { name: "fix/build", host: "paper-test-fix-build.preview.layero.ru" },
        ]}
      />
    </div>
  ),
};
