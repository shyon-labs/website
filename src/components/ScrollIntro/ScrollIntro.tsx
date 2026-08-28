import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const words = "We don't just write code. We build products people actually want to use.".split(' ')

function AnimatedWord({
  word,
  index,
  scrollYProgress,
}: {
  word: string
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / words.length
  const end = (index + 1) / words.length
  const opacity = useTransform(scrollYProgress, [start * 0.5, end * 0.5 + 0.2], [0.1, 1])
  const y = useTransform(scrollYProgress, [start * 0.5, end * 0.5 + 0.2], [18, 0])
  const isAccent = word === 'products' || word === 'use.'

  return (
    <motion.span
      className="inline-block mr-[0.2em]"
      style={{ opacity, y }}
      aria-hidden="true"
    >
      {isAccent ? <span className="text-accent">{word}</span> : word}
    </motion.span>
  )
}

export default function ScrollIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-36 overflow-hidden"
      aria-label="Introduction statement"
    >
      <div className="container-xl">
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px w-10 bg-accent" />
          <span className="label-sm">Our philosophy</span>
        </motion.div>

        <p
          className="text-section font-bold leading-tight tracking-tight max-w-5xl"
          aria-label="We don't just write code. We build products people actually want to use."
        >
          {words.map((word, i) => (
            <AnimatedWord key={i} word={word} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </p>

        <motion.div
          className="mt-12 h-px bg-border"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as any, delay: 0.3 }}
        />
      </div>

      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </section>
  )
}
