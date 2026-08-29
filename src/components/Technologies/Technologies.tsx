import { useState } from 'react'
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

const categoryEmojis: Record<string, string> = {
  Frontend: '🎨',
  Mobile: '📱',
  Backend: '⚙️',
  'AI / Data': '🤖',
  Database: '🗄️',
  Platform: '☁️',
}

const orderedCategories = ['Frontend', 'Mobile', 'Backend', 'AI / Data', 'Database', 'Platform']
const desktopPills = ['All', ...orderedCategories]

export default function Technologies() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  // Mobile accordion — track which categories are open (start with first open)
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['Frontend']))

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const filteredTechs = activeCategory === 'All'
    ? technologies
    : technologies.filter(t => t.category === activeCategory)

  return (
    <section id="technologies" className="py-20 md:py-36 overflow-hidden" aria-label="Technologies">
      <div className="container-xl mb-10 md:mb-16">
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

        {/* ── Desktop: Pill Filters ── */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2 mt-8 no-scrollbar scroll-smooth">
          {desktopPills.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-background scale-105'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary hover:border-border-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: Tech Grid ── */}
      <div className="container-xl hidden md:block">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" role="list">
          <AnimatePresence>
            {filteredTechs.map((tech, i) => {
              const color = categoryColors[tech.category] || '#E8FF8B'
              const isHovered = hovered === tech.name
              return (
                <motion.div
                  layout
                  key={tech.name}
                  role="listitem"
                  className="relative p-4 md:p-5 rounded-xl border border-border cursor-default bg-surface/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  onHoverStart={() => setHovered(tech.name)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ borderColor: `${color}60`, backgroundColor: `${color}0D` }}
                >
                  <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: color }} />
                  <p className="font-semibold text-sm transition-colors duration-300" style={{ color: isHovered ? color : '#F0F0F0' }}>
                    {tech.name}
                  </p>
                  <p className="text-text-dim text-[11px] mt-0.5 font-mono">{tech.category}</p>
                  <p className="text-text-muted text-xs mt-2 leading-tight">{tech.description}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Mobile: Accordion ── */}
      <div className="md:hidden container-xl space-y-3 mt-8">
        {orderedCategories.map((cat, catIndex) => {
          const color = categoryColors[cat] || '#E8FF8B'
          const isOpen = openCategories.has(cat)
          const techs = technologies.filter(t => t.category === cat)

          return (
            <motion.div
              key={cat}
              className="rounded-2xl border border-border overflow-hidden bg-surface/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08, duration: 0.5, ease }}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-5 py-4 text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{categoryEmojis[cat]}</span>
                  <div>
                    <span
                      className="font-bold text-base tracking-tight transition-colors duration-300"
                      style={{ color: isOpen ? color : '#F0F0F0' }}
                    >
                      {cat}
                    </span>
                    <span className="ml-3 text-xs font-mono text-text-dim">
                      {techs.length} tools
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <ChevronDown
                    size={18}
                    className="transition-colors duration-300"
                    style={{ color: isOpen ? color : '#666' }}
                  />
                </motion.div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="px-4 pb-4 grid grid-cols-2 gap-2 border-t"
                      style={{ borderColor: `${color}25` }}
                    >
                      {techs.map((tech, i) => (
                        <motion.div
                          key={tech.name}
                          className="p-3 rounded-xl border bg-surface/60"
                          style={{ borderColor: `${color}30` }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ backgroundColor: color }} />
                          <p className="font-semibold text-xs text-text-primary leading-tight">{tech.name}</p>
                          <p className="text-text-dim text-[10px] mt-1 leading-snug">{tech.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Scrolling Marquee */}
      <div className="mt-12 md:mt-16 border-t border-b border-border py-4 overflow-hidden">
        <div className="flex gap-0">
          <motion.div
            className="flex gap-0 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...technologies, ...technologies].map((tech, i) => (
              <span key={i} className="flex-shrink-0 px-6 text-xs font-mono text-text-dim border-r border-border py-1.5 whitespace-nowrap">
                {tech.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

