import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

export interface MemberRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  name: string;
  /** GitHub handle / email — muted secondary line. */
  handle?: React.ReactNode;
  /** Override the leading avatar. Defaults to an initial avatar from `name`. */
  avatar?: React.ReactNode;
  /** Role badge or a role <Select> slot. */
  role?: React.ReactNode;
  /** Trailing action — e.g. a «Удалить» button. */
  action?: React.ReactNode;
}

/** A members-list row: avatar · name + handle · role · action. */
export const MemberRow = React.forwardRef<HTMLDivElement, MemberRowProps>(
  ({ name, handle, avatar, role, action, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 py-2.5", className)}
      {...props}
    >
      <div className="shrink-0">
        {avatar ?? <Avatar name={name} shape="circle" className="h-8 w-8 text-[11px]" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{name}</div>
        {handle && (
          <div className="truncate text-xs text-neutral-500">{handle}</div>
        )}
      </div>
      {role && <div className="shrink-0">{role}</div>}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ),
);
MemberRow.displayName = "MemberRow";
