import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Lucide from "lucide-react";

const meta = {
  title: "Foundations/Iconography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Иконочный набор Layero — на базе lucide-react (~1000 иконок, единый " +
          "stroke-стиль). Ниже — частоупотребимый набор с поиском; полная " +
          "библиотека доступна импортом из `lucide-react`. Размер/цвет — через " +
          "props (size, className, currentColor).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Curated common set used across product UIs.
const NAMES = [
  "Home","Search","Settings","User","Users","Plus","Minus","X","Check","CheckCircle",
  "ChevronDown","ChevronUp","ChevronLeft","ChevronRight","ArrowRight","ArrowLeft","ArrowUp","ArrowDown",
  "Trash2","Pencil","Copy","Download","Upload","File","Folder","FolderOpen","Image","Calendar","Clock",
  "Bell","Mail","Lock","Unlock","Eye","EyeOff","Star","Heart","Bookmark","Tag","Filter",
  "RefreshCw","RotateCw","ExternalLink","Link","Share2","MoreHorizontal","MoreVertical","Menu","LayoutGrid","List",
  "Play","Pause","Square","Circle","AlertTriangle","AlertCircle","Info","XCircle","HelpCircle","LoaderCircle",
  "Zap","Globe","Server","Database","Cloud","Cpu","Terminal","Code","GitBranch","GitPullRequest","Github",
  "Package","Box","Layers","Activity","ChartBar","ChartLine","ChartPie","TrendingUp","TrendingDown",
  "CreditCard","DollarSign","Send","MessageSquare","Phone","MapPin","Building2","Briefcase","Key","Shield","ShieldCheck",
  "Sun","Moon","Monitor","Smartphone","Save","Camera","Rocket","Sparkles","ThumbsUp","Smile","LogOut","Settings2",
];

export const IconsOverview: Story = {
  name: "Обзор иконок",
  render: () => {
    const Grid = () => {
      const [q, setQ] = useState("");
      const items = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return NAMES.filter((n) => !needle || n.toLowerCase().includes(needle))
          .map((n) => [n, (Lucide as Record<string, unknown>)[n]] as const)
          .filter(([, C]) => typeof C === "function");
      }, [q]);
      return (
        <div className="max-w-4xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск иконки…"
            className="mb-4 w-72 rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-ring focus:outline-none"
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
            {items.map(([name, C]) => {
              const Icon = C as React.ComponentType<{ size?: number }>;
              return (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center"
                  title={name}
                >
                  <Icon size={22} />
                  <span className="w-full truncate text-[10px] text-muted-foreground">{name}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Показано {items.length} из набора. Полная библиотека — `import {"{ Name }"} from "lucide-react"`.
          </p>
        </div>
      );
    };
    return <Grid />;
  },
};

export const Sizes: Story = {
  name: "Размеры",
  render: () => (
    <div className="flex items-end gap-6 text-foreground">
      {[16, 20, 24, 32].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Lucide.Rocket size={s} />
          <span className="text-[10px] text-muted-foreground">{s}px</span>
        </div>
      ))}
    </div>
  ),
};
