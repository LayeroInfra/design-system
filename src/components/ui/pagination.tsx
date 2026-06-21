import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number; // 1-based
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

/** Simple page navigation: prev / numbers / next. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  const cls = (active: boolean) =>
    cn(
      "inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm transition",
      active
        ? "border-foreground bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground hover:bg-accent disabled:opacity-40",
    );
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="pagination">
      <button type="button" className={cls(false)} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Назад">
        ‹
      </button>
      {range(pageCount).map((p) => (
        <button key={p} type="button" className={cls(p === page)} aria-current={p === page ? "page" : undefined} onClick={() => onPageChange(p)}>
          {p}
        </button>
      ))}
      <button type="button" className={cls(false)} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Вперёд">
        ›
      </button>
    </nav>
  );
}
