import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { technologies } from '../../data/technologies'

const ease = [0.16, 1, 0.3, 1] as any

const categoryColors: Record<string, string> = {
  Frontend: '#61DAFB',
  Mobile: '#54C5F8',
  Backend: '#68A063',
  'AI / Data': '#FFB86C',
  Language: '#A78BFA',
  Database: '#F87171',
  Platform: '#FB923C',
  Intelligence: '#E8FF8B',
}

const categories = ['All', 'Frontend', 'Mobile', 'Backend', 'AI / Data', 'Database']

export default function Technologies() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredTechs = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(t => t.category.includes(activeCategory) || t.category === activeCategory)

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

        {/* Category Pill Filters (smart UX for Mobile & Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
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

      {/* Grid */}
      <div className="container-xl">
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
                  <p className="text-text-muted text-xs mt-2 leading-tight hidden md:block">{tech.description}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scrolling Marquee */}
      <div className="mt-12 md:mt-16 border-t border-b border-border py-4 overflow-hidden">
        <div className="flex gap-0">
          <motion.div
            className="flex gap-0 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
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
