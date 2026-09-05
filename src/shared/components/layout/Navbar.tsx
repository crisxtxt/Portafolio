import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from '../Icon'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/estudio', label: 'Estudio' },
  { to: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/60 text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-paper">
              <Icon name="compass" size={18} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-wide text-paper">Cristina Vargas</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-paper/55">Arquitectura · Obra</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-paper' : 'text-paper/60 hover:text-paper'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-paper/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    ) : null}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-2.5 text-sm font-medium text-paper transition-all duration-300 hover:bg-clay-dark"
            >
              Cotizar obra
              <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper md:hidden"
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[68px] z-40 flex flex-col gap-1 rounded-b-3xl border-b border-paper/10 bg-ink/95 px-6 pb-8 pt-4 backdrop-blur-md md:hidden"
            aria-label="Menú móvil"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-5 py-4 text-base font-medium transition-colors ${
                    isActive ? 'bg-paper/10 text-paper' : 'text-paper/60 hover:text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-medium text-paper"
            >
              Cotizar obra
              <Icon name="arrow-up-right" size={16} />
            </NavLink>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <span className="sr-only">Ruta actual: {location.pathname}</span>
    </>
  )
}