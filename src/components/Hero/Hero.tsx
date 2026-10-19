import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroCanvas from './HeroCanvas'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.16, 1, 0.3, 1] as any

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
}

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 1.0, ease } },
}

export default function Hero() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = 'mailto:mxtrshayan@gmail.com'
  }

  const headlineWords = ['Building', 'Better', 'Digital', 'Experiences.']

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <HeroCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <motion.div
        className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{ x: [0, -28, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-accent shadow-[0_0_30px_8px_rgba(232,255,139,0.35)] pointer-events-none"
        animate={{ y: [0, -18, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[13%] top-[17%] hidden h-36 w-36 rounded-full border border-accent/20 md:block pointer-events-none"
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_4px_var(--color-accent-dim)]" />
      </motion.div>

      <div className="container-xl relative z-10 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.48em' }}
          transition={{ duration: 1.1, delay: 0.05, ease }}
          className="mb-6 text-[clamp(1.1rem,2.5vw,2.25rem)] font-semibold uppercase text-accent"
          aria-label="ShyonLabs"
        >
          SHYONLABS
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow flex-shrink-0" />
          <span className="label-sm">Independent Software & AI Studio — Est. 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-display text-text-primary leading-none tracking-tighter mb-6 md:mb-8"
          aria-label="Building Better Digital Experiences."
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
              <motion.span variants={wordVariants} className="inline-block">
                {word === 'Experiences.' ? <span className="text-accent">{word}</span> : word}
              </motion.span>
              {i < headlineWords.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="mb-7 h-px w-24 origin-left bg-accent/70"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.02, ease }}
        />

        {/* Sub */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
          className="max-w-xl mb-10 md:mb-12"
        >
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            ShyonLabs is an independent software and AI product studio creating useful digital products,
            applications, and intelligent tools for people around the world.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <MagneticButton
            className="inline-flex items-center gap-2.5 px-6 py-3.5 md:px-7 md:py-4 bg-accent text-background font-bold text-sm rounded-full hover:bg-surface hover:text-accent transition-colors duration-300 group"
            onClick={scrollToContact}
          >
            Contact us
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </MagneticButton>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden md:flex absolute bottom-10 left-[clamp(1.25rem,5vw,5rem)] items-center gap-3"
        >
          <div className="relative w-px h-14 bg-border overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-accent"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="label-sm">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
