import { motion } from 'framer-motion'
import { Target, Compass, Heart } from 'lucide-react'
import founderPhoto from '../../assets/Shayan profile Photo.jpeg'

const ease = [0.16, 1, 0.3, 1] as any

export default function Founder() {
  return (
    <section className="py-16 md:py-28 bg-background border-t border-border overflow-hidden" aria-label="Founder Profile">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px w-10 bg-accent" />
          <span className="label-sm">Leadership & Vision</span>
        </motion.div>

        {/* Hero Founder Story Header — Zero Gap, Prominent Border */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mb-16">
          {/* Left Text */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="label-sm text-accent mb-2 block">Founder's Story</span>
            <h2 className="text-section font-bold tracking-tight text-text-primary mb-5 leading-tight">
              Driven by Passion. <br />
              <span className="text-accent">Engineered with Purpose.</span>
            </h2>
            <p className="text-text-muted text-base md:text-lg leading-relaxed mb-4">
              "ShyonLabs wasn't born out of a desire to build another software business. It was born from a deep conviction that great software should solve real human problems — built with pride, craft, and unwavering dedication to quality."
            </p>
            <p className="text-text-dim text-xs font-mono">— Mr Shayan</p>
          </motion.div>

          {/* Right Founder Photo — Prominent Accent Border, Sits Right Next to Text */}
          <motion.div
            className="shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-accent shadow-2xl bg-surface flex items-center justify-center">
              <img
                src={founderPhoto}
                alt="Mr Shayan - Founder of ShyonLabs"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* Story Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Heart size={18} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">Why ShyonLabs Started</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                I saw a world filled with noisy, over-complicated software that prioritized hype over real utility. I wanted to build a sanctuary for pure engineering craft — an independent studio where every line of code serves a purpose and every product enriches everyday life.
              </p>
            </div>
            <p className="text-text-dim text-xs font-mono pt-4 border-t border-border/60">Craft over Compromise</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Compass size={18} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">The Global Vision</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Our vision is to demonstrate that world-class software, mobile experiences, and practical AI tools can be engineered from Pakistan and adopted by millions globally. We build with international standards of design, speed, and privacy.
              </p>
            </div>
            <p className="text-text-dim text-xs font-mono pt-4 border-t border-border/60">Global Impact from Day One</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Target size={18} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">Unwavering Commitment</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                We measure our success not by vanity metrics, but by the tangible value our products bring to real people. Through continuous iteration, practical AI integration, and disciplined execution, we turn ideas into software people trust.
              </p>
            </div>
            <p className="text-text-dim text-xs font-mono pt-4 border-t border-border/60">Building for Real Value</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
