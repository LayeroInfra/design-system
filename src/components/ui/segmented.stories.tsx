import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Segmented, SegmentedItem } from "./segmented";

const meta = {
  title: "Components/Segmented",
  component: Segmented,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Сегментированный переключатель: группа, где активен один пункт. " +
          "Compose с <SegmentedItem> (опц. иконка). Пример — выбор IDE/типа.",
      },
    },
  },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [v, setV] = useState("static");
      return (
        <Segmented className="text-xs">
          <SegmentedItem active={v === "static"} onClick={() => setV("static")}>
            Статика
          </SegmentedItem>
          <SegmentedItem active={v === "server"} onClick={() => setV("server")}>
            Сервер
          </SegmentedItem>
        </Segmented>
      );
    };
    return <Demo />;
  },
};

export const WithIcons: Story = {
  name: "С иконками",
  render: () => {
    const Demo = () => {
      const [v, setV] = useState("cursor");
      const dot = (
        <span className="h-2 w-2 rounded-full bg-current opacity-70" aria-hidden />
      );
      return (
        <Segmented className="text-xs">
          {["cursor", "claude-code", "codex"].map((id) => (
            <SegmentedItem key={id} active={v === id} onClick={() => setV(id)} icon={dot}>
              {id}
            </SegmentedItem>
          ))}
        </Segmented>
      );
    };
    return <Demo />;
  },
};
