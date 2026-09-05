import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface BlueprintComparisonProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export function BlueprintComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Obra gris',
  afterLabel = 'Acabado final',
}: BlueprintComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl shadow-card"
      onPointerDown={(e) => {
        setDragging(true)
        updatePosition(e.clientX)
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (dragging) updatePosition(e.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <img src={afterImage} alt={afterLabel} draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />

      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
        animate={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        transition={{ type: 'tween', duration: dragging ? 0 : 0.25, ease: 'easeOut' }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-paper backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-paper/85 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink backdrop-blur">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-paper shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
        <div className="absolute top-1/2 -ml-6 h-12 w-12 -translate-y-1/2 rounded-full bg-paper/95 shadow-soft backdrop-blur">
          <div className="flex h-full w-full items-center justify-center gap-1.5 text-ink">
            <motion.span animate={{ x: dragging ? -2 : 0 }} className="text-lg leading-none">
              ‹
            </motion.span>
            <motion.span animate={{ x: dragging ? 2 : 0 }} className="text-lg leading-none">
              ›
            </motion.span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <span className="rounded-full bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-widest text-paper/70 backdrop-blur">
          Arrastra para comparar
        </span>
      </div>
    </div>
  )
}

export default BlueprintComparison