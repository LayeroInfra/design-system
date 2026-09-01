import * as React from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HintProps {
  /** Что объясняем. Обычный текст или узлы — как в подсказке. */
  children: React.ReactNode;
  /** Чем открывать. По умолчанию — значок (i). */
  trigger?: React.ReactNode;
  /** Класс на обёртке триггера. */
  className?: string;
  /** Ширина подсказки. */
  contentClassName?: string;
  /** С какой стороны показывать. */
  side?: "top" | "right" | "bottom" | "left";
}

/** Есть ли у устройства курсор. Пересчитывается на смену режима: планшет с
 *  подключённой мышью переключается на лету. */
function useHover(): boolean {
  const [hover, setHover] = React.useState(true);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover)");
    const apply = () => setHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return hover;
}

/**
 * Подсказка у значка — одна на всю панель.
 *
 * 🚨 НА ТАЧ-ЭКРАНЕ ТУЛТИП НЕ РАБОТАЕТ, И ЭТО НЕ НАСТРАИВАЕТСЯ. Radix открывает
 * его по наведению; пальцем «навести» нельзя, поэтому подсказка либо не
 * появлялась вовсе, либо мигала на долю секунды при касании — то есть текст,
 * который мы написали, до половины людей просто не доходил.
 *
 * Поэтому здесь два механизма под одним именем: с курсором — привычный тултип
 * по наведению, без курсора — поповер, который открывается по нажатию и
 * держится, пока не нажмут в другом месте. Снаружи разница не видна: и там, и
 * там значок (i) и текст рядом.
 */
export function Hint({
  children,
  trigger,
  className,
  contentClassName,
  side = "top",
}: HintProps) {
  const hover = useHover();
  const glyph = trigger ?? <Info className="h-3.5 w-3.5" />;

  if (!hover) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Подсказка"
            className={cn("inline-flex shrink-0 text-neutral-400", className)}
          >
            {glyph}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side={side}
          className={cn("w-[16rem] p-3 text-xs leading-relaxed", contentClassName)}
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            aria-label="Подсказка"
            className={cn("inline-flex shrink-0 cursor-help text-neutral-400", className)}
          >
            {glyph}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} className={cn("max-w-[20rem]", contentClassName)}>
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
