import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta = { title: "Molecules/Accordion", component: Accordion, tags: ["autodocs"], args: { type: "single" } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[460px]">
      <AccordionItem value="a">
        <AccordionTrigger>Как подключить домен?</AccordionTrigger>
        <AccordionContent>Добавьте домен в разделе «Домены» и пропишите CNAME.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Что такое preview-деплой?</AccordionTrigger>
        <AccordionContent>Каждый push создаёт отдельный preview-адрес.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Как откатить деплой?</AccordionTrigger>
        <AccordionContent>Откройте деплой и нажмите «Сделать production».</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
