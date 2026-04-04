import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Erik Satie - Gymnopédie No.1 (Public Domain from Wikimedia Commons)
const AUDIO_URL = "https://upload.wikimedia.org/wikipedia/commons/e/e1/Gymnopedie_No._1.ogg"

export default function AmbientSound() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)
  const fadeInterval = useRef(null)

  // Show button after a delay and init audio
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    audioRef.current = new Audio(AUDIO_URL)
    audioRef.current.loop = true
    audioRef.current.volume = 0

    return () => {
      clearTimeout(t)
      clearInterval(fadeInterval.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const fadeAudio = (targetVolume, duration) => {
    if (!audioRef.current) return
    clearInterval(fadeInterval.current)
    const steps = 20
    const stepTime = duration / steps
    const volumeStep = (targetVolume - audioRef.current.volume) / steps

    fadeInterval.current = setInterval(() => {
      if (!audioRef.current) return clearInterval(fadeInterval.current)
      
      let nextVol = audioRef.current.volume + volumeStep
      if ((volumeStep > 0 && nextVol >= targetVolume) || (volumeStep < 0 && nextVol <= targetVolume)) {
        audioRef.current.volume = Math.max(0, Math.min(1, targetVolume))
        clearInterval(fadeInterval.current)
        if (targetVolume === 0) audioRef.current.pause()
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, nextVol))
      }
    }, stepTime)
  }

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      setPlaying(false)
      fadeAudio(0, 1000) // fade out
    } else {
      setPlaying(true)
      // Only call play() explicitly on interaction
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed (browser policy):", e)
        setPlaying(false)
      })
      fadeAudio(0.4, 2000) // smooth fade in to 40% volume
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={playing ? 'Stop classical piano' : 'Play classical piano'}
          aria-label={playing ? 'Stop classical piano' : 'Play classical piano'}
          className="fixed bottom-6 left-6 z-[45] w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-strong border border-white/10 flex items-center justify-center cursor-pointer transition-all hover:border-accent/30 shadow-lg"
        >
          {/* Sound wave bars with animation when playing */}
          <div className="flex items-end gap-[3px] h-4">
            {[1, 1.6, 0.8, 1.4, 1].map((scale, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-accent"
                animate={playing
                  ? { scaleY: [scale, scale * 0.4, scale, scale * 1.2, scale], opacity: 1 }
                  : { scaleY: 0.3, opacity: 0.4 }
                }
                transition={playing
                  ? { duration: 0.8 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }
                  : { duration: 0.3 }
                }
                style={{ height: `${10 * scale}px`, transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
