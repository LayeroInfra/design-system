import { useState } from "react";

import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  children: string;
  className?: string;
}

/** Monospace snippet with a hover «copy» button (commands, tokens, snippets). */
export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-xs text-foreground">
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
