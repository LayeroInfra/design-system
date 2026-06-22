import type { Meta, StoryObj } from "@storybook/react";
import { DeployRow } from "../../components/ui/deploy-row";
import { FormCard } from "../../components/ui/form-card";
import { Button } from "../../components/ui/button";

const meta: Meta = {
  title: "Organisms/Deploys & Settings",
  parameters: {
    docs: {
      description: {
        component:
          "Строки деплоев (`DeployRow`) и карточка-форма настроек (`FormCard`) — " +
          "паттерн «заголовок + тело + действия».",
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const Kebab = (
  <Button variant="ghost" size="icon-sm" aria-label="Меню">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  </Button>
);

export const Deploys: Story = {
  name: "Деплои",
  render: () => (
    <ul className="max-w-3xl space-y-3">
      <li>
        <DeployRow
          status={{ dot: "bg-success-500", label: "Готов" }}
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
      </li>
      <li>
        <DeployRow
          status={{ dot: "bg-success-500", label: "Готов" }}
          duration="48s"
          branch="feature/new-checkout"
          env="Preview"
          commitSha="a1b2c3d"
          commitMessage="Add checkout flow"
          timeAgo="2 ч назад"
          source="git push"
          action={Kebab}
        />
      </li>
      <li>
        <DeployRow
          status={{ dot: "bg-negative-500", label: "Ошибка" }}
          branch="fix/build"
          env="Preview"
          commitSha="9f8e7d6"
          commitMessage="Tweak build command"
          timeAgo="вчера"
          source="CLI"
          action={Kebab}
        />
      </li>
    </ul>
  ),
};

export const Settings: Story = {
  name: "Настройки",
  render: () => (
    <div className="max-w-xl space-y-5">
      <FormCard
        title="Команда сборки"
        description="Запускается при каждом деплое из репозитория."
        footer={<Button size="sm">Сохранить</Button>}
      >
        <div className="rounded-lg border border-border px-3 py-2 font-mono text-sm">
          npm run build
        </div>
      </FormCard>
      <FormCard
        title="Удалить проект"
        description="Проект и его домен будут удалены безвозвратно."
        footer={
          <Button size="sm" variant="destructive">
            Удалить проект
          </Button>
        }
      >
        <p className="text-sm text-neutral-500">
          Это действие необратимо. Все деплои и настройки будут потеряны.
        </p>
      </FormCard>
    </div>
  ),
};
