import { Link } from 'react-router-dom'
import type { Project } from '../../shared/types/portfolio'
import { CategoryBadge } from './CategoryBadge'
import { TiltCard } from '../../shared/components/TiltCard'
import { Icon } from '../../shared/components/Icon'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/proyectos/${project.slug}`} className="group block focus:outline-none">
      <TiltCard className="relative overflow-hidden rounded-3xl bg-paper-deep shadow-card transition-shadow duration-500 group-hover:shadow-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.heroImage}
            alt={`${project.title} — ${project.category}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <CategoryBadge category={project.category} />
            <span className="rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">{project.status}</span>
          </div>
          {project.hasBlueprintComparison ? (
            <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink/85 text-paper opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
              <Icon name="compare" size={18} />
            </div>
          ) : null}
        </div>

        <div className="p-6" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-medium text-ink">{project.title}</h3>
            <span className="shrink-0 text-sm tabular-nums text-ink-soft">{project.year}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Icon name="pin" size={14} />
              {project.location}
            </span>
            <span className="tabular-nums">{project.areaM2.toLocaleString('es')} m²</span>
          </div>
        </div>
      </TiltCard>
      <span className="sr-only">Ver ficha técnica de {project.title}</span>
    </Link>
  )
}