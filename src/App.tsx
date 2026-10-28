import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import PageLoader from './components/PageLoader/PageLoader'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FounderPage from './pages/FounderPage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import './index.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem('shyonlabs-theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('shyonlabs-theme', theme)
  }, [theme])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="noise-overlay" aria-hidden="true" />
      <PageLoader />
      <div id="main-content" className="min-h-screen flex flex-col justify-between">
        <Navbar theme={theme} onThemeToggle={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ProductsPage is intentionally hidden until product listings are ready. */}
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
