export type Id = string

export type Category = 'residencial' | 'comercial' | 'paisajismo'

export type ProjectStatus = 'construido' | 'en-construccion' | 'conceptual'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface MaterialSpec {
  id: Id
  name: string
  surface: string
  finish: string
  sustainability: string
}

export interface Milestone {
  id: Id
  date: string
  title: string
  description: string
}

export interface ProjectPhase {
  id: Id
  date: string
  title: string
  status: 'completada' | 'en-curso' | 'pendiente'
}

export interface Project {
  id: Id
  slug: string
  title: string
  location: string
  year: number
  category: Category
  status: ProjectStatus
  areaM2: number
  budget: string
  client: string
  summary: string
  description: string
  heroImage: string
  gallery: string[]
  beforeImage?: string
  afterImage?: string
  hasBlueprintComparison: boolean
  blueprintImage?: string
  features: string[]
  materials: MaterialSpec[]
  milestones: Milestone[]
  phases: ProjectPhase[]
  architects: string[]
  coordinate: GeoPoint
}

export interface Recognition {
  id: Id
  title: string
  issuer: string
  year: number
  description: string
}

export interface TeamMember {
  id: Id
  name: string
  role: string
  discipline: string
  bio: string
  image: string
}

export interface ArchitectProfile {
  id: Id
  fullName: string
  title: string
  bio: string
  philosophy: string
  portrait: string
  yearsExperience: number
  education: string[]
  recognitions: Recognition[]
  team: TeamMember[]
}

export type ConsultationType = 'cotizacion' | 'consultoria' | 'seguimiento-obra'

export interface ConsultationRequest {
  type: ConsultationType
  name: string
  email: string
  phone: string
  category: Category
  areaM2: number
  location: string
  budgetRange: string
  message: string
  preferredDate: string
  preferredTime: string
}

export interface UnitPrice {
  category: Category
  low: number
  high: number
  currency: string
  unit: string
}
