import * as React from "react";

import { cn } from "@/lib/utils";

export interface HeadingBuilderProps {
  /** Page/section title. Accepts nodes so inline suffixes/links are allowed. */
  title: React.ReactNode;
  /** Optional supporting line under the title. */
  description?: React.ReactNode;
  /** Optional controls aligned to the right of the title row (buttons, links…). */
  actions?: React.ReactNode;
  className?: string;
}

const GAP_PX = 16; // matches the header's gap-x-4
const MAX_LINES = 2;

/**
 * Page heading molecule: title + optional description, with optional actions.
 *
 * Actions stay pinned to the top-right and the description wraps into the
 * narrower column beside them — up to {@link MAX_LINES} lines. When the
 * description would need more lines, or the actions would reach the title, the
 * actions drop onto their own row below (giving the description full width)
 * instead of the text being truncated. The stack decision is derived purely
 * from widths (row / actions / title) so it never oscillates.
 */
export function HeadingBuilder({
  title,
  description,
  actions,
  className,
}: HeadingBuilderProps) {
  const rowRef = React.useRef<HTMLElement>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);
  const titleProbeRef = React.useRef<HTMLSpanElement>(null);
  const descProbeRef = React.useRef<HTMLDivElement>(null);
  const [stacked, setStacked] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!actions) {
      setStacked(false);
      return;
    }
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      const rowW = row.clientWidth;
      const actionsW = actionsRef.current?.offsetWidth ?? 0;
      const inlineColW = rowW - actionsW - GAP_PX;

      const titleW = titleProbeRef.current?.offsetWidth ?? 0;

      let descLines = 0;
      const probe = descProbeRef.current;
      if (probe && description != null) {
        probe.style.width = `${Math.max(0, inlineColW)}px`;
        const lh = parseFloat(getComputedStyle(probe).lineHeight) || 20;
        descLines = Math.round(probe.scrollHeight / lh);
      }

      // Stack when the actions would crowd the title, or when the description
      // can't fit within the line budget beside them.
      setStacked(inlineColW < titleW || descLines > MAX_LINES);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, [actions, title, description]);

  return (
    <header
      ref={rowRef}
      className={cn(
        "relative flex flex-wrap items-start gap-x-4 gap-y-3",
        className,
      )}
    >
      <div className={cn(stacked ? "w-full" : "min-w-0 flex-1")}>
        <h2 className="text-xl font-semibold tracking-tightish">{title}</h2>
        {description && (
          <p
            className={cn(
              "mt-1 text-sm text-neutral-500",
              actions && !stacked && "line-clamp-2",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div
          ref={actionsRef}
          className="flex shrink-0 flex-wrap items-center gap-2"
        >
          {actions}
        </div>
      )}

      {/* Hidden probes: the title's intrinsic (single-line) width and the number
          of lines the description needs in the inline column. Drive the stack
          decision above without affecting layout. */}
      {actions && (
        <div
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 -z-10"
        >
          <span
            ref={titleProbeRef}
            className="whitespace-nowrap text-xl font-semibold tracking-tightish"
          >
            {title}
          </span>
          {description != null && (
            <div ref={descProbeRef} className="text-sm">
              {description}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
