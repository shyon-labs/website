import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '../../data/process'

const ease = [0.16, 1, 0.3, 1] as any

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id="process" className="py-24 md:py-36 overflow-hidden" aria-label="Our process">
      <div className="container-xl">
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-12 bg-accent" />
            <span className="label-sm">How we work</span>
          </motion.div>
          <motion.h2
            className="text-section font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            Our Process
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="absolute left-[19px] md:left-[23px] top-0 w-px bg-accent origin-top"
            style={{ scaleY, height: '100%' }}
          />

          <div className="space-y-0">
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                className="flex gap-8 md:gap-16 pb-16 last:pb-0 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.1, duration: 0.8, ease }}
              >
                <div className="relative shrink-0 mt-1">
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 bg-background flex items-center justify-center z-10 relative"
                    initial={{ borderColor: '#1F1F1F' }}
                    whileInView={{ borderColor: '#E8FF8B' }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="font-mono text-xs text-accent">{step.number}</span>
                  </motion.div>
                </div>

                <div className="flex-1 max-w-xl">
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-text-primary">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
