import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

interface ReadonlyFieldBase
  extends Omit<React.ComponentProps<"div">, "value" | "children"> {
  /** Подпись, когда значения нет. Печатается приглушённым цветом. */
  placeholder?: React.ReactNode;
  /** Моноширинный шрифт — для адресов, ключей, путей. По умолчанию включён:
   *  почти всё, что показывают неизменяемым полем, читают посимвольно. */
  mono?: boolean;
  /** Иконка слева внутри поля. */
  icon?: React.ReactNode;
}

export type ReadonlyFieldProps = ReadonlyFieldBase &
  (
    | {
        /** Кнопка копирования внутри поля. Значение обязано быть строкой —
         *  копировать вёрстку нечем. */
        copyable: true;
        value: string;
      }
    | { copyable?: false; value: React.ReactNode }
  );

/**
 * Значение, которое показывают, но не дают править: адрес хука, путь к папке,
 * ссылка на чат, готовая строка подключения.
 *
 * Выглядит как поле ввода — та же высота, скругление и рамка, — но залито
 * серым. Это и есть сообщение: «значение настоящее, менять его здесь нельзя».
 * Отключённый `<input disabled>` на эту роль не годится: он читается как поле,
 * которое станет активным при каком-то условии, а его текст выцветает до
 * нечитаемого — при том что значение здесь как раз и нужно прочитать.
 *
 * `copyable` встраивает кнопку копирования В поле, а не ставит её рядом.
 * Кнопка рядом отъедает ширину у значения — ровно там, где значение длинное
 * и его и так обрезает.
 */
const ReadonlyField = React.forwardRef<HTMLDivElement, ReadonlyFieldProps>(
  ({ className, value, placeholder, mono = true, icon, copyable, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const empty = value === null || value === undefined || value === "";

    const textClass = cn(
      "min-w-0 flex-1 truncate",
      mono && "font-mono text-xs",
      // 🚨 Значение и подсказка — РАЗНЫМ цветом. Одинаково серыми они читаются
      // как одно и то же: человек не отличает «здесь пусто» от «здесь вот
      // такое значение, просто поле неактивное».
      empty ? "text-muted-foreground" : "text-foreground",
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-9 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md border border-border bg-muted px-3 text-sm",
          className,
        )}
        {...props}
      >
        {icon && (
          <span
            className="shrink-0 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {copyable ? (
          // Именно `input`, а не текст: он даёт выделение мышью, Ctrl+A и
          // рабочий запасной путь, когда буфер обмена недоступен.
          <input
            ref={inputRef}
            readOnly
            value={value as string}
            className={cn(textClass, "bg-transparent outline-none")}
          />
        ) : (
          <span className={textClass}>{empty ? placeholder : value}</span>
        )}

        {copyable && (
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(value as string);
              } catch {
                // Буфер отказывает в незащищённом контексте и когда документ
                // не в фокусе. Молча ничего не делать нельзя — выделяем текст,
                // чтобы копирование осталось возможным руками.
                inputRef.current?.select();
                return;
              }
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            aria-label={copied ? "Скопировано" : "Скопировать"}
            title={copied ? "Скопировано" : "Скопировать"}
            className="shrink-0 text-muted-foreground transition hover:text-foreground"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        )}
      </div>
    );
  },
);
ReadonlyField.displayName = "ReadonlyField";

export { ReadonlyField };
