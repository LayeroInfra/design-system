import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Separator } from "./separator";
import { Text } from "./text";

export interface SelectionBarProps {
  count: number;
  total: number;
  onSelectAll: () => void;
  onClear: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Compact bulk actions using the platform's inverse-theme tokens. */
export function SelectionBar({ count, total, onSelectAll, onClear, disabled, children, className }: SelectionBarProps) {
  if (count === 0) return null;
  const allSelected = count === total;
  return (
    <div role="region" aria-label="Массовые действия" className={cn("selection-bar inline-flex w-max max-w-full flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-foreground shadow-xl", className)}>
      <Text as="span" variant="muted" className="whitespace-nowrap text-muted-foreground">Выбрано: <Text as="span" className="font-semibold">{count} из {total}</Text></Text>
      <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground hover:no-underline" onClick={allSelected ? onClear : onSelectAll} disabled={disabled}>
        {allSelected ? "Сбросить всё" : "Выбрать всё"}
      </Button>
      <div className="flex items-center gap-2">{children}</div>
      <Separator orientation="vertical" className="h-5" />
      <Button variant="ghost" size="icon-sm" aria-label="Снять выделение" onClick={onClear} disabled={disabled}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
