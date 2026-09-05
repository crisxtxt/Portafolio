import { useState } from 'react'
import type { FormEvent } from 'react'
import { PageHero } from '../shared/components/PageHero'
import { Section } from '../shared/components/Section'
import { Reveal } from '../shared/components/Reveal'
import { Icon } from '../shared/components/Icon'
import type { IconName } from '../shared/components/Icon'
import { BudgetEstimator } from './components/BudgetEstimator'
import { budgetRanges } from './pricing'
import type { Category, ConsultationType } from '../shared/types/portfolio'

interface FormState {
  type: ConsultationType
  name: string
  email: string
  phone: string
  category: Category
  areaM2: string
  location: string
  budgetRange: string
  message: string
  preferredDate: string
  preferredTime: string
}

const initialForm: FormState = {
  type: 'cotizacion',
  name: '',
  email: '',
  phone: '',
  category: 'residencial',
  areaM2: '',
  location: '',
  budgetRange: budgetRanges[1],
  message: '',
  preferredDate: '',
  preferredTime: '10:00',
}

const consultationTypes: { value: ConsultationType; label: string; icon: IconName }[] = [
  { value: 'cotizacion', label: 'Cotización de obra', icon: 'ruler' },
  { value: 'consultoria', label: 'Consultoría de diseño', icon: 'compass' },
  { value: 'seguimiento-obra', label: 'Seguimiento de obra', icon: 'building' },
]

const inputStyles =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors duration-300 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20'

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('El nombre y el correo son obligatorios para responder tu solicitud.')
      return
    }
    setError(null)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pb-0">
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu obra"
        description="Solicita una cotización por metros cuadrados, agenda una consultoría o da seguimiento a una obra en curso. Respondemos en 48 horas."
      />

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BudgetEstimator />

            <Reveal delay={0.15} className="mt-6">
              <div className="space-y-4 rounded-3xl border border-line bg-paper-deep p-8">
                <a href="mailto:estudio@cristinavargas.arq" className="group flex items-center gap-4 text-ink">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper transition-colors group-hover:bg-clay">
                    <Icon name="mail" size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-soft">Correo</p>
                    <p className="text-sm font-medium">estudio@cristinavargas.arq</p>
                  </div>
                </a>
                <a href="tel:+525512345678" className="group flex items-center gap-4 text-ink">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper transition-colors group-hover:bg-clay">
                    <Icon name="phone" size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-soft">Teléfono</p>
                    <p className="text-sm font-medium">+52 55 1234 5678</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-ink">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper">
                    <Icon name="clock" size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-soft">Horario de estudio</p>
                    <p className="text-sm font-medium">Lun – Vie · 9:00 a 18:00</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <Reveal className="flex h-full flex-col items-center justify-center rounded-3xl bg-ink p-14 text-center text-paper">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay text-paper">
                  <Icon name="check" size={28} />
                </span>
                <h2 className="mt-6 font-display text-4xl text-paper">Solicitud recibida</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
                  Gracias, {form.name.split(' ')[0]}. Tu {consultationTypes.find((t) => t.value === form.type)?.label.toLowerCase()} fue
                  registrada con folio de referencia. Te contactaremos a {form.email} en el transcurso de 48 horas hábiles.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm)
                    setSubmitted(false)
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm text-paper transition-all hover:border-clay hover:text-clay"
                >
                  Nueva solicitud
                  <Icon name="arrow-right" size={16} />
                </button>
              </Reveal>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-line bg-paper-deep p-8 md:p-10"
                noValidate
              >
                <h2 className="font-display text-3xl text-ink">Solicitar consultoría</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Comparte los datos de tu suelo o proyecto y definiremos los siguientes pasos.
                </p>

                <fieldset className="mt-8">
                  <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-clay">Tipo de solicitud</legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {consultationTypes.map((type) => {
                      const active = form.type === type.value
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => update('type', type.value)}
                          className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                            active
                              ? 'border-clay bg-clay/10 text-ink'
                              : 'border-line bg-paper text-ink-soft hover:border-clay/40'
                          }`}
                        >
                          <Icon name={type.icon} size={18} className={active ? 'text-clay' : ''} />
                          {type.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="name">
                      Nombre completo *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(event) => update('name', event.target.value)}
                      placeholder="Ana Sofía Martínez"
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="email">
                      Correo electrónico *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => update('email', event.target.value)}
                      placeholder="ana@correo.com"
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="phone">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      placeholder="+52 55 0000 0000"
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="location">
                      Ubicación del suelo o proyecto
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={form.location}
                      onChange={(event) => update('location', event.target.value)}
                      placeholder="Valle de Bravo, Estado de México"
                      className={inputStyles}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="category">
                      Categoría
                    </label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(event) => update('category', event.target.value as Category)}
                      className={inputStyles}
                    >
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="paisajismo">Paisajismo</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="areaM2">
                      Superficie (m²)
                    </label>
                    <input
                      id="areaM2"
                      type="number"
                      min={1}
                      value={form.areaM2}
                      onChange={(event) => update('areaM2', event.target.value)}
                      placeholder="e.g. 340"
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="budgetRange">
                      Rango de presupuesto
                    </label>
                    <select
                      id="budgetRange"
                      value={form.budgetRange}
                      onChange={(event) => update('budgetRange', event.target.value)}
                      className={inputStyles}
                    >
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="preferredDate">
                      Fecha preferida
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      value={form.preferredDate}
                      onChange={(event) => update('preferredDate', event.target.value)}
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="preferredTime">
                      Hora preferida
                    </label>
                    <select
                      id="preferredTime"
                      value={form.preferredTime}
                      onChange={(event) => update('preferredTime', event.target.value)}
                      className={inputStyles}
                    >
                      {['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00'].map((time) => (
                        <option key={time} value={time}>
                          {time} hrs
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-clay" htmlFor="message">
                    Cuéntanos sobre tu obra
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => update('message', event.target.value)}
                    placeholder="Terreno, programa deseado, plazos, restricciones del sitio…"
                    className={`${inputStyles} resize-none`}
                  />
                </div>

                {error ? (
                  <p className="mt-5 rounded-xl border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay-dark">{error}</p>
                ) : null}

                <button
                  type="submit"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-all duration-300 hover:bg-clay sm:w-auto"
                >
                  Enviar solicitud
                  <Icon name="arrow-right" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-4 text-[11px] text-ink-soft/70">
                  Al enviar aceptas que el estudio use tus datos exclusivamente para responder tu solicitud.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Section eyebrow="Agendamiento" title="¿No es el momento de construir?" subtitle="Programa una consultoría de diseño para ordenar tu proyecto antes de invertir en obra." className="pt-0">
        <div className="mt-10 flex flex-wrap gap-4">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper-deep px-6 py-5">
              <Icon name="calendar" size={22} className="text-clay" />
              <div>
                <p className="text-sm font-semibold text-ink">Consultoría de 60 min</p>
                <p className="text-xs text-ink-soft">Videollamada o visita al terreno</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper-deep px-6 py-5">
              <Icon name="sparkles" size={22} className="text-clay" />
              <div>
                <p className="text-sm font-semibold text-ink">Reporte de factibilidad</p>
                <p className="text-xs text-ink-soft">Entregable con recomendaciones y fases</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper-deep px-6 py-5">
              <Icon name="clock" size={22} className="text-clay" />
              <div>
                <p className="text-sm font-semibold text-ink">Respuesta en 48 h</p>
                <p className="text-xs text-ink-soft">Confirmación del primer contacto</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  )
}