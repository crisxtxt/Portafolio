import type { Category } from '../../shared/types/portfolio'
import { categoryLabels, categoryMeta } from '../shared/categories'
import { Icon } from '../../shared/components/Icon'

interface CategoryBadgeProps {
  category: Category
  small?: boolean
}

export function CategoryBadge({ category, small = false }: CategoryBadgeProps) {
  const meta = categoryMeta[category]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-paper/90 font-medium text-ink-soft backdrop-blur ${
        small ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <Icon name={meta.icon} size={small ? 12 : 14} />
      {categoryLabels[category]}
    </span>
  )
}