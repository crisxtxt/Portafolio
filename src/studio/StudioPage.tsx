import { motion } from 'framer-motion'
import { architectProfile } from './data/profile'
import { PageHero } from '../shared/components/PageHero'
import { Section } from '../shared/components/Section'
import { Reveal } from '../shared/components/Reveal'
import { Icon } from '../shared/components/Icon'
import type { IconName } from '../shared/components/Icon'

const stats: { value: string; label: string }[] = [
  { value: '18+', label: 'Años de oficio' },
  { value: '40', label: 'Obras construidas' },
  { value: '3', label: 'Reconocimientos' },
  { value: '3', label: 'Disciplinas en estudio' },
]

const pillars: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'scale',
    title: 'Materialidad honesta',
    text: 'Concreto, madera y cantera aparentes. Nada se disfraza, todo se educa.',
  },
  {
    icon: 'sun',
    title: 'Luz medida',
    text: 'Cada abertura responde a una orientación y una hora del día, nunca a una moda.',
  },
  {
    icon: 'leaf',
    title: 'Huella consciente',
    text: 'Carbono embebido calculado en cada obra y paisaje nativo en cada exterior.',
  },
  {
    icon: 'layers',
    title: 'Arquitectura reversible',
    text: 'Diseñamos intervenciones que respetan lo existente y pueden desmontarse.',
  },
]

export function StudioPage() {
  const profile = architectProfile

  return (
    <div className="pb-0">
      <PageHero
        eyebrow="El Estudio"
        title="Arquitectura de baja voz para un mundo construido"
        description={profile.bio}
        image="/images/atelier.jpg"
      />

      <section className="border-b border-line px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display text-5xl font-semibold text-clay md:text-6xl">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Filosofía"
        title="Cuatro principios que ordenan cada decisión"
        subtitle="De la elección de un material a la posición de una ventana."
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-line bg-paper-deep p-8 transition-all duration-300 hover:border-clay/40 hover:bg-paper-deep/70">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-paper transition-colors duration-300 group-hover:bg-clay">
                  <Icon name={pillar.icon} size={22} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-paper-deep px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-line shadow-card"
          >
            <img src={profile.portrait} alt={`Retrato de ${profile.fullName}`} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 pt-16">
              <p className="font-display text-2xl text-paper">{profile.fullName}</p>
              <p className="text-sm text-paper/75">{profile.title}</p>
            </div>
          </motion.div>

          <div>
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-clay">Trayectoria</p>
              <h2 className="font-display text-4xl font-semibold leading-tight text-balance md:text-5xl">
                Diseñar es comprometerse con el tiempo y el clima de las obras
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{profile.philosophy}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="mt-10 text-xs font-semibold uppercase tracking-widest text-clay">Formación</h3>
              <ul className="mt-4 space-y-3">
                {profile.education.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-clay" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Section eyebrow="Reconocimientos" title="Obras que fueron vistas" subtitle="Distinciones recibidas por el estudio y sus proyectos, 2021 a la fecha.">
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {profile.recognitions.map((recognition, i) => (
            <Reveal key={recognition.id} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-paper-deep p-8">
                <p className="font-display text-6xl font-medium text-clay/40">{recognition.year}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{recognition.title}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-clay">{recognition.issuer}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{recognition.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Section eyebrow="Equipo" title="Las manos que firman cada obra">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {profile.team.map((member, i) => (
                <Reveal key={member.id} delay={i * 0.08}>
                  <article className="group overflow-hidden rounded-2xl bg-paper-deep">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image}
                        alt={`Retrato de ${member.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl text-ink">{member.name}</h3>
                      <p className="mt-0.5 text-sm font-medium text-clay">{member.role}</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{member.discipline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{member.bio}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </section>
    </div>
  )
}