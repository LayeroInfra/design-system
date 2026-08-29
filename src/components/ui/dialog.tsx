import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, onOpenAutoFocus, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      // 🚨 НА ТЕЛЕФОНЕ ОКНО НЕ ФОКУСИРУЕТ ПОЛЕ САМО. Автофокус поднимает
      // клавиатуру на пол-экрана, и окно, которое только что открылось,
      // человек видит наполовину — включая те окна, где сначала читают, а
      // потом печатают.
      onOpenAutoFocus={(e) => {
        if (typeof window !== "undefined" && window.innerWidth < 640) e.preventDefault();
        onOpenAutoFocus?.(e);
      }}
      className={cn(
        // 🚨 ОКНО ОБЯЗАНО ПОМЕЩАТЬСЯ В ЭКРАН. Без потолка по высоте длинная
        // форма обрезалась краем телефона, и до кнопок было не добраться.
        // `grid-cols-[minmax(0,1fr)]` не даёт длинному содержимому (коду,
        // однострочному SQL) растянуть колонку: без него окно уезжало вбок и
        // поля вылезали за край. Ширина на телефоне полная — окно там ведёт
        // себя как отдельный экран, а не как карточка с полями по краям. Без потолка по высоте длинная
        // форма вылезала за края телефона, и до нижней части — включая кнопки
        // — было не добраться: прокручивать было нечего, окно просто
        // обрезалось. Ширина тоже считается от экрана, а не «сто процентов
        // родителя»: на узком экране поля по краям должны остаться.
        "fixed left-[50%] top-[50%] z-50 grid grid-cols-[minmax(0,1fr)] w-full max-w-lg max-h-[100dvh] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md opacity-60 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Закрыть</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * Полоса действий внизу окна.
 *
 * 🚨 ОНА ПРИЛИПАЕТ И ЛЕЖИТ НА СЕРОМ. Пока футер был обычной строкой внутри
 * полей контента, в длинном окне (форма, список версий) кнопки уезжали за край
 * вместе с прокруткой: чтобы нажать «Сохранить», приходилось сначала
 * доскроллить донизу. Отрицательные поля выводят полосу на всю ширину окна,
 * `sticky` держит её на месте, а серый фон отделяет действия от содержимого —
 * так это уже сделано в окне настроек домена.
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // 🚨 `bottom` РАВЕН НИЖНЕМУ ПОЛЮ ОКНА, а не нулю. Липкость считается по
      // padding-box: с `bottom-0` полоса останавливалась на 24 пикселя выше
      // края, и в эту щель было видно уезжающий контент.
      "sticky bottom-[-1.5rem] z-10 -mx-6 -mb-6 mt-2 flex flex-col-reverse gap-2",
      "rounded-b-xl border-t border-border bg-muted px-6 py-3",
      "sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
