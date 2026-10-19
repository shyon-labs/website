import Hero from '../components/Hero/Hero'
import ScrollIntro from '../components/ScrollIntro/ScrollIntro'
import Services from '../components/Services/Services'
import Technologies from '../components/Technologies/Technologies'
import Process from '../components/Process/Process'
import WhyShyonLabs from '../components/WhyShyonLabs/WhyShyonLabs'
import FinalCTA from '../components/FinalCTA/FinalCTA'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <ScrollIntro />
      <Services />
      {/* Upcoming products section is intentionally hidden until product listings are ready. */}
      <Technologies />
      <Process />
      <WhyShyonLabs />
      <FinalCTA />
    </motion.div>
  )
}
