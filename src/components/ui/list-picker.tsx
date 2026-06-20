import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

/** Search-enabled list shell shared by the project/team pickers and switchers:
 *  a search field above a bordered list of selectable rows, with an optional
 *  pinned footer (e.g. «Создать проект»). Positioning/chrome (page vs dropdown)
 *  stays with the consumer — this owns only the search + list content. */
export interface ListPickerProps {
  query: string;
  onQueryChange: (value: string) => void;
  searchPlaceholder?: string;
  autoFocus?: boolean;
  /** Pinned at the bottom of the list (e.g. a «create» action). */
  footer?: React.ReactNode;
  className?: string;
  /** <ListPickerItem> rows, or a loading/empty <li>. */
  children: React.ReactNode;
}

export function ListPicker({
  query,
  onQueryChange,
  searchPlaceholder = "Поиск…",
  autoFocus,
  footer,
  className,
  children,
}: ListPickerProps) {
  return (
    <div className={className}>
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={searchPlaceholder}
        autoFocus={autoFocus}
      />
      <ul className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {children}
        {footer ? <li>{footer}</li> : null}
      </ul>
    </div>
  );
}

/** A selectable row inside <ListPicker>. */
export interface ListPickerItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function ListPickerItem({
  active,
  className,
  children,
  ...props
}: ListPickerItemProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-neutral-100",
          active && "bg-neutral-100",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

/** Centered empty/loading state row for use inside <ListPicker>. */
export function ListPickerEmpty({ children }: { children: React.ReactNode }) {
  return (
    <li className="px-4 py-8 text-center text-sm text-neutral-500">{children}</li>
  );
}
