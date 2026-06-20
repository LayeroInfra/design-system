import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Migration/Badges",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "«До → после» для бейджей. Слева — legacy (CSS .pill* и инлайновые " +
          "rounded-full статус-спаны из control-plane), справа — канонический " +
          "<Badge variant>.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Row({
  label,
  legacy,
  legacyCode,
  canon,
  canonCode,
}: {
  label: string;
  legacy: React.ReactNode;
  legacyCode: string;
  canon: React.ReactNode;
  canonCode: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px 1fr 1fr",
        gap: 16,
        alignItems: "center",
        padding: "14px 0",
        borderTop: "1px solid var(--border, #e5e5e5)",
      }}
    >
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="space-y-2">
        <div>{legacy}</div>
        <code className="block text-[11px] text-red-600 dark:text-red-400">{legacyCode}</code>
      </div>
      <div className="space-y-2">
        <div>{canon}</div>
        <code className="block text-[11px] text-green-700 dark:text-green-400">{canonCode}</code>
      </div>
    </div>
  );
}

export const BadgesBeforeAfter: Story = {
  name: "Все варианты (до → после)",
  render: () => (
    <div className="max-w-3xl">
      <Row
        label="success (.pill-leaf)"
        legacy={<span className="pill-leaf">подключено</span>}
        legacyCode=".pill-leaf"
        canon={<Badge variant="success">подключено</Badge>}
        canonCode='<Badge variant="success">'
      />
      <Row
        label="warning (.pill-amber)"
        legacy={<span className="pill-amber">осторожно</span>}
        legacyCode=".pill-amber"
        canon={<Badge variant="warning">осторожно</Badge>}
        canonCode='<Badge variant="warning">'
      />
      <Row
        label="neutral (.pill)"
        legacy={<span className="pill">slug</span>}
        legacyCode=".pill"
        canon={<Badge variant="secondary">slug</Badge>}
        canonCode='<Badge variant="secondary">'
      />
      <Row
        label="инлайн success"
        legacy={
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
            Активна
          </span>
        }
        legacyCode='rounded-full bg-green-50 text-green-700 …'
        canon={<Badge variant="success">Активна</Badge>}
        canonCode='<Badge variant="success">'
      />
      <Row
        label="инлайн «основной»"
        legacy={
          <span className="inline-flex h-4 items-center rounded bg-green-100 px-1.5 text-[10px] font-semibold uppercase tracking-wide text-green-800 dark:bg-green-950/40 dark:text-green-300">
            основной
          </span>
        }
        legacyCode='rounded bg-green-100 text-green-800 …'
        canon={<Badge variant="success">основной</Badge>}
        canonCode='<Badge variant="success">'
      />
    </div>
  ),
};
