import { cn } from "@/lib/utils";

/** Indeterminate loading spinner. Size & colour via className (defaults to
 *  1rem / currentColor) — e.g. `<Spinner className="h-5 w-5 text-neutral-500" />`. */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 animate-spin", className)}
      role="status"
      aria-label="Загрузка"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
