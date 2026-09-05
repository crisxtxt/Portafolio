import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}

export function Section({ id, eyebrow, title, subtitle, children, className = '', tone = 'light' }: SectionProps) {
  const dark = tone === 'dark'
  return (
    <section id={id} className={`relative px-6 py-20 md:px-12 md:py-28 ${dark ? 'bg-ink text-paper' : 'bg-paper text-ink'} ${className}`}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 md:mb-16">
          {eyebrow ? (
            <Reveal>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] ${dark ? 'text-clay' : 'text-clay'}`}>
                {eyebrow}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.1}>
            <h2 className={`font-display text-4xl font-medium leading-tight text-balance md:text-6xl ${dark ? 'text-paper' : 'text-ink'}`}>
              {title}
            </h2>
          </Reveal>
          {subtitle ? (
            <Reveal delay={0.2}>
              <p className={`mt-4 max-w-2xl text-base leading-relaxed ${dark ? 'text-paper/70' : 'text-ink-soft'}`}>{subtitle}</p>
            </Reveal>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}