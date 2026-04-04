import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiChevronDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { personalInfo, socialLinks } from '../data/portfolio'

export default function Hero() {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Status badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-text-secondary text-sm">Available for opportunities</span>
        </motion.div> */}

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mb-8 flex justify-center"
        >
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 shadow-2xl object-cover bg-white/5"
            onError={(e) => { e.target.style.display = 'none' }} // fallback if no photo is present yet
          />
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4 text-white"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
          className="text-text-secondary text-base sm:text-lg mx-auto mb-8 leading-relaxed space-y-3"
        >
          {personalInfo.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] transition-all">
            <FiGithub size={18} />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] transition-all">
            <FiLinkedin size={18} />
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="glow-btn glow-btn-primary flex items-center gap-2">
            View Projects
            <FiArrowRight size={16} />
          </a>
          <a
            href={personalInfo.resumeUrl}
            download
            className="glow-btn flex items-center gap-2"
          >
            <FiDownload size={16} />
            Download Resume
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <FiChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
