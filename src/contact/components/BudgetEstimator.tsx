import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { Category } from '../../shared/types/portfolio'
import { estimateBudget, formatArea } from '../pricing'

export function BudgetEstimator() {
  const [category, setCategory] = useState<Category>('residencial')
  const [areaM2, setAreaM2] = useState(200)

  const estimate = useMemo(() => estimateBudget(areaM2, category), [areaM2, category])

  const categories: { value: Category; label: string }[] = [
    { value: 'residencial', label: 'Residencial' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'paisajismo', label: 'Paisajismo' },
  ]

  return (
    <div className="rounded-3xl bg-ink p-8 text-paper shadow-card md:p-10">
      <h3 className="font-display text-3xl text-paper">Estimador de presupuesto</h3>
      <p className="mt-2 text-sm text-paper/65">
        Rango por m² según tarifas vigentes del estudio. La cotización final se ajusta al levantamiento.
      </p>

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-clay">Categoría</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((option) => {
            const active = category === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setCategory(option.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  active ? 'bg-clay text-paper' : 'bg-paper/10 text-paper/70 hover:bg-paper/20 hover:text-paper'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">Superficie</p>
          <p className="text-sm font-medium text-paper">{formatArea(areaM2)}</p>
        </div>
        <input
          type="range"
          min={20}
          max={20000}
          step={10}
          value={areaM2}
          onChange={(event) => setAreaM2(Number(event.target.value))}
          className="w-full accent-clay"
          aria-label="Superficie en metros cuadrados"
        />
        <div className="mt-1 flex justify-between text-[11px] text-paper/40">
          <span>20 m²</span>
          <span>20,000 m²</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${category}-${areaM2}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="mt-8 rounded-2xl bg-paper/10 p-6"
        >
          <p className="text-xs uppercase tracking-widest text-paper/50">Rango estimado de inversión</p>
          <p className="mt-2 font-display text-4xl font-medium text-paper">
            ${estimate.low.toLocaleString('es')} – ${estimate.high.toLocaleString('es')}
          </p>
          <p className="mt-2 text-xs text-paper/55">
            Tarifa {category}: ${estimateBudget(10, category).low} a ${estimateBudget(10, category).high} USD por m²
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-6 text-[11px] leading-relaxed text-paper/40">
        El estimado no sustituye la cotización formal. Incluye proyecto ejecutivo, permisos y dirección de obra; excluye
        terrenos, demoliciones y factibilidad de servicios.
      </p>
    </div>
  )
}

export default BudgetEstimator