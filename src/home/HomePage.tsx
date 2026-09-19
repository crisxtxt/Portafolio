import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { featuredProjects, projects } from '../projects/data/projects'
import { ProjectCard } from '../projects/components/ProjectCard'
import { categoryMeta } from '../projects/shared/categories'
import { Section } from '../shared/components/Section'
import { Reveal } from '../shared/components/Reveal'
import { Icon } from '../shared/components/Icon'
import type { IconName } from '../shared/components/Icon'

const services: { icon: IconName; title: string; text: string; to: string }[] = [
  {
    icon: 'ruler',
    title: 'Proyecto arquitectónico',
    text: 'Del anteproyecto a la dirección de obra, con documentación ejecutiva y permisos municipales.',
    to: '/contacto',
  },
  {
    icon: 'grid',
    title: 'Rehabilitación costera',
    text: 'Intervenciones reversibles sobre inmuebles existentes, pensadas para el clima salino.',
    to: '/contacto',
  },
  {
    icon: 'leaf',
    title: 'Paisajismo xerófilo',
    text: 'Jardines de bajo consumo de agua, sombra y manejo de lluvia para la isla.',
    to: '/contacto',
  },
  {
    icon: 'compass',
    title: 'Consultoría y seguimiento de obra',
    text: 'Acompañamiento técnico para construir mejor con el presupuesto que tienes.',
    to: '/contacto',
  },
]

export function HomePage() {
  return (
    <div className="pb-0">
      <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-paper px-6 pb-24 pt-40 text-ink md:px-12 md:pt-48">
        <div className="grain absolute inset-0 opacity-50" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-sand/40 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-stone/15 blur-[120px]"
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-clay">
                Stoico · Estudio de Arquitectura — Isla de Margarita
              </p>
            </Reveal>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl font-semibold leading-[1.02] text-balance md:text-8xl"
            >
              Construimos para el tiempo, entre la luz y la brisa.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              Arquitectura residencial, comercial y paisajismo desde la Isla de Margarita. Planos interactivos,
              materiales honestos y presupuestos claros por metro cuadrado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/proyectos"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-all duration-300 hover:bg-clay"
              >
                Ver portafolio
                <Icon name="arrow-right" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 rounded-full border border-ink/25 px-8 py-4 text-sm font-medium text-ink transition-all duration-300 hover:border-clay hover:text-clay"
              >
                Cotizar obra
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-card">
              <img src="/images/casa-playa-angel.svg" alt="Casa de playa frente al mar" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-widest text-paper/70">Casa Playa El Ángel · Margarita</p>
                <p className="mt-1 font-display text-xl text-paper">Cal y madera frente al mar</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 -top-6 hidden items-center gap-3 rounded-2xl border border-line bg-paper p-4 shadow-card md:flex"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay text-paper">
                <Icon name="compass" size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">40+ obras</p>
                <p className="text-xs text-ink-soft">construidas y entregadas</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Obras destacadas"
        title="De primera piedra a entrega de llaves"
        subtitle="Tres proyectos construidos que resumen el oficio del estudio: estructura, materialidad y paisaje."
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <Reveal key={project.id} delay={0}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Section eyebrow="Disciplinas" title="Lo que el estudio construye" subtitle="Un mismo criterio de diseño en tres escalas distintas.">
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {(['residencial', 'comercial', 'paisajismo'] as const).map((category, i) => {
                const meta = categoryMeta[category]
                const count = projects.filter((project) => project.category === category).length
                return (
                  <Reveal key={category} delay={i * 0.1}>
                    <Link
                      to={`/proyectos?categoria=${category}`}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper-deep p-8 transition-all duration-300 hover:border-clay/60 hover:shadow-soft"
                    >
                      <div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-paper transition-colors duration-300 group-hover:bg-clay">
                          <Icon name={meta.icon} size={22} />
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{meta.label}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{meta.description}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-soft">
                        <span>{count} obras</span>
                        <Icon name="arrow-up-right" size={18} className="text-clay transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </Section>
        </div>
      </section>

      <section className="bg-paper-deep px-6 py-20 text-ink md:px-12">
        <div className="mx-auto max-w-7xl">
          <Section eyebrow="Servicios" title="Cuatro maneras de construir con el estudio">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.08}>
                  <Link
                    to={service.to}
                    className="group flex h-full items-start gap-5 rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:border-clay/60 hover:shadow-soft"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-paper transition-colors duration-300 group-hover:bg-clay">
                      <Icon name={service.icon} size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.text}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-28 text-center md:px-12">
        <div className="grain absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-clay">Cotiza con números claros</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-balance text-ink md:text-6xl">
              Tu obra, presupuestada desde el primer metro cuadrado.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              Estima el rango de inversión según categoría y superficie, agenda una consultoría y recibe un plan de fases
              para tu proyecto.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              to="/contacto"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-10 py-5 text-sm font-medium text-paper transition-all duration-300 hover:bg-clay"
            >
              Calcular mi presupuesto
              <Icon name="arrow-right" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}