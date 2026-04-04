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
  const [total, setTotal] = useState(null)
  const displayed = useCountUp(total)

  useEffect(() => {
    // counterapi.dev — free, no auth, increments on hit
    fetch('https://api.counterapi.dev/v1/satwiktomar-portfolio/visits/up')
      .then(r => r.json())
      .then(data => {
        if (data?.count !== undefined) setTotal(data.count)
      })
      .catch(() => {}) // Silently fail — counter simply won't show
  }, [])

  if (!total) return null

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
          {displayed.toLocaleString()}
        </span>
        {' '}developers have visited
      </span>
    </motion.div>
  )
}
