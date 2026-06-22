import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import { Progress } from "./progress";

export interface WarmupPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short uppercase stage label (mono). */
  stage?: React.ReactNode;
  /** Human pipeline description. */
  pipeline?: React.ReactNode;
  /** 0..100 progress. */
  percent?: number;
  /** ETA / elapsed line (mono). */
  eta?: React.ReactNode;
  /** Hint line below. */
  hint?: React.ReactNode;
}

/** CDN warm-up progress panel — spinner + stage + pipeline + a thin progress
 *  bar + ETA/hint. Shown in the production/branch preview while a deploy
 *  propagates. */
export const WarmupPanel = React.forwardRef<HTMLDivElement, WarmupPanelProps>(
  ({ stage, pipeline, percent = 0, eta, hint, className, ...props }, ref) => (
    <div ref={ref} className={cn("max-w-xs px-6 text-center", className)} {...props}>
      <Spinner className="mx-auto mb-3 h-5 w-5 text-neutral-500" />
      {stage && (
        <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
          {stage}
        </div>
      )}
      {pipeline && (
        <div className="mb-3 text-sm font-medium text-neutral-700">{pipeline}</div>
      )}
      <Progress
        value={percent}
        className="mb-2 h-1 bg-neutral-200"
        indicatorClassName="bg-neutral-700"
      />
      {eta && (
        <div className="font-mono text-[11px] leading-relaxed tabular-nums text-neutral-400">
          {eta}
        </div>
      )}
      {hint && (
        <div className="mt-3 text-[10px] leading-snug text-neutral-400">{hint}</div>
      )}
    </div>
  ),
);
WarmupPanel.displayName = "WarmupPanel";
