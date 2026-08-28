import { motion } from 'framer-motion'
import TextReveal from '../ui/TextReveal'

const ease = [0.16, 1, 0.3, 1] as any

const stats = [
  { value: '4+', label: 'Products in pipeline', desc: 'Software & AI apps in active development' },
  { value: '2026', label: 'Established', desc: 'Founded with a global product studio vision' },
  { value: '100%', label: 'Independent Ownership', desc: 'Self-driven product decisions and engineering' },
]

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface relative overflow-hidden" aria-label="About ShyonLabs">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.06) 0%, transparent 60%)' }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-10 bg-accent" />
            <span className="label-sm">About ShyonLabs</span>
          </motion.div>

          <h2 className="text-section font-bold tracking-tight leading-tight">
            <TextReveal text="Independent." className="inline-block mr-3" delay={0} />
            <TextReveal text="Product-Focused." className="inline-block text-accent" delay={0.12} />
          </h2>
        </div>

        {/* Row 1: Full-width Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease }}
              className="p-5 md:p-6 rounded-2xl border border-border bg-background/80 flex flex-col justify-between"
            >
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-accent mb-2">{stat.value}</p>
              <div>
                <p className="text-text-primary text-sm font-semibold mb-1">{stat.label}</p>
                <p className="text-text-dim text-xs leading-relaxed">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: 2 Equal-Height Balanced Story & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-background/80 flex flex-col justify-between"
          >
            <div>
              <span className="label-sm text-accent mb-3 block">01 / Our Focus</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">Building Software for Everyday People</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                ShyonLabs is an independent software and AI product studio. We turn ideas into real, functional products — designing, developing, testing, launching, and continuously improving our own websites, mobile applications, AI tools, and digital platforms.
              </p>
            </div>
            <div className="pt-4 border-t border-border/60">
              <p className="text-text-dim text-xs font-mono">Product Engineering · Artificial Intelligence · Mobile</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-background/80 flex flex-col justify-between"
          >
            <div>
              <span className="label-sm text-accent mb-3 block">02 / Our Mission</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">Technology That Solves Real Problems</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Our goal is simple: build useful technology that solves real problems, reaches real users, and creates meaningful value around the world. Every application in our studio undergoes rigorous design and engineering built to scale.
              </p>
            </div>
            <div className="pt-4 border-t border-border/60">
              <p className="text-text-dim text-xs font-mono">Based in Pakistan · Serving Users Globally</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
