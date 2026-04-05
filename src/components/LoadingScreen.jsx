import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient background blobs */}
          <div className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] -top-20 -left-20 animate-pulse" />
          <div className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Logo + Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 mb-10"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl scale-150" />
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="relative w-32 h-32 rounded-full object-cover border-2 border-white/10 shadow-2xl"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                Satwik Tomar
              </h1>
              <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mt-1">
                AI / ML Engineer
              </p>
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-48 sm:w-64"
          >
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-text-muted text-xs font-medium tracking-widest uppercase mt-4"
            >
              Initializing
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
