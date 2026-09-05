import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

const nav = [
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/estudio', label: 'Estudio' },
  { to: '/contacto', label: 'Contacto' },
]

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink px-6 py-16 text-paper md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/60 text-clay">
              <Icon name="compass" size={18} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold">Cristina Vargas</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-paper/55">Arquitectura · Obra</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
            Arquitectura residencial, rehabilitación de lofts y paisaje urbano con materialidad honesta y presupuesto
            transparente por metro cuadrado.
          </p>
          <p className="mt-6 text-xs text-paper/40">© {new Date().getFullYear()} Cristina Vargas Arquitectura. Todos los derechos reservados.</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">Explorar</p>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-paper/70 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li>
              <a href="mailto:estudio@cristinavargas.arq" className="transition-colors hover:text-paper">
                estudio@cristinavargas.arq
              </a>
            </li>
            <li>
              <a href="tel:+525512345678" className="transition-colors hover:text-paper">
                +52 55 1234 5678
              </a>
            </li>
            <li className="text-paper/50">CDMX · Guadalajara · Vallarta</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}