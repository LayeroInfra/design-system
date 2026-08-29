import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { fieldTriggerClass } from "./select";

/**
 * Выбор даты — свой, а не браузерный.
 *
 * 🚨 ПОЧЕМУ НЕ `input[type=date]`. Он выглядит по-разному в каждом браузере и
 * ни в одном — как остальная панель: своя иконка, свой шрифт, своё всплывающее
 * окно, в Safari вообще нет календаря. Поле, которое стоит рядом с нашими
 * полями и ведёт себя иначе, читается как чужое.
 *
 * Без внешних зависимостей: календарь на месяц — это сетка 7×6 и арифметика по
 * дням, ради которой не стоит тянуть библиотеку с локалями.
 *
 * Значение — строка `ГГГГ-ММ-ДД`, как у нативного поля: так его принимают наши
 * ручки, и подменить компонент можно, не трогая формы.
 */
const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const MONTHS = [
  "январь", "февраль", "март", "апрель", "май", "июнь",
  "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",
];

/** `ГГГГ-ММ-ДД` без часовых поясов: `toISOString()` сдвигает дату на день. */
function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function parse(value?: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Дни месяца сеткой, начиная с понедельника: шесть строк всегда, иначе
 *  календарь прыгает по высоте от месяца к месяцу. */
function gridOf(view: Date): Date[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const shift = (first.getDay() + 6) % 7; // воскресенье — последний день недели
  const start = new Date(first);
  start.setDate(first.getDate() - shift);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export interface DatePickerProps {
  /** `ГГГГ-ММ-ДД` или пустая строка. */
  value: string;
  onChange: (next: string) => void;
  /** Что написано, пока дата не выбрана. */
  placeholder?: string;
  /** Самая ранняя доступная дата, `ГГГГ-ММ-ДД`. */
  min?: string;
  /** Подпись кнопки, снимающей дату. Без неё сбросить нельзя. */
  clearLabel?: string;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Выберите дату",
  min,
  clearLabel = "Без даты",
  className,
  id,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const selected = parse(value);
  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<Date>(
    () => selected ?? new Date(today.getFullYear(), today.getMonth(), 1),
  );

  React.useEffect(() => {
    if (open && selected) setView(new Date(selected.getFullYear(), selected.getMonth(), 1));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const minDate = parse(min);
  const days = gridOf(view);
  const shift = (delta: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          aria-label={ariaLabel}
          className={cn(fieldTriggerClass, "justify-start gap-2 font-normal", className)}
        >
          <CalendarDays className="h-4 w-4 shrink-0 text-neutral-400" />
          <span className={cn("truncate", !selected && "text-neutral-400")}>
            {selected
              ? selected.toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Предыдущий месяц"
            onClick={() => shift(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {MONTHS[view.getMonth()]} {view.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Следующий месяц"
            onClick={() => shift(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="pb-1 text-[11px] text-neutral-400">
              {w}
            </span>
          ))}
          {days.map((d) => {
            const outside = d.getMonth() !== view.getMonth();
            const disabled = minDate ? d < minDate : false;
            const isToday = toKey(d) === toKey(today);
            const isSelected = selected ? toKey(d) === toKey(selected) : false;
            return (
              <button
                key={toKey(d)}
                type="button"
                disabled={disabled}
                onClick={() => {
                  onChange(toKey(d));
                  setOpen(false);
                }}
                className={cn(
                  "h-8 w-8 rounded-md text-sm tabular-nums transition",
                  outside ? "text-neutral-300" : "text-foreground",
                  !isSelected && !disabled && "hover:bg-neutral-100",
                  isToday && !isSelected && "ring-1 ring-border",
                  isSelected && "bg-primary text-primary-foreground",
                  disabled && "cursor-not-allowed text-neutral-300",
                )}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        {clearLabel && (
          <div className="mt-2 border-t border-border pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              {clearLabel}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
