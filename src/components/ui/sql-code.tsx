import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Подсветка SQL для статических фрагментов.
 *
 * Настоящий редактор (CodeMirror с `lang-sql`) поднимать ради четырёх строк
 * `CREATE TABLE` незачем: он тянет за собой парсер, автодополнение и свои
 * стили — всё то, чего в окне-подсказке быть не должно. Здесь достаточно
 * разбить текст на слова, строки, числа и комментарии: цвета те же, что в
 * редакторе, а весит это ноль.
 */
const KEYWORDS = new Set([
  "add", "all", "alter", "always", "and", "as", "asc", "begin", "by", "cascade",
  "case", "check", "column", "commit", "constraint", "create", "cross", "default",
  "delete", "desc", "distinct", "drop", "else", "end", "exists", "extension",
  "false", "foreign", "from", "full", "generated", "grant", "group", "having",
  "identity", "if", "in", "index", "inner", "insert", "into", "is", "join", "key",
  "left", "like", "limit", "not", "null", "offset", "on", "or", "order", "outer",
  "policy", "primary", "references", "rename", "replace", "returning", "revoke",
  "right", "rollback", "row", "schema", "select", "set", "table", "then", "to",
  "true", "union", "unique", "update", "using", "values", "view", "when", "where",
  "with",
]);

const TYPES = new Set([
  "bigint", "bigserial", "boolean", "bytea", "char", "date", "decimal", "double",
  "float", "int", "integer", "interval", "json", "jsonb", "numeric", "real",
  "serial", "smallint", "text", "time", "timestamp", "timestamptz", "uuid",
  "varchar",
]);

/** Комментарий, строка, число или слово — всё остальное идёт как есть. */
const TOKEN = /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w$]*)/g;

export function highlightSql(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const [text, comment, string, number, word] = m;
    const key = `${m.index}`;
    if (comment) {
      out.push(<span key={key} className="italic text-neutral-400">{text}</span>);
    } else if (string) {
      out.push(<span key={key} className="text-success-700">{text}</span>);
    } else if (number) {
      out.push(<span key={key} className="text-warning-700">{text}</span>);
    } else if (word && KEYWORDS.has(word.toLowerCase())) {
      out.push(<span key={key} className="font-medium text-info-700">{text}</span>);
    } else if (word && TYPES.has(word.toLowerCase())) {
      out.push(<span key={key} className="text-info-500">{text}</span>);
    } else {
      out.push(text);
    }
    last = m.index + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

/** Фрагмент SQL: серый блок, подсветка, копирование по наведению. */
export function SqlCode({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-xs leading-relaxed text-foreground">
        {highlightSql(children)}
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="absolute right-2 top-2 rounded bg-muted px-1 text-[11px] text-muted-foreground opacity-0 transition hover:text-foreground group-hover:opacity-100"
      >
        {copied ? "скопировано" : "копировать"}
      </button>
    </div>
  );
}
