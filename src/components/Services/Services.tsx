import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { services } from '../../data/services'

const ease = [0.16, 1, 0.3, 1] as any

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 md:py-36" aria-label="Services">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-px w-10 bg-accent" />
              <span className="label-sm">What we do</span>
            </motion.div>
            <motion.h2
              className="text-section font-bold tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Services & Capabilities
            </motion.h2>
          </div>
          <motion.p
            className="text-text-muted text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capabilities we leverage to build our products and collaborate with technical partners.
          </motion.p>
        </div>

        {/* Desktop List */}
        <div className="hidden md:block border-t border-border" role="list">
          {services.map((service, i) => {
            const isActive = activeIndex === i
            return (
              <motion.div
                key={service.number}
                role="listitem"
                className="relative border-b border-border cursor-pointer overflow-hidden"
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                animate={{ backgroundColor: isActive ? 'rgba(26,26,26,0.9)' : 'rgba(17,17,17,0)' }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-start gap-8 py-7 px-4">
                  <motion.span
                    className="font-mono text-sm w-10 shrink-0 mt-1"
                    animate={{ color: isActive ? '#E8FF8B' : '#444444' }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.number}
                  </motion.span>

                  <motion.h3
                    className="text-xl font-semibold flex-1 tracking-tight"
                    animate={{ color: isActive ? '#F0F0F0' : '#888888' }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="flex-1 max-w-md"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 text-xs border border-border text-text-muted rounded-full bg-background">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sparkle indicator symbol instead of arrow button */}
                  <motion.div
                    className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center"
                    animate={{
                      borderColor: isActive ? '#E8FF8B' : '#282828',
                      backgroundColor: isActive ? 'rgba(232,255,139,0.12)' : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles
                      size={13}
                      style={{ color: isActive ? '#E8FF8B' : '#444444' }}
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden border-t border-border" role="list">
          {services.map((service, i) => {
            const isOpen = expandedMobile === i
            return (
              <div key={service.number} className="border-b border-border" role="listitem">
                <button
                  id={`service-toggle-${i}`}
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setExpandedMobile(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-content-${i}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-accent">{service.number}</span>
                    <span className="font-semibold text-text-primary text-base">{service.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0"
                  >
                    <Sparkles size={11} className={isOpen ? 'text-accent' : 'text-text-dim'} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`service-content-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pl-8">
                        <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 text-xs border border-border text-text-muted rounded-full bg-surface">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
