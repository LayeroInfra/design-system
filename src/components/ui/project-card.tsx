import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  /** Repo / secondary line under the name. */
  repo?: React.ReactNode;
  /** Deployed host (mono). */
  host?: React.ReactNode;
  /** Extra muted line (e.g. publish status / suspended notice). */
  meta?: React.ReactNode;
  /** Screenshot/preview image. Falls back to the gradient + logo. */
  image?: string | null;
  /** Background gradient for the preview area (deterministic per project). */
  gradient?: string;
  /** Empty-preview content (e.g. a faint brand logo). Defaults to initials. */
  placeholder?: React.ReactNode;
  /** Top-right status pill content (a Badge or dot+label). */
  status?: React.ReactNode;
  /** Top-left overlay (e.g. a branches popover trigger). */
  topLeft?: React.ReactNode;
  /** Bottom-right overlay action (e.g. a cancel button). */
  action?: React.ReactNode;
  /** Suspended look — desaturates the preview. */
  dimmed?: boolean;
}

/** Project tile for the «all projects» grid: 16:9 preview (screenshot or
 *  gradient), status pill, name + repo + host, optional overlays. Presentational
 *  — wrap the body in a Link/button at the call site. */
export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    { name, repo, host, meta, image, gradient, placeholder, status, topLeft, action, dimmed, className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(20,20,19,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_44px_-14px_rgba(20,20,19,0.18)]",
        className,
      )}
      {...props}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden border-b border-neutral-100"
        style={gradient ? { background: gradient } : undefined}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top",
              dimmed && "opacity-60 grayscale",
            )}
          />
        ) : (
          <div className="absolute inset-0 flex select-none items-center justify-center">
            {placeholder ?? (
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-900/30">
                {typeof name === "string" ? name.slice(0, 2) : null}
              </span>
            )}
          </div>
        )}
        {topLeft && <div className="absolute left-2 top-2">{topLeft}</div>}
        {status && (
          <div className="absolute right-2 top-2 inline-flex items-center rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur dark:bg-black/55">
            {status}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className={cn("truncate font-semibold text-foreground", dimmed && "text-neutral-500")}>
          {name}
        </div>
        {repo && <div className="mt-0.5 truncate text-sm text-neutral-500">{repo}</div>}
        {host && (
          <div className="mt-2 truncate font-mono text-xs text-neutral-400">{host}</div>
        )}
        {meta && <div className="mt-2 truncate text-xs text-neutral-500">{meta}</div>}
      </div>
      {action && <div className="absolute bottom-3 right-3">{action}</div>}
    </div>
  ),
);
ProjectCard.displayName = "ProjectCard";
