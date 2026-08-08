import { useState } from "react";

import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  children: string;
  className?: string;
  /**
   * Wrap long content instead of scrolling it sideways.
   *
   * The default (horizontal scroll) is right for commands and code, where a
   * broken line changes meaning. It is wrong for a single unbreakable value —
   * a connection string, a token — because the tail simply disappears off the
   * edge and a partially visible connection string is useless: you cannot
   * connect with it, and nothing tells you there is more.
   */
  wrap?: boolean;
}

/** Monospace snippet with a hover «copy» button (commands, tokens, snippets). */
export function CodeBlock({ children, className, wrap }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn("group relative", className)}>
      <pre
        className={cn(
          "rounded-lg bg-muted px-4 py-3 font-mono text-xs text-foreground",
          wrap ? "whitespace-pre-wrap break-all" : "overflow-x-auto",
        )}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="absolute right-2 top-2 text-[11px] text-muted-foreground opacity-0 transition hover:text-foreground group-hover:opacity-100"
      >
        {copied ? "скопировано" : "копировать"}
      </button>
    </div>
  );
}
