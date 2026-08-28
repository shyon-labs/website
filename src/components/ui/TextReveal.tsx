import { type ElementType } from 'react'
import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: ElementType
  splitBy?: 'word' | 'char'
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
  splitBy = 'word',
}: TextRevealProps) {
  const parts = splitBy === 'char' ? text.split('') : text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {parts.map((part: string, i: number) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.85,
              delay: delay + i * (splitBy === 'char' ? 0.025 : 0.07),
              ease: [0.16, 1, 0.3, 1] as any,
            }}
          >
            {part}
            {splitBy === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
