import * as React from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { BranchRow } from "./branch-row";

export interface BranchInfo {
  id?: string;
  name: React.ReactNode;
  host: string;
  url?: string;
  production?: boolean;
}

export interface BranchesPopoverProps {
  branches: BranchInfo[];
  /** Extra hidden count shown as "+N" on the trigger. */
  extraCount?: number;
  /** Override trigger classes (e.g. to absolutely-position over a card). */
  triggerClassName?: string;
  /** Open by default (handy for previews/stories). */
  defaultOpen?: boolean;
}

function branchWord(n: number) {
  const d = n % 10;
  const dd = n % 100;
  if (d === 1 && dd !== 11) return "ветка";
  if (d >= 2 && d <= 4 && (dd < 10 || dd >= 20)) return "ветки";
  return "веток";
}

/** A branches popover: a "N веток" pill trigger that opens a list of branch
 *  rows (name + production tag + host with copy/open). Built on Popover +
 *  BranchRow. */
export function BranchesPopover({
  branches,
  extraCount = 0,
  triggerClassName,
  defaultOpen,
}: BranchesPopoverProps) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label="Показать ветки"
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-xs font-medium leading-none text-neutral-600 shadow-sm transition hover:bg-overlay data-[state=open]:ring-1 data-[state=open]:ring-foreground",
            triggerClassName,
          )}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="4" cy="3.5" r="1.5" />
            <circle cx="4" cy="12.5" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
            <path d="M4 5v6" />
            <path d="M4 8h4a4 4 0 0 0 4-4" />
          </svg>
          {branches.length} {branchWord(branches.length)}
          {extraCount > 0 && <span className="text-neutral-400">+{extraCount}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-72 overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="max-h-72 divide-y divide-border overflow-y-auto">
          {branches.map((b, i) => (
            <BranchRow
              key={b.id ?? i}
              name={b.name}
              host={b.host}
              url={b.url}
              production={b.production}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
