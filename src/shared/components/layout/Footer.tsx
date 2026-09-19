import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

const nav = [
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/estudio', label: 'Estudio' },
  { to: '/contacto', label: 'Contacto' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep px-6 py-16 text-ink md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/50 text-clay">
              <Icon name="compass" size={18} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold uppercase tracking-[0.18em]">Stoico</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink-soft">Estudio · Arquitectura</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
            Arquitectura residencial, comercial y paisajismo desde la Isla de Margarita. Diseño de baja voz, materiales
            honestos y presupuesto transparente por metro cuadrado.
          </p>
          <p className="mt-6 text-xs text-ink-soft/60">© {new Date().getFullYear()} Stoico · Estudio de Arquitectura. Isla de Margarita, Venezuela.</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">Explorar</p>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-ink-soft transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li>
              <a href="mailto:estudio@stoico.arq" className="transition-colors hover:text-ink">
                estudio@stoico.arq
              </a>
            </li>
            <li>
              <a href="tel:+584121234567" className="transition-colors hover:text-ink">
                +58 412 123 4567
              </a>
            </li>
            <li className="text-ink-soft/70">Av. Bolívar 12 · La Asunción · Isla de Margarita</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}