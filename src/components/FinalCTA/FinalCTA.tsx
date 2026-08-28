import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

const ease = [0.16, 1, 0.3, 1] as any

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1])

  return (
    <section ref={ref} id="contact" className="relative py-24 md:py-44 overflow-hidden" aria-label="Contact">
      {/* Blob */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: bgScale }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,255,139,0.04) 0%, rgba(124,58,237,0.035) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-border"
            style={{
              width: `${i * 200}px`,
              height: `${i * 200}px`,
              top: `${-(i * 100)}px`,
              left: `${-(i * 100)}px`,
            }}
            animate={{ opacity: [0.25, 0.06, 0.25], scale: [1, 1.015, 1] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          />
        ))}
      </div>

      <div className="container-xl relative z-10 text-center px-4">
        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span className="label-sm">Get in touch</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-display font-bold tracking-tighter mb-5 md:mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease }}
        >
          Have an idea or
          <br />
          <span className="text-accent">suggestion?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-text-muted text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          Feel free to reach us directly on LinkedIn or email — we respond to all feedback and opportunities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {/* LinkedIn DM */}
          <MagneticButton
            as="a"
            href="https://www.linkedin.com/company/shyon-labs"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#0077B5] text-white font-bold text-sm rounded-full hover:bg-[#006399] transition-colors duration-300 group"
            strength={0.35}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Message on LinkedIn
          </MagneticButton>

          {/* Email */}
          <MagneticButton
            as="a"
            href="mailto:shyonlabs@gmail.com"
            className="inline-flex items-center gap-2.5 px-7 py-4 border border-border text-text-primary font-medium text-sm rounded-full hover:border-border-light hover:bg-surface transition-all duration-300"
            strength={0.3}
          >
            <Mail size={15} className="text-accent" />
            shyonlabs@gmail.com
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
