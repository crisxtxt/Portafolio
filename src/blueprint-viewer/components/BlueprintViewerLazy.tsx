import { Suspense, lazy } from 'react'

const BlueprintViewer = lazy(() => import('./BlueprintViewer'))

interface BlueprintViewerLazyProps {
  image: string
  note?: string
}

export default function BlueprintViewerLazy({ image, note }: BlueprintViewerLazyProps) {
  return (
    <Suspense
      fallback={
        <div className="flex aspect-[16/10] animate-pulse items-center justify-center rounded-3xl bg-[#16304f] text-sm text-[#9fc3e8]">
          Preparando plano técnico…
        </div>
      }
    >
      <BlueprintViewer image={image} note={note} />
    </Suspense>
  )
}