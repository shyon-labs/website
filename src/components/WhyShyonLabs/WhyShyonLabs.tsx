import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as any

const principles = [
  {
    headline: 'Product-First Engineering.',
    sub: 'We focus on building tools that solve genuine user problems, engineered for long-term real-world impact.',
  },
  {
    headline: 'AI with Practical Purpose.',
    sub: 'Integrating intelligence and machine learning where it actually enhances user workflows — not for hype or buzzwords.',
  },
  {
    headline: 'Clean Architecture, Seamless UX.',
    sub: 'System design and interface quality are inseparable. We refuse to compromise performance or design simplicity.',
  },
  {
    headline: 'Relentless Product Iteration.',
    sub: 'Continuous testing, shipping regular updates, and evolving our software based on real user interactions.',
  },
]

export default function WhyShyonLabs() {
  return (
    <section className="py-20 md:py-32 bg-surface" aria-label="Our Product Principles">
      <div className="container-xl">
        <div className="mb-12 md:mb-16">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-10 bg-accent" />
            <span className="label-sm">Studio philosophy</span>
          </motion.div>
          <motion.h2
            className="text-section font-bold tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            Our Product Principles
          </motion.h2>
        </div>

        <div className="space-y-0 border-t border-border" role="list">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              role="listitem"
              className="grid md:grid-cols-2 gap-4 md:gap-16 py-8 md:py-12 border-b border-border items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.05, duration: 0.8, ease }}
            >
              <div className="flex gap-4 md:gap-6 items-start">
                <span className="font-mono text-xs text-accent mt-1.5 shrink-0 w-6">0{i + 1}</span>
                <h3 className="text-section-sm font-bold tracking-tight text-text-primary">{p.headline}</h3>
              </div>
              <p className="text-text-muted leading-relaxed text-sm md:text-[15px] md:pt-1">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
