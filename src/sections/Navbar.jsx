import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, personalInfo } from '../data/portfolio'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-[5%] right-[5%] z-50 transition-all duration-300 rounded-b-3xl ${scrolled ? 'glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'
        }`}
    >
      <div className="w-full px-8 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={personalInfo.avatarUrl}
            alt="Logo"
            className="w-9 h-9 rounded-full object-cover group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow border border-white/10"
          />
          <span className="font-display font-bold text-white text-[1.15rem] leading-none tracking-wide pt-0.5">Satwik Tomar</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-secondary hover:text-white text-sm transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href={personalInfo.resumeUrl} download className="glow-btn glow-btn-primary flex items-center gap-2 !py-2.5 !px-6">
            <FiDownload size={16} />
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3 text-text-secondary hover:text-white transition-colors text-base"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href={personalInfo.resumeUrl}
                download
                onClick={() => setMobileOpen(false)}
                className="glow-btn glow-btn-primary flex items-center justify-center gap-2 mt-3 w-full"
              >
                <FiDownload size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
