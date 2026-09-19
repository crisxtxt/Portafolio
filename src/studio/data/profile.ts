import type { ArchitectProfile } from '../../shared/types/portfolio'

export const architectProfile: ArchitectProfile = {
  id: 'ARQ-001',
  fullName: 'Segundo Suarez',
  title: 'Arquitecto Fundador · Director del Estudio',
  bio: 'Más de 18 años diseñando obra construida entre el mar y la ciudad. Segundo ha liderado 40+ proyectos desde la factibilidad hasta la entrega, con una convicción: la arquitectura debe envejecer bien, resistir el clima y explicarse sola.',
  philosophy:
    'Creemos en una arquitectura de baja voz: materiales honestos, luz medida y viento bien leído. No diseñamos edificios; diseñamos condiciones para que la vida se asiente entre el calor, la brisa y el tiempo de la isla. Cada obra se evalúa por su relación con el sitio, su resistencia al clima y la manera en que aloja a quien la habita.',
  portrait: '/images/portrait-director.svg',
  yearsExperience: 18,
  education: [
    'Arquitectura — Universidad Simón Bolívar, Caracas',
    'Maestría en Diseño Costero y Paisaje — Universidad de Miami',
    'Diplomado en Construcción en Madera y CLT — Centro de Transferencia Tecnológica, Madrid',
  ],
  recognitions: [
    {
      id: 'R-001',
      title: 'Bienal Nacional de Arquitectura — Mención Hábitat Colectivo',
      issuer: 'Colegio de Arquitectos de Venezuela',
      year: 2024,
      description: 'Reconocimiento por el Paseo La Asunción y su integración del programa comercial con el espacio público.',
    },
    {
      id: 'R-002',
      title: 'Premio Latinoamericano de Paisaje',
      issuer: 'Fundación Espacios',
      year: 2023,
      description: 'Por el Malecón de Pampatar y su sistema de paseo costero, vegetación xerófila y bordes de agua.',
    },
    {
      id: 'R-003',
      title: 'Distinción a la Vivienda Costera',
      issuer: 'Consejo de Desarrollo de Margarita',
      year: 2021,
      description: 'Casa Playa El Ángel destacada por su desempeño térmico pasivo y su relación directa con la playa.',
    },
  ],
  team: [
    {
      id: 'T-001',
      name: 'Ramón Salazar',
      role: 'Socio · Arquitecto',
      discipline: 'Estructuras y envolventes',
      bio: 'Especialista en fachadas de doble piel y resistencia al clima costero. Lidera el Paseo La Asunción.',
      image: '/images/portrait-2.svg',
    },
    {
      id: 'T-002',
      name: 'Valentina Rojas',
      role: 'Arquitecta de proyectos',
      discipline: 'Interiores y reutilización',
      bio: 'Responsable de las intervenciones reversibles y del mobiliario adosado del estudio.',
      image: '/images/portrait-3.svg',
    },
    {
      id: 'T-003',
      name: 'Héctor Paredes',
      role: 'Ingeniero estructural',
      discipline: 'Concreto, madera y sismicidad',
      bio: '14 años calculando estructuras en ambiente salino y suelo insular. Acompaña los prototipos costeros.',
      image: '/images/portrait-4.svg',
    },
    {
      id: 'T-004',
      name: 'Camila Andrade',
      role: 'Diseñadora de paisaje',
      discipline: 'Paisajismo xerófilo y bordes de agua',
      bio: 'Dirige la línea de paisajismo del estudio: botánica nativa, sombra y manejo del agua de lluvia.',
      image: '/images/portrait-2.svg',
    },
  ],
}