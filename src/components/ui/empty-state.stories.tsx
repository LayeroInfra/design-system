import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "./button";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: { title: "Пусто" },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

const Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const WithIcon: Story = {
  render: () => (
    <div className="max-w-lg">
      <EmptyState
        icon={<Icon />}
        title="GitHub ещё не подключён"
        description="Подключите аккаунт, чтобы импортировать репозиторий и включить автодеплой."
        action={<Button>Подключить GitHub</Button>}
      />
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="max-w-lg">
      <EmptyState dashed title="Пока нет проектов" description="Создайте первый проект, чтобы начать." action={<Button size="sm">Новый проект</Button>} />
    </div>
  ),
};
