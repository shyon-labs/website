import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { technologies } from '../../data/technologies'

const ease = [0.16, 1, 0.3, 1] as any

const categoryColors: Record<string, string> = {
  Frontend: '#61DAFB',
  Mobile: '#54C5F8',
  Backend: '#68A063',
  'AI / Data': '#FFB86C',
  Database: '#F87171',
  Platform: '#FB923C',
}

const orderedCategories = ['Frontend', 'Mobile', 'Backend', 'AI / Data', 'Database', 'Platform']

export default function Technologies() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const categoryMenuRef = useRef<HTMLDivElement>(null)

  const filteredTechs = activeCategory
    ? technologies.filter(t => t.category === activeCategory)
    : []

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <section id="technologies" className="relative z-10 py-12 md:py-20" aria-label="Technologies">
      <div className="container-xl mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-px w-10 bg-accent" />
              <span className="label-sm">Our stack</span>
            </motion.div>
            <motion.h2
              className="text-section font-bold tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Technology Ecosystem
            </motion.h2>
          </div>
          <motion.p
            className="text-text-muted text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Modern frameworks and tools chosen for speed, scalability, and long-term product reliability.
          </motion.p>
        </div>

        {/* Category dropdown */}
        <div ref={categoryMenuRef} className="relative mt-6 w-full max-w-sm">
          <label htmlFor="technology-category" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-dim">
            Browse by category
          </label>
          <div className="relative">
            <button
              id="technology-category"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isCategoryMenuOpen}
              onClick={() => setIsCategoryMenuOpen(prev => !prev)}
              className={`flex w-full items-center justify-between rounded-xl border bg-surface px-4 py-3 text-left text-sm font-semibold outline-none transition-colors duration-300 ${
                isCategoryMenuOpen ? 'border-accent' : 'border-border hover:border-border-light'
              }`}
            >
              <span className={activeCategory ? 'text-text-primary' : 'text-text-muted'}>
                {activeCategory ?? 'Select a category'}
              </span>
              <motion.span animate={{ rotate: isCategoryMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} aria-hidden="true" className="text-accent" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Technology categories"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease }}
                  className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/30"
                >
                  {orderedCategories.map(category => (
                    <button
                      key={category}
                      type="button"
                      role="option"
                      aria-selected={activeCategory === category}
                      onClick={() => {
                        setActiveCategory(category)
                        setIsCategoryMenuOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        activeCategory === category
                          ? 'bg-accent-dim text-accent'
                          : 'text-text-muted hover:bg-surface-2 hover:text-text-primary'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-[10px] font-mono text-text-dim">
                        {technologies.filter(tech => tech.category === category).length}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="container-xl">
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              layout
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              role="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {filteredTechs.map((tech, i) => {
                const color = categoryColors[tech.category] || 'var(--color-accent)'
                const isHovered = hovered === tech.name
                return (
                  <motion.div
                    layout
                    key={tech.name}
                    role="listitem"
                    className="hover-lift relative cursor-default rounded-xl border border-border bg-surface/50 p-4 md:p-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                    onHoverStart={() => setHovered(tech.name)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ borderColor: `${color}60`, backgroundColor: `${color}0D` }}
                  >
                    <div className="mb-3 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    <p className="text-sm font-semibold transition-colors duration-300" style={{ color: isHovered ? color : 'var(--color-text)' }}>
                      {tech.name}
                    </p>
                    <p className="mt-0.5 text-[11px] font-mono text-text-dim">{tech.category}</p>
                    <p className="mt-2 text-xs leading-tight text-text-muted">{tech.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}
