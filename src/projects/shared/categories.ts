import type { Category } from '../../shared/types/portfolio'
import type { IconName } from '../../shared/components/Icon'

export const categoryMeta: Record<Category, { label: string; icon: IconName; description: string }> = {
  residencial: {
    label: 'Residencial',
    icon: 'door',
    description: 'Viviendas unifamiliares y prototipos habitacionales',
  },
  comercial: {
    label: 'Comercial',
    icon: 'building',
    description: 'Oficinas, lofts y desarrollos híbridos',
  },
  paisajismo: {
    label: 'Paisajismo',
    icon: 'leaf',
    description: 'Espacios públicos, jardines de lluvia y bordes lacustres',
  },
}

export const categoryLabels: Record<Category, string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  paisajismo: 'Paisajismo',
}