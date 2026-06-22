import * as React from "react";

import { cn } from "@/lib/utils";

export type BetaState = "apply" | "pending" | "joined" | "rejected";

const COPY: Record<BetaState, { title: string; text: string; dot: string }> = {
  apply: {
    title: "Бета-программа",
    text: "Тестируйте новые и платные функции до релиза.",
    dot: "bg-neutral-300",
  },
  pending: {
    title: "Заявка на рассмотрении",
    text: "Мы проверяем вашу заявку — вернёмся с ответом в ближайшее время.",
    dot: "bg-warning-500",
  },
  joined: {
    title: "Вы в бете",
    text: "Доступ к бета-функциям открыт. Спасибо, что помогаете их улучшать.",
    dot: "bg-success-500",
  },
  rejected: {
    title: "Заявка отклонена",
    text: "Сейчас мест в программе нет — попробуйте подать заявку позже.",
    dot: "bg-negative-500",
  },
};

export interface BetaProgramCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state: BetaState;
  /** Footer action (e.g. «Подать заявку» / «Выйти из беты»). */
  footer?: React.ReactNode;
}

/** Beta-program status card — header text + tone change by application state. */
export const BetaProgramCard = React.forwardRef<
  HTMLDivElement,
  BetaProgramCardProps
>(({ state, footer, className, ...props }, ref) => {
  const c = COPY[state];
  return (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-border bg-card p-5", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", c.dot)} />
        <span className="text-base font-semibold text-foreground">{c.title}</span>
      </div>
      <p className="mt-1.5 max-w-md text-sm text-neutral-500">{c.text}</p>
      {footer && <div className="mt-4 flex flex-wrap gap-2">{footer}</div>}
    </div>
  );
});
BetaProgramCard.displayName = "BetaProgramCard";
