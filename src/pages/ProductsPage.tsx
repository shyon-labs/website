import { motion } from 'framer-motion'
import Work from '../components/Work/Work'

const ease = [0.16, 1, 0.3, 1] as any

export default function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-16 md:pt-20"
    >
      <Work />
    </motion.div>
  )
}
