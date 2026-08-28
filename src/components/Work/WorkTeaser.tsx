import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import ProjectVisual from './ProjectVisual'

const ease = [0.16, 1, 0.3, 1] as any

export default function WorkTeaser() {
  // Show first 2 projects as high-impact trailer
  const teaserProjects = projects.slice(0, 2)

  return (
    <section id="work" className="py-20 md:py-32" aria-label="Upcoming Products Trailer">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-4">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-px w-10 bg-accent" />
              <span className="label-sm">Product Pipeline Preview</span>
            </motion.div>
            <motion.h2
              className="text-section font-bold tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Upcoming Products
            </motion.h2>
          </div>
          <motion.p
            className="text-text-muted text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A preview of software and AI applications currently in development.
          </motion.p>
        </div>

        {/* 2 Featured Teaser Panels */}
        <div className="space-y-6" role="list">
          {teaserProjects.map((project, i) => (
            <TeaserPanel key={project.number} project={project} index={i} />
          ))}
        </div>

        {/* Teaser CTA Button -> Navigates to full /products section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-surface border border-border hover:border-accent text-text-primary hover:text-accent font-bold text-sm rounded-full transition-all duration-300 group"
          >
            Explore All Upcoming Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function TeaserPanel({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <motion.div
      ref={ref}
      role="listitem"
      className="relative rounded-2xl overflow-hidden border border-border"
      style={{ backgroundColor: project.bgAccent }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay: index * 0.05, ease }}
    >
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-border bg-background/60 text-text-muted backdrop-blur-sm">
          Upcoming
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-0 min-h-[360px] md:min-h-[420px]">
        <div className="flex flex-col justify-between p-6 md:p-10 order-2 md:order-1">
          <div>
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-xs" style={{ color: project.color, opacity: 0.7 }}>
                {project.number}
              </span>
              <span className="label-sm text-text-dim hidden md:block">{project.category}</span>
            </div>

            <p className="label-sm text-text-dim mb-2 md:hidden">{project.category}</p>

            <h3 className="text-section-sm font-bold tracking-tight mb-3 text-text-primary">
              {project.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-full border"
                  style={{
                    borderColor: `${project.color}28`,
                    color: project.color,
                    backgroundColor: `${project.color}0A`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden order-1 md:order-2 min-h-[180px] md:min-h-0">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <ProjectVisual project={project} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
