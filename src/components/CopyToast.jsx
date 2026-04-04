import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiCopy } from 'react-icons/fi'

let toastTimer = null

export function useCopyToast() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      clearTimeout(toastTimer)
      toastTimer = setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      clearTimeout(toastTimer)
      toastTimer = setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return [copied, copy]
}

export default function CopyToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-2xl glass-strong border border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.1)]"
        >
          <div className="w-6 h-6 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <FiCheck size={12} className="text-green-400" />
          </div>
          <span className="text-white text-sm font-medium">Email copied!</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
