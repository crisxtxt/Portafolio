import type { ArchitectProfile } from '../../shared/types/portfolio'

export const architectProfile: ArchitectProfile = {
  id: 'ARQ-001',
  fullName: 'Cristina Vargas',
  title: 'Fundadora y Directora de Diseño',
  bio: 'Más de 16 años diseñando obra construida entre la montaña y la ciudad. Cristina ha liderado 40+ proyectos desde la factibilidad hasta la entrega, con una convicción: la arquitectura debe envejecer bien y explicarse sola.',
  philosophy:
    'Creemos en una arquitectura de baja voz: materiales honestos, estructura expuesta y luz medida. No diseñamos edificios; diseñamos condiciones para que la vida se asiente. Cada obra se evalúa por su huella de carbono, su relación con el sitio y la manera en que aloja el tiempo de quien la habita.',
  portrait: '/images/portrait-cristina.svg',
  yearsExperience: 16,
  education: [
    'Arquitectura — UAM Azcapotzalco, CDMX',
    'Maestría en Diseño Sostenible — Politécnico de Milán',
    'Diplomado en Construcción en Madera — Universidad de Chalmers',
  ],
  recognitions: [
    {
      id: 'R-001',
      title: 'Premio Hábitat al Proyecto Rehabilitado',
      issuer: 'Arquine',
      year: 2024,
      description: 'Reconocimiento por el Loft Montañez y la reutilización adaptativa de la nave industrial de 1948.',
    },
    {
      id: 'R-002',
      title: 'Mérito al Paisaje Urbano',
      issuer: 'Secretaría de Medio Ambiente',
      year: 2023,
      description: 'Por el Jardín del Lago y su sistema de jardines de lluvia de borde lacustre.',
    },
    {
      id: 'R-003',
      title: 'Bienal de Arquitectura — Mención',
      issuer: 'Colegio de Arquitectos',
      year: 2021,
      description: 'Villa Pazo destacada en la categoría de vivienda vertical e integración topográfica.',
    },
  ],
  team: [
    {
      id: 'T-001',
      name: 'Diego Herrera',
      role: 'Socio · Arquitecto',
      discipline: 'Estructuras y envolventes',
      bio: 'Especialista en fachadas de doble piel y su relación con el clima. Lidera Torre Aurora.',
      image: '/images/portrait-2.svg',
    },
    {
      id: 'T-002',
      name: 'Daniela Ortiz',
      role: 'Arquitecta de proyectos',
      discipline: 'Interiores y reutilización',
      bio: 'Responsable de las intervenciones reversibles y el mobiliario adosado del estudio.',
      image: '/images/portrait-3.svg',
    },
    {
      id: 'T-003',
      name: 'Pablo Núñez',
      role: 'Ingeniero estructural',
      discipline: 'Concreto y madera',
      bio: '16 años calculando estructuras de concreto aparente y sistemas CLT. Acompaña los prototipos.',
      image: '/images/portrait-4.svg',
    },
    {
      id: 'T-004',
      name: 'Fernanda Ruiz',
      role: 'Diseñadora de paisaje',
      discipline: 'Paisajismo y jardines de lluvia',
      bio: 'Dirige la línea de paisajismo del estudio: botánica nativa e infraestructura verde.',
      image: '/images/portrait-2.svg',
    },
  ],
}