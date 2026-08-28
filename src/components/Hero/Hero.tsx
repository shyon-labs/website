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

      <div className="container-xl relative z-10 pt-28 pb-24">
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
            className="inline-flex items-center gap-2.5 px-6 py-3.5 md:px-7 md:py-4 bg-accent text-background font-bold text-sm rounded-full hover:bg-white transition-colors duration-300 group"
            onClick={scrollToContact}
          >
            Contact us
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href="/work"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 md:px-7 md:py-4 border border-border text-text-primary font-medium text-sm rounded-full hover:border-border-light hover:bg-surface transition-all duration-300"
          >
            See upcoming work
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
