import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Вариант «с полями»: строки — отдельные скруглённые полосы с зазором между
 * ними, как пункты меню, а не клетки сетки.
 *
 * 🚨 РАЗДЕЛИТЕЛЬНЫХ ЛИНИЙ ЗДЕСЬ НЕТ НАРОЧНО. Линия шла по всей ширине строки,
 * а подсветка под курсором — со скруглёнными краями: под курсором линия
 * торчала из подсветки с обеих сторон. Зазор между строками отделяет их не
 * хуже линии и не спорит со скруглением.
 *
 * Высота строки — в размер пункта навигации: список таблиц слева и строки
 * справа читаются как один список, а не как два разных.
 */
const INSET = [
  "px-3",
  "[&_table]:border-separate [&_table]:border-spacing-y-0.5",
  // Шапка: скруглённая полоса без линий сверху и снизу. Липкость — на
  // ячейках: у `border-separate` sticky на самом thead браузеры игнорируют.
  "[&_thead]:border-0 [&_thead_tr]:border-0 [&_thead_tr]:bg-transparent",
  "[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10 [&_thead_th]:bg-muted",
  "[&_thead_th]:whitespace-nowrap [&_thead_th]:py-2",
  "[&_thead_th:first-child]:rounded-l-lg [&_thead_th:last-child]:rounded-r-lg",
  "[&_tbody_tr]:border-0",
  "[&_tbody_tr>*]:h-8",
  "[&_tbody_tr>*:first-child]:rounded-l-lg [&_tbody_tr>*:last-child]:rounded-r-lg",
].join(" ");

/**
 * Таблица: серая шапка, подсветка строки под курсором, тонкие разделители.
 *
 * Заведена компонентом, потому что таблиц в панели уже несколько — расширения,
 * роли, функции, файлы, обозреватель данных, — и каждая складывалась заново:
 * где-то шапка белая, где-то серая, ховера нет нигде. Пока правила живут в
 * разметке страницы, они расходятся при первой же правке.
 *
 * Горизонтальная прокрутка — на обёртке, а не на странице: широкая таблица не
 * должна тащить за собой весь макет.
 */
export function Table({
  className,
  wrapperClassName,
  flush,
  inset,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & {
  /** Классы внешней обёртки — например, высота на всю область. */
  wrapperClassName?: string;
  /** Без рамки и скруглений: таблица лежит прямо на странице, а не в карточке
   *  (обозреватель данных, где таблица и есть страница). */
  flush?: boolean;
  /** Поля по бокам, скруглённые шапка и ховер — см. {@link INSET}. */
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        flush ? "bg-card" : "overflow-hidden rounded-lg border border-border bg-card",
        wrapperClassName,
      )}
    >
      <div className={cn("overflow-x-auto", inset && INSET)}>
        <table className={cn("w-full text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "border-b border-border bg-muted text-[11px] uppercase tracking-wider text-neutral-500 [&_tr]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    // Фон задан на СТРОКЕ, а не на таблице: закреплённая колонка наследует его
    // (`bg-inherit`) и под курсором подсвечивается вместе со строкой. Иначе
    // при горизонтальной прокрутке она оставалась белой заплаткой поверх
    // подсвеченной строки.
    <tr
      className={cn(
        "border-b border-border/60 bg-card transition-colors last:border-0 hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Закреплённая справа колонка: остаётся на месте при горизонтальной
 *  прокрутке. Для действий — переключателя, кнопки — иначе широкая таблица
 *  уводит их за край, и до них надо доскроллить. */
const STICKY =
  "sticky right-0 z-10 bg-inherit before:absolute before:inset-y-0 before:left-0 " +
  "before:w-px before:bg-border before:content-['']";

export function TableTh({
  className,
  sticky,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { sticky?: boolean }) {
  return (
    <th
      className={cn(
        "px-4 py-2.5 text-left font-medium",
        sticky && `${STICKY} bg-muted`,
        className,
      )}
      {...props}
    />
  );
}

export function TableTd({
  className,
  sticky,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { sticky?: boolean }) {
  return (
    <td
      className={cn("px-4 py-2.5 align-middle", sticky && STICKY, className)}
      {...props}
    />
  );
}
