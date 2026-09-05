import { Button } from '../shared/components/Button'
import { Icon } from '../shared/components/Icon'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[75svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-clay/10 text-clay">
        <Icon name="compass" size={36} />
      </span>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-clay">Error 404</p>
        <h1 className="font-display text-5xl font-medium text-ink md:text-6xl">Esta obra no existe en el plano</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          La ruta que buscas no está en el catálogo. Puede que el proyecto se haya reubicado o nunca haya sido construido.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/" variant="primary">
          <Icon name="arrow-left" size={16} />
          Volver al inicio
        </Button>
        <Button to="/proyectos" variant="outline">
          Ver catálogo de obras
        </Button>
      </div>
    </div>
  )
}