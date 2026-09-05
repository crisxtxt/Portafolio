import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Category } from '../shared/types/portfolio'
import { projects } from './data/projects'
import { ProjectCard } from './components/ProjectCard'
import { categoryMeta } from './shared/categories'
import { Icon } from '../shared/components/Icon'
import { Section } from '../shared/components/Section'
import { PageHero } from '../shared/components/PageHero'
import { Reveal } from '../shared/components/Reveal'

type Filter = 'todos' | Category

const filters: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'paisajismo', label: 'Paisajismo' },
]

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('categoria')
  const activeFilter: Filter = categoryParam === 'residencial' || categoryParam === 'comercial' || categoryParam === 'paisajismo' ? categoryParam : 'todos'

  const filtered = useMemo(() => {
    if (activeFilter === 'todos') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  function selectFilter(filter: Filter) {
    setSearchParams(filter === 'todos' ? {} : { categoria: filter }, { replace: true })
  }

  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Portafolio"
        title="Obras que construyen su propio clima"
        description="Una selección de proyectos residenciales, comerciales y de paisajismo. Cada ficha incluye especificaciones de materialidad, hitos de obra y planos interactivos."
      />

      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <p className="text-sm text-ink-soft">
              <Icon name="filter" size={14} className="mr-2 inline-block" />
              {filtered.length} {filtered.length === 1 ? 'obra' : 'obras'} en catálogo
            </p>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoría">
              {filters.map((filter) => {
                const active = activeFilter === filter.value
                return (
                  <button
                    key={filter.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectFilter(filter.value)}
                    className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                      active ? 'text-paper' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="catalog-filter"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    ) : null}
                    <span className="relative z-10">{filter.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Section
        tone="dark"
        eyebrow="¿Buscas construir?"
        title="Un catálogo es solo el comienzo"
        subtitle="Cada obra empezó como una conversación. Solicita una cotización sobre la base de m² y define las fases de tu proyecto junto al estudio."
        className="mt-20"
      >
        <Reveal delay={0.2}>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 rounded-full border border-paper/30 px-8 py-4 text-sm font-medium text-paper transition-all duration-300 hover:border-clay hover:text-clay"
          >
            {categoryMeta.residencial.label} · {categoryMeta.comercial.label} · {categoryMeta.paisajismo.label}
            <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>
      </Section>
    </div>
  )
}