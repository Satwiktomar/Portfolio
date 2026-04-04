import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : {}}
      className={`glass group cursor-pointer p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(99,102,241,0.06)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
