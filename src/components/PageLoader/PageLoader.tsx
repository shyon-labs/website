import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [phase, setPhase] = useState<'counting' | 'done'>('counting')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('done'), 400)
          return 100
        }
        return Math.min(100, c + Math.floor(Math.random() * 15) + 5)
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-start justify-end p-[clamp(1.5rem,5vw,5rem)] pointer-events-none"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
          }}
        >
          <div className="absolute top-[clamp(1.5rem,5vw,5rem)] left-[clamp(1.5rem,5vw,5rem)]">
            <motion.p
              className="font-bold text-sm tracking-[0.15em] uppercase text-text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              SHYONLABS
            </motion.p>
          </div>

          <div className="flex items-end gap-4">
            <motion.span
              className="font-bold tracking-tighter text-text-primary"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', lineHeight: 1 }}
            >
              {Math.min(count, 100)}
            </motion.span>
            <span className="text-text-muted text-2xl mb-2">%</span>
          </div>

          <div className="w-full h-px bg-border mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${Math.min(count, 100)}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
