import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Rings */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 loading-ring" />
            <div className="absolute inset-2 rounded-full border-2 border-purple-400/20 loading-ring" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-4 rounded-full border-2 border-accent/40 loading-ring" style={{ animationDelay: '0.6s' }} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-text-muted text-sm font-display tracking-widest uppercase"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
