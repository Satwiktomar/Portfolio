import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const posRef = useRef({ x: -300, y: -300 })
  const currentRef = useRef({ x: -300, y: -300 })
  const rafRef = useRef(null)
  const [isLink, setIsLink] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Touch devices skip cursor glow
    if ('ontouchstart' in window) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)

      // Detect if hovering a clickable element
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const clickable = el?.closest('a, button, [role="button"], input, textarea, select, label')
      setIsLink(!!clickable)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const animate = () => {
      // Lerp the glow (sluggish trail) towards the cursor
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.1
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentRef.current.x - 150}px, ${currentRef.current.y - 150}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Touch devices: render nothing
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Sharp inner dot — snaps exactly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full transition-all duration-100"
        style={{
          background: isLink ? '#a855f7' : '#6366f1',
          opacity: visible ? 0.9 : 0,
          boxShadow: isLink ? '0 0 8px #a855f7' : '0 0 8px #6366f1',
          transform: 'translate(-300px, -300px)',
        }}
      />
      {/* Large soft halo — lags behind with lerp */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9997] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: isLink
            ? 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, background 0.3s',
          transform: 'translate(-300px, -300px)',
        }}
      />
    </div>
  )
}
