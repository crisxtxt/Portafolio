import { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, projects } from './data/projects'
import { PageHero } from '../shared/components/PageHero'
import { Section } from '../shared/components/Section'
import { Reveal } from '../shared/components/Reveal'
import { Icon } from '../shared/components/Icon'
import { Button } from '../shared/components/Button'
import { CategoryBadge } from './components/CategoryBadge'
import type { MaterialSpec, Milestone, ProjectPhase } from '../shared/types/portfolio'

const BlueprintComparison = lazy(() => import('../blueprint-viewer/components/BlueprintComparison'))
const BlueprintViewerLazy = lazy(() => import('../blueprint-viewer/components/BlueprintViewerLazy'))

function MaterialCard({ material }: { material: MaterialSpec }) {
  return (
    <Reveal className="h-full">
      <article className="flex h-full flex-col rounded-2xl border border-line bg-paper-deep p-6">
        <h4 className="font-display text-xl text-ink">{material.name}</h4>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-clay">Superficie</dt>
            <dd className="mt-1 text-ink-soft">{material.surface}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-clay">Acabado</dt>
            <dd className="mt-1 text-ink-soft">{material.finish}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-clay">Sustentabilidad</dt>
            <dd className="mt-1 text-ink-soft">{material.sustainability}</dd>
          </div>
        </dl>
      </article>
    </Reveal>
  )
}

function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-8">
      {milestones.map((milestone, i) => (
        <motion.li
          key={milestone.id}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="relative"
        >
          <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-clay bg-paper" />
          <p className="text-xs font-semibold uppercase tracking-widest text-clay">{milestone.date}</p>
          <h4 className="mt-1 font-display text-xl text-ink">{milestone.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{milestone.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}

function PhaseList({ phases }: { phases: ProjectPhase[] }) {
  return (
    <div className="space-y-3">
      {phases.map((phase, i) => (
        <Reveal key={phase.id} delay={i * 0.06}>
          <div className="flex items-center justify-between rounded-xl border border-line bg-paper-deep px-5 py-4">
            <div>
              <p className="text-xs text-ink-soft">{phase.date}</p>
              <p className="font-medium text-ink">{phase.title}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                phase.status === 'completada'
                  ? 'bg-sage/20 text-sage'
                  : phase.status === 'en-curso'
                    ? 'bg-clay/15 text-clay-dark'
                    : 'bg-paper text-ink-soft'
              }`}
            >
              {phase.status}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay">404</p>
      <h1 className="font-display text-5xl text-ink">Obra no encontrada</h1>
      <Button to="/proyectos" variant="outline">
        Volver al catálogo
      </Button>
    </div>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) return <NotFound />

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="pb-0">
      <PageHero
        eyebrow={`${project.status} · ${project.year}`}
        title={project.title}
        description={project.summary}
        image={project.heroImage}
      />

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="space-y-6">
              <CategoryBadge category={project.category} />
              <div className="space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
                {project.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                { label: 'Superficie', value: `${project.areaM2.toLocaleString('es')} m²` },
                { label: 'Año', value: String(project.year) },
                { label: 'Presupuesto', value: project.budget },
                { label: 'Cliente', value: project.client },
                { label: 'Ubicación', value: project.location },
                { label: 'Equipo', value: project.architects.join(', ') },
              ].map((row) => (
                <div key={row.label} className="bg-paper p-5">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-clay">{row.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl bg-ink p-6 text-paper">
              <h3 className="font-display text-xl">Características destacadas</h3>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-paper/80">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-clay" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {project.hasBlueprintComparison && project.beforeImage && project.afterImage ? (
        <section className="px-6 pb-4 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Section eyebrow="Interactivo" title="Obra gris vs. acabado final" subtitle="Desliza el control para comparar la etapa de construcción con la obra terminada.">
              <Suspense
                fallback={
                  <div className="flex aspect-video items-center justify-center rounded-3xl bg-paper-deep text-sm text-ink-soft">
                    Cargando comparador…
                  </div>
                }
              >
                <BlueprintComparison beforeImage={project.beforeImage} afterImage={project.afterImage} />
              </Suspense>
            </Section>
          </div>
        </section>
      ) : null}

      {project.blueprintImage ? (
        <section className="px-6 py-20 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Section eyebrow="Planimetría" title="Plano interactivo" subtitle="Acerca la vista para explorar la distribución de la planta principal.">
              <Suspense
                fallback={
                  <div className="flex aspect-video items-center justify-center rounded-3xl bg-paper-deep text-sm text-ink-soft">
                    Cargando plano…
                  </div>
                }
              >
                <BlueprintViewerLazy image={project.blueprintImage} />
              </Suspense>
            </Section>
          </div>
        </section>
      ) : null}

      {project.materials.length > 0 ? (
        <section className="px-6 py-20 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Section eyebrow="Materialidad" title="Especificaciones de materiales" subtitle="Cada elección material responde a un criterio de durabilidad, acabado y sustentabilidad.">
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {project.materials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            </Section>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 md:grid-cols-2">
          <Section eyebrow="Cronología" title="Hitos de la obra">
            <div className="mt-10">
              <MilestoneTimeline milestones={project.milestones} />
            </div>
          </Section>
          <Section eyebrow="Avance" title="Fases del proyecto">
            <div className="mt-10">
              <PhaseList phases={project.phases} />
            </div>
          </Section>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Section eyebrow="Galería" title="Registro fotográfico">
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {project.gallery.map((image, i) => (
                <Reveal key={image + i} delay={i * 0.08}>
                  <div className={`overflow-hidden rounded-3xl ${i % 3 === 0 ? 'md:col-span-2 md:aspect-[16/8]' : 'md:aspect-[4/3]'}`}>
                    <img
                      src={image}
                      alt={`${project.title} — vista ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-paper md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-medium text-balance md:text-5xl">¿Quieres una obra como esta?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-paper/70">Cuéntanos tu terreno y tu programa. Estimarás el presupuesto por m² y agendaremos una consultoría.</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/contacto" variant="secondary" size="lg">
                Cotizar obra
                <Icon name="arrow-right" size={18} />
              </Button>
              <Button to={`/proyectos/${next.slug}`} variant="ghost" size="lg" className="border border-paper/25 text-paper hover:border-clay hover:text-clay">
                Siguiente obra
                <Icon name="arrow-up-right" size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}