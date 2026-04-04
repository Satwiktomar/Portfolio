import { useEffect, useRef, useState } from 'react'

/**
 * useTypewriter — animates through an array of strings with typing + deleting effect
 * @param {string[]} texts - array of strings to cycle through
 * @param {number} typeSpeed - ms per character typed
 * @param {number} deleteSpeed - ms per character deleted
 * @param {number} pauseTime - ms to pause at full string
 */
export function useTypewriter(texts, typeSpeed = 80, deleteSpeed = 40, pauseTime = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentText = texts[textIndex % texts.length]

    const tick = () => {
      setDisplayed(prev => {
        if (!isDeleting) {
          const next = currentText.slice(0, prev.length + 1)
          if (next === currentText) {
            // Full text typed — pause then delete
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime)
          } else {
            timeoutRef.current = setTimeout(tick, typeSpeed)
          }
          return next
        } else {
          const next = prev.slice(0, prev.length - 1)
          if (next === '') {
            setIsDeleting(false)
            setTextIndex(i => (i + 1) % texts.length)
          } else {
            timeoutRef.current = setTimeout(tick, deleteSpeed)
          }
          return next
        }
      })
    }

    timeoutRef.current = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timeoutRef.current)
  }, [isDeleting, textIndex])

  return displayed
}

/**
 * useCountUp — animates a number from 0 to target when inView
 * @param {number} target
 * @param {number} duration - ms
 * @param {boolean} inView - only starts when true
 */
export function useCountUp(target, duration = 1800, inView = true) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current || !target) return
    hasRun.current = true

    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    if (isNaN(numericTarget)) return

    const start = Date.now()
    const startVal = 0

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (numericTarget - startVal) * eased
      setCount(current)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return count
}

/**
 * useInView — returns true once the ref element enters the viewport
 */
export function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
