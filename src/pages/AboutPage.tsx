import { motion } from 'framer-motion'
import About from '../components/About/About'

const ease = [0.16, 1, 0.3, 1] as any

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-16 md:pt-20"
    >
      <About />
    </motion.div>
  )
}
