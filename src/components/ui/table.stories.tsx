import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "./table";
import { Switch } from "./switch";
import { Tag } from "./tag";

const meta = {
  title: "Organisms/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Таблица данных: серая шапка, подсветка строки под курсором, горизонтальная",
          "прокрутка внутри собственной обёртки.",
          "",
          "**Когда таблица, а когда список.** Таблица нужна, когда у записи три и больше",
          "полей, которые сравнивают между строками (тип, размер, дата). Если полей два —",
          "название и значение — берите `Cell`: строки списка читаются быстрее и не требуют",
          "заголовков колонок.",
          "",
          "### Два вида",
          "",
          "- **Карточный** (по умолчанию) — рамка, скругление, белый фон. Для таблицы внутри",
          "  страницы, рядом с другими блоками.",
          "- **`flush` + `inset`** — таблица и есть страница: без рамки, с боковыми полями,",
          "  строками-полосами и зазором между ними. Для рабочих поверхностей во весь экран",
          "  (обозреватель данных).",
          "",
          "### Правила",
          "",
          "1. **Шапка — всегда серая**, `11px`, uppercase. Белая шапка сливается со строками.",
          "2. **В `inset` у шапки нет линий** сверху и снизу: строки отделены зазором `2px`,",
          "   и линия торчала бы из-под скруглённой подсветки.",
          "3. **Высота строки — от 32px**, ровно как у пункта навигации: рядом стоящие список",
          "   и таблица должны читаться одним ритмом.",
          "4. **Ховер — на строке**, не на ячейке. Закреплённая колонка наследует фон",
          "   (`bg-inherit`), иначе при прокрутке она остаётся белой заплаткой.",
          "5. **Липкая шапка** — `<TableHead className=\"sticky top-0 z-10\">`. В `inset`",
          "   липкость уже висит на ячейках: у `border-separate` браузеры игнорируют",
          "   `sticky` на самом `thead`.",
          "6. **Действия — в закреплённой колонке** (`sticky`): широкая таблица иначе",
          "   уводит их за край, и до кнопки надо доскроллить.",
          "",
          "### Ограничения",
          "",
          "- Не кладите в ячейку интерактив без `stopPropagation`, если строка кликабельна.",
          "- Не отключайте горизонтальную прокрутку обёртки: широкая таблица не должна",
          "  растягивать макет страницы.",
          "- Не задавайте фон на `<table>` — он задаётся на строке, иначе ломается",
          "  закреплённая колонка.",
          "- Больше одной закреплённой колонки не поддерживается.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const COLUMNS = [
  { name: "id", type: "bigint", required: true, def: "nextval(…)", key: "PK" },
  { name: "user_id", type: "uuid", required: true, def: "—", key: "FK" },
  { name: "total_kopecks", type: "integer", required: true, def: "0", key: "" },
  { name: "created_at", type: "timestamptz", required: true, def: "now()", key: "" },
];

export const Playground: Story = {
  name: "Карточная",
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableTh>Колонка</TableTh>
          <TableTh>Тип</TableTh>
          <TableTh>Обязательна</TableTh>
          <TableTh>По умолчанию</TableTh>
          <TableTh>Ключ</TableTh>
        </TableRow>
      </TableHead>
      <TableBody>
        {COLUMNS.map((c) => (
          <TableRow key={c.name}>
            <TableTd className="font-mono text-xs">{c.name}</TableTd>
            <TableTd className="font-mono text-xs text-neutral-500">{c.type}</TableTd>
            <TableTd className="text-xs text-neutral-500">{c.required ? "да" : "—"}</TableTd>
            <TableTd className="font-mono text-xs text-neutral-500">{c.def}</TableTd>
            <TableTd>{c.key ? <Tag>{c.key}</Tag> : null}</TableTd>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Inset: Story = {
  name: "Во всю страницу (flush + inset)",
  parameters: {
    docs: {
      description: {
        story:
          "Рабочая поверхность: без рамки, с боковыми полями, строки — полосы с зазором. " +
          "Шапка липкая, поэтому список можно листать не теряя названий колонок.",
      },
    },
  },
  render: () => (
    <div className="h-64 overflow-auto bg-card">
      <Table flush inset>
        <TableHead className="sticky top-0 z-10">
          <TableRow className="hover:bg-muted">
            <TableTh>Колонка</TableTh>
            <TableTh>Тип</TableTh>
            <TableTh>Обязательна</TableTh>
            <TableTh>По умолчанию</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...COLUMNS, ...COLUMNS, ...COLUMNS].map((c, i) => (
            <TableRow key={i}>
              <TableTd className="font-mono text-xs">{c.name}</TableTd>
              <TableTd className="font-mono text-xs text-neutral-500">{c.type}</TableTd>
              <TableTd className="text-xs text-neutral-500">{c.required ? "да" : "—"}</TableTd>
              <TableTd className="font-mono text-xs text-neutral-500">{c.def}</TableTd>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const StickyColumn: Story = {
  name: "Закреплённая колонка действий",
  parameters: {
    docs: {
      description: {
        story:
          "Колонка с действием остаётся на месте при горизонтальной прокрутке — " +
          "разделительная линия появляется её псевдоэлементом, а фон наследуется от строки.",
      },
    },
  },
  render: () => (
    <div className="max-w-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableTh className="whitespace-nowrap">Расширение</TableTh>
            <TableTh className="whitespace-nowrap">Версия</TableTh>
            <TableTh className="whitespace-nowrap">Что даёт</TableTh>
            <TableTh sticky className="w-[68px] text-center">
              Вкл
            </TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            ["pgcrypto", "1.3", "Шифрование и хеши прямо в базе", true],
            ["uuid-ossp", "1.1", "Генерация UUID", false],
            ["pg_trgm", "1.6", "Нечёткий поиск по тексту", false],
          ].map(([name, version, what, on]) => (
            <TableRow key={name as string}>
              <TableTd className="font-mono text-xs">{name}</TableTd>
              <TableTd className="text-xs text-neutral-500">{version}</TableTd>
              <TableTd className="text-xs text-neutral-500">{what}</TableTd>
              <TableTd sticky className="text-center">
                <Switch checked={on as boolean} />
              </TableTd>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
