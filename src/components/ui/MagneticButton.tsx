import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
  as?: 'button' | 'a'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.3,
  as = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useRef(0)
  const y = useRef(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.current = (e.clientX - centerX) * strength
      y.current = (e.clientY - centerY) * strength
      ref.current.style.transform = `translate(${x.current}px, ${y.current}px)`
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = `translate(0px, 0px)`
    ref.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.1s linear'
  }, [])

  const Tag = as === 'a' ? motion.a : motion.button

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <Tag
        className={className}
        onClick={onClick as any}
        href={href as any}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </Tag>
    </div>
  )
}
