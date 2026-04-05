import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiEye } from 'react-icons/fi'

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!target) return
    const start = Date.now()
    const startVal = Math.max(0, target - Math.floor(target * 0.15))
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(startVal + (target - startVal) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return count
}

export default function VisitorCounter() {
  const [views, setViews] = useState(null)
  const [uniques, setUniques] = useState(null)
  
  const displayedViews = useCountUp(views)
  const displayedUniques = useCountUp(uniques)

  useEffect(() => {
    // 1. Total page views: always increment on load. 
    // Using the original 'visits' key to preserve the higher history count.
    fetch('https://api.counterapi.dev/v1/satwiktomar-portfolio/visits/up')
      .then(r => r.json())
      .then(data => {
        if (data?.count !== undefined) setViews(data.count)
      })
      .catch(() => {})

    // 2. Unique visitors: check local storage to prevent duplicate counting
    const hasVisited = localStorage.getItem('has_visited_portfolio')
    
    if (!hasVisited) {
      // New visitor: increment unique count
      fetch('https://api.counterapi.dev/v1/satwiktomar-portfolio/uniques/up')
        .then(r => r.json())
        .then(data => {
          if (data?.count !== undefined) {
            setUniques(data.count)
            localStorage.setItem('has_visited_portfolio', 'true')
          } else {
            setUniques(0) // Fallback trigger
          }
        })
        .catch(() => setUniques(0))
    } else {
      // Returning visitor: fetch current unique count without incrementing
      fetch('https://api.counterapi.dev/v1/satwiktomar-portfolio/uniques')
        .then(r => r.json())
        .then(data => {
          if (data?.count !== undefined) {
            setUniques(data.count)
          } else {
            setUniques(0) // Fallback trigger
          }
        })
        .catch(() => setUniques(0))
    }
  }, [])

  // If views haven't loaded at all (e.g. ad blocker), just hide entirely
  if (views === null) return null

  // If uniques failed to load or API blocked it, fall back to the original single stat
  if (uniques === null || uniques === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-2 text-text-muted text-sm"
      >
        <FiEye size={14} className="text-accent opacity-70" />
        <span>
          <span className="text-white/60 font-semibold tabular-nums">
            {displayedViews.toLocaleString()}
          </span>
          {' '}developers have visited
        </span>
      </motion.div>
    )
  }

  // Both loaded successfully
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex items-center justify-center gap-2 text-text-muted text-sm"
    >
      <FiEye size={14} className="text-accent opacity-70" />
      <span>
        Visited{' '}
        <span className="text-white/60 font-semibold tabular-nums">
          {displayedViews.toLocaleString()}
        </span>
        {' '}times by{' '}
        <span className="text-white/60 font-semibold tabular-nums">
          {displayedUniques.toLocaleString()}
        </span>
        {' '}developers
      </span>
    </motion.div>
  )
}
