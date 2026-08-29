import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Founder', href: '/founder' },
  { label: 'Opportunities', href: '/opportunities' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const prevScrollY = useRef(0)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 40)
      setHidden(currentY > prevScrollY.current && currentY > 160)
      prevScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (location.pathname !== path && path !== '') {
        navigate(href)
      } else {
        const el = document.querySelector(`#${hash}`)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else navigate(href)
      }
    } else {
      navigate(href)
    }
  }

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return location.pathname === href
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as any }}
      >
        <div className="container-xl flex items-center justify-between h-14 md:h-18" style={{ height: 'clamp(3.25rem, 5vw, 4.5rem)' }}>
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-sm tracking-[0.15em] uppercase text-text-primary hover:text-accent transition-colors duration-300 flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="w-6 h-6 rounded-md bg-surface-2 border border-border flex items-center justify-center text-[10px] font-mono text-accent font-extrabold">SL</span>
            SHYONLABS
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 relative group ${isLinkActive(link.href) ? 'text-accent' : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${isLinkActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/#contact')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-accent text-background font-semibold text-xs rounded-full hover:bg-white transition-colors duration-300"
            >
              Contact us
            </button>

            <button
              id="mobile-menu-toggle"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-primary hover:border-border-light transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="flex-1 flex flex-col justify-center container-xl px-6">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className={`block text-2xl sm:text-3xl font-bold py-3 border-b border-border transition-colors duration-300 ${isLinkActive(link.href) ? 'text-accent' : 'text-text-primary hover:text-accent'
                        }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-8 flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => handleNavClick('/#contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background font-bold text-sm rounded-full"
                >
                  Contact us →
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <p className="text-text-dim text-xs">shyonlabs@gmail.com</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
