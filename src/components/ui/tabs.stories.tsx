import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = { title: "Components/Tabs", component: Tabs, tags: ["autodocs"] } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[420px]">
      <TabsList>
        <TabsTrigger value="overview">Обзор</TabsTrigger>
        <TabsTrigger value="deploys">Деплои</TabsTrigger>
        <TabsTrigger value="settings">Настройки</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">Обзор проекта.</TabsContent>
      <TabsContent value="deploys" className="text-sm text-muted-foreground">Список деплоев.</TabsContent>
      <TabsContent value="settings" className="text-sm text-muted-foreground">Настройки проекта.</TabsContent>
    </Tabs>
  ),
};
