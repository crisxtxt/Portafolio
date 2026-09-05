import { motion } from 'framer-motion'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  image?: string
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-36 text-paper md:px-12 md:pb-32 md:pt-44">
      <div className="grain absolute inset-0 opacity-40" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-clay/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-clay"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-5xl font-medium leading-[1.05] text-balance md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg"
        >
          {description}
        </motion.p>
        {image ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            src={image}
            alt=""
            className="mt-14 aspect-[16/7] w-full rounded-3xl object-cover shadow-card"
          />
        ) : null}
      </div>
    </section>
  )
}