import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiDownload, FiChevronDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { personalInfo, socialLinks } from '../data/portfolio'

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms — different layers move at different speeds
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20 pb-32 sm:py-0 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Avatar — moves slower on scroll (parallax layer 1) */}
        <motion.div
          style={{ y: avatarY, scale: avatarScale }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0 relative"
        >
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[80px] -z-10" />
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-[420px] md:h-[420px] rounded-full border-2 border-white/5 shadow-2xl object-cover bg-black"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </motion.div>

        {/* Content — moves faster on scroll (parallax layer 2) */}
        <motion.div
          style={{ y: textY, opacity: opacityFade }}
          className="flex-1 text-center md:text-left flex flex-col items-center md:items-start"
        >
          
          {/* Greeting & Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4"
          >
            <h2 className="text-base sm:text-xl text-text-muted mb-2 font-medium flex items-center justify-center md:justify-start gap-2">
              Hello <span className="inline-block animate-[wave_2.5s_infinite] origin-bottom-right">👋</span>, I am
            </h2>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white mb-3">
              {personalInfo.name}
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-accent-light font-display">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-secondary text-sm sm:text-lg mb-6 leading-relaxed font-light max-w-2xl"
          >
            {personalInfo.bio.map((para, i) => (
              <span key={i} className="block mb-2">{para}</span>
            ))}
          </motion.div>

          {/* Actions & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 mt-2"
          >
            <a href="#contact" className="glow-btn glow-btn-primary px-6 py-3 text-sm sm:text-[15px] rounded-full font-semibold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all min-h-[44px] flex items-center">
              Contact Me
            </a>
            
            <a
              href={personalInfo.resumeUrl}
              download="Satwik_Tomar_Resume.pdf"
              type="application/pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn px-6 py-3 text-sm sm:text-[15px] flex items-center gap-2 rounded-full border border-white/10 hover:bg-white/5 active:scale-95 transition-all min-h-[44px]"
            >
              <FiDownload size={16} />
              Resume
            </a>

            <div className="flex items-center gap-3 mt-1">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] border border-white/5 transition-all active:scale-90">
                <FiGithub size={18} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] border border-white/5 transition-all active:scale-90">
                <FiLinkedin size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: opacityFade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-muted/60"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
          <FiChevronDown size={14} opacity={0.6} />
        </motion.div>
      </motion.div>
    </section>
  )
}
