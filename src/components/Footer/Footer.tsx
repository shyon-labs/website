import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ExternalLink, Mail } from 'lucide-react'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') || href.includes('#')) {
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

  return (
    <footer className="border-t border-border py-10 md:py-14" aria-label="Footer">
      <div className="container-xl">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 items-start mb-10 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-sm tracking-[0.15em] uppercase text-text-primary mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-surface-2 border border-border flex items-center justify-center text-[9px] font-mono text-accent font-extrabold">SL</span>
              SHYONLABS
            </p>
            <p className="text-text-dim text-xs mb-4 leading-relaxed">
              Digital products. Intelligent systems.
            </p>
            <p className="text-text-dim text-xs">Est. 2026 · Pakistan</p>
          </div>

          {/* Nav Showcase */}
          <div>
            <p className="label-sm mb-4">Explore</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products" className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300">
                  Upcoming Products
                </Link>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => { e.preventDefault(); handleNavClick('/#services') }}
                  className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#technologies"
                  onClick={(e) => { e.preventDefault(); handleNavClick('/#technologies') }}
                  className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300"
                >
                  Technologies
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Links */}
          <div>
            <p className="label-sm mb-4">Studio</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300">
                  About ShyonLabs
                </Link>
              </li>
              <li>
                <Link to="/founder" className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300">
                  Founder Profile
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300">
                  Opportunities (Careers)
                </Link>
              </li>
              <li>
                <a
                  href="mailto:shyonlabs@gmail.com"
                  className="text-text-dim text-xs hover:text-text-muted transition-colors duration-300 flex items-center gap-1.5"
                >
                  <Mail size={11} className="text-accent" />
                  shyonlabs@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & GitHub */}
          <div>
            <p className="label-sm mb-4">Connect</p>
            <div className="flex flex-col gap-2.5 items-start">
              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/company/shyon-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-text-dim text-xs hover:border-[#0077B5] hover:text-[#0077B5] transition-all duration-300"
                aria-label="ShyonLabs on LinkedIn"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Page
                <ExternalLink size={10} />
              </a>

              {/* GitHub Link with official GitHub logo */}
              <a
                href="https://github.com/shyon-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-text-dim text-xs hover:border-text-primary hover:text-text-primary transition-all duration-300"
                aria-label="ShyonLabs GitHub Organization"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub Profile
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-border">
          <p className="text-text-dim text-xs">
            © {new Date().getFullYear()} ShyonLabs. All rights reserved.
          </p>
          <p className="text-text-dim text-xs">
            Independent Software & AI Product Studio
          </p>
        </div>
      </div>
    </footer>
  )
}
