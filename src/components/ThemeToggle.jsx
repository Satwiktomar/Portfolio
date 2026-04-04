import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
    } catch {}
    return true // default to dark
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', 'light')
    }
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}
  }, [isDark])

  return (
    <motion.button
      onClick={() => setIsDark(d => !d)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-10 h-10 rounded-full border border-white/10 dark-glass flex items-center justify-center text-text-secondary hover:text-white hover:border-accent/30 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiMoon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiSun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
