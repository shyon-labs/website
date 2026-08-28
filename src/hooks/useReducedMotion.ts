import { useEffect } from 'react'

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotionEffect(callback: () => void) {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!reduced) callback()
  }, [callback, reduced])
}
