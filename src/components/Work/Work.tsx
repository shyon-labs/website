import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../../data/projects'
import ProjectVisual from './ProjectVisual'

const ease = [0.16, 1, 0.3, 1] as any

export default function Work() {
  return (
    <section id="work" className="py-20 md:py-32" aria-label="Upcoming projects">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-4">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-px w-10 bg-accent" />
              <span className="label-sm">What we're building</span>
            </motion.div>
            <motion.h2
              className="text-section font-bold tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Upcoming Projects
            </motion.h2>
          </div>
          <motion.p
            className="text-text-muted text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Products currently in development — launching soon.
          </motion.p>
        </div>

        {/* Project panels */}
        <div className="space-y-4 md:space-y-6" role="list">
          {projects.map((project, i) => (
            <ProjectPanel key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectPanel({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <motion.div
      ref={ref}
      role="listitem"
      className="relative rounded-2xl overflow-hidden border border-border"
      style={{ backgroundColor: project.bgAccent }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay: index * 0.05, ease }}
    >
      {/* "Upcoming" badge */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-border bg-background/60 text-text-muted backdrop-blur-sm">
          Upcoming
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-0 min-h-[380px] md:min-h-[440px]">
        {/* Content */}
        <div className="flex flex-col justify-between p-6 md:p-10 order-2 md:order-1">
          <div>
            <div className="flex items-start justify-between mb-5">
              <span className="font-mono text-xs" style={{ color: project.color, opacity: 0.7 }}>
                {project.number}
              </span>
              <span className="label-sm text-text-dim hidden md:block">{project.category}</span>
            </div>

            {/* Mobile category */}
            <p className="label-sm text-text-dim mb-3 md:hidden">{project.category}</p>

            <h3 className="text-section-sm font-bold tracking-tight mb-3 md:mb-4 text-text-primary">
              {project.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-full border"
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

        {/* Visual */}
        <div className="relative overflow-hidden order-1 md:order-2 min-h-[200px] md:min-h-0">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <ProjectVisual project={project} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
