import * as React from "react";

import { cn } from "@/lib/utils";

/** Слова, которые в любом из наших языков значат «это конструкция», а не имя. */
const KEYWORDS = new Set([
  "as", "async", "await", "class", "const", "def", "else", "export", "from",
  "func", "function", "if", "import", "let", "module", "new", "package",
  "return", "static", "using", "var", "void", "while", "public", "private",
]);

/** Строка, комментарий (`//`, `#`), число или слово. Остальное — как есть. */
const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;

/** Подсветка на словаре — тем же способом, что и {@link highlightSql}: ради
 *  шести строк сниппета настоящий парсер не нужен, а цвета помогают отделить
 *  ваш адрес и пароль от обвязки вокруг них. */
export function highlightCode(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const [text, comment, string, number, word] = m;
    const key = `${m.index}`;
    // `//` внутри `postgresql://` — не комментарий, а часть адреса. Без этой
    // проверки вся строка подключения уходила в серый курсив.
    const isUrl = comment?.startsWith("//") && code[m.index - 1] === ":";
    if (comment && !isUrl) {
      out.push(<span key={key} className="italic text-neutral-400">{text}</span>);
    } else if (string) {
      out.push(<span key={key} className="text-success-700">{text}</span>);
    } else if (number) {
      out.push(<span key={key} className="text-warning-700">{text}</span>);
    } else if (word && KEYWORDS.has(word)) {
      out.push(<span key={key} className="font-medium text-info-700">{text}</span>);
    } else {
      out.push(text);
    }
    last = m.index + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export interface CodePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  /** Действия под кодом, за разделителем: копирование, смена пароля. */
  actions?: React.ReactNode;
  /** Высота области кода. Фиксируется нарочно — см. описание компонента. */
  height?: number | string;
  /** Переносить длинные строки вместо горизонтальной прокрутки. */
  wrap?: boolean;
}

/**
 * Сниппет в рамке: подсвеченный код и полоса действий под ним.
 *
 * ВЫСОТА ФИКСИРОВАНА НАРОЧНО. Когда рядом переключают вид сниппета — строка,
 * `.env`, Prisma, — блок разной высоты дёргает всё, что под ним: кнопка
 * «Скопировать» уезжает из-под курсора ровно в тот момент, когда на неё
 * целятся. Пусть лучше внизу останется воздух.
 *
 * ДЕЙСТВИЯ ВНУТРИ РАМКИ. Они относятся к этому коду, а не к экрану: рядом с
 * ним они читаются как его панель, под ним — как ещё один ряд кнопок формы.
 */
export const CodePanel = React.forwardRef<HTMLDivElement, CodePanelProps>(
  ({ children, actions, height = "9rem", wrap = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-lg border border-border bg-muted", className)}
      {...props}
    >
      <pre
        className={cn(
          "overflow-auto px-4 py-3 font-mono text-xs leading-relaxed text-foreground",
          wrap && "whitespace-pre-wrap break-all",
        )}
        style={{ height }}
      >
        {highlightCode(children)}
      </pre>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border px-3 py-2">
          {actions}
        </div>
      )}
    </div>
  ),
);
CodePanel.displayName = "CodePanel";
