import type { Category } from '@/lib/categories';

/** Plain icon + label, used inside rows that are already links. */
export function CategoryLabel({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] text-muted">
      <Icon className="size-3.5" aria-hidden />
      {category.name}
    </span>
  );
}

/** Pill used on the article page. */
export function CategoryPill({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-soft px-2 py-1 text-xs text-muted">
      <Icon className="size-3" aria-hidden />
      {category.name}
    </span>
  );
}
