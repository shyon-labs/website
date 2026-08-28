import { motion } from 'framer-motion'
import { Mail, Briefcase, Clock, MapPin, DollarSign } from 'lucide-react'
import { opportunities } from '../../data/opportunities'

const ease = [0.16, 1, 0.3, 1] as any

export default function Opportunities() {
  return (
    <section className="py-16 md:py-28 overflow-hidden" aria-label="Opportunities at ShyonLabs">
      <div className="container-xl">
        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-2xl">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-10 bg-accent" />
            <span className="label-sm">Careers at ShyonLabs</span>
          </motion.div>
          <motion.h2
            className="text-section font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            Open Opportunities
          </motion.h2>
          <motion.p
            className="text-text-muted text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are looking for dedicated talent to join us in marketing and scaling our independent software & AI products.
          </motion.p>
        </div>

        {/* Job Card — Fully Mobile Responsive */}
        <div className="space-y-6">
          {opportunities.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              className="p-5 sm:p-8 md:p-10 rounded-2xl border border-border bg-surface w-full overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-accent-dim text-accent border border-accent/20">
                      Open Position
                    </span>
                    <span className="text-text-dim text-xs font-mono">{job.type}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                    {job.title}
                  </h3>
                </div>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {job.description}
              </p>

              {/* Meta tags — Mobile wrap */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-border mb-6">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Briefcase size={14} className="text-accent shrink-0" />
                  <span className="truncate">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Clock size={14} className="text-accent shrink-0" />
                  <span className="truncate">Exp: {job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <DollarSign size={14} className="text-accent shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
              </div>

              {/* Requirements & Responsibilities */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile-friendly application instructions */}
              <div className="p-4 sm:p-5 rounded-xl border border-border bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-text-primary mb-1">How to Apply</h5>
                  <p className="text-text-muted text-xs">
                    Send your CV, portfolio, or past work samples to our primary email.
                  </p>
                </div>
                <a
                  href="mailto:shyonlabs@gmail.com?subject=Application for Social Media Marketing Specialist"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-background font-bold text-xs rounded-full hover:bg-white transition-colors duration-300 shrink-0"
                >
                  <Mail size={13} />
                  shyonlabs@gmail.com
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
