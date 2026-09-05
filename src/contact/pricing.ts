import type { UnitPrice } from '../shared/types/portfolio'

export const unitPrices: Record<string, UnitPrice> = {
  residencial: {
    category: 'residencial',
    low: 900,
    high: 1600,
    currency: 'USD',
    unit: 'm²',
  },
  comercial: {
    category: 'comercial',
    low: 1100,
    high: 1900,
    currency: 'USD',
    unit: 'm²',
  },
  paisajismo: {
    category: 'paisajismo',
    low: 120,
    high: 350,
    currency: 'USD',
    unit: 'm²',
  },
}

export const budgetRanges = [
  '$100k – $250k',
  '$250k – $500k',
  '$500k – $1M',
  '$1M – $2M',
  'Más de $2M',
] as const

export function formatArea(areaM2: number): string {
  return `${areaM2.toLocaleString('es')} m²`
}

export function estimateBudget(areaM2: number, category: string): { low: number; high: number } {
  const prices = unitPrices[category] ?? unitPrices.residencial
  return {
    low: Math.round(areaM2 * prices.low),
    high: Math.round(areaM2 * prices.high),
  }
}