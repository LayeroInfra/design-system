import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./pagination";

const meta = { title: "Components/Pagination", component: Pagination, tags: ["autodocs"], args: { page: 2, pageCount: 6, onPageChange: () => {} } } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(2);
      return <Pagination page={page} pageCount={6} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};
