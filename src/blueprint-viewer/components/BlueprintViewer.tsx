import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../../shared/components/Icon'

interface BlueprintViewerProps {
  image: string
  note?: string
}

const MAX_SCALE = 3

export function BlueprintViewer({ image, note }: BlueprintViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0, tx: 0, ty: 0 })

  const reset = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const zoom = useCallback((delta: number) => {
    setScale((current) => Math.min(MAX_SCALE, Math.max(1, current + delta)))
  }, [])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      zoom(event.deltaY < 0 ? 0.2 : -0.2)
    }
    const node = containerRef.current
    node?.addEventListener('wheel', onWheel, { passive: false })
    return () => node?.removeEventListener('wheel', onWheel)
  }, [zoom])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl bg-[#16304f] shadow-card"
      onPointerDown={(e) => {
        if (scale <= 1) return
        setDragging(true)
        setStart({ x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y })
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!dragging || scale <= 1) return
        setTranslate({
          x: start.tx + (e.clientX - start.x),
          y: start.ty + (e.clientY - start.y),
        })
      }}
      onPointerUp={() => setDragging(false)}
      onDoubleClick={() => (scale <= 1 ? zoom(0.5) : reset())}
    >
      <motion.img
        src={image}
        alt={note ?? 'Plano arquitectónico'}
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 origin-center"
        style={{ x: translate.x, y: translate.y }}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onLoad={() => {}}
      />

      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-paper/15 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-paper/80 backdrop-blur">
        {Math.round(scale * 100)}%
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          type="button"
          aria-label="Acercar"
          onClick={() => zoom(0.35)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur transition hover:bg-paper"
        >
          <Icon name="plus" size={18} />
        </button>
        <button
          type="button"
          aria-label="Alejar"
          onClick={() => zoom(-0.35)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink backdrop-blur transition hover:bg-paper"
        >
          <Icon name="minus" size={18} />
        </button>
        <button
          type="button"
          aria-label="Restablecer vista"
          onClick={reset}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/85 text-paper backdrop-blur transition hover:bg-ink"
        >
          <Icon name="compass" size={18} />
        </button>
      </div>

      <AnimatePresence>
        {scale > 1 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-widest text-paper/80 backdrop-blur"
          >
            Arrastra para desplazarte · doble clic para encuadrar
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default BlueprintViewer