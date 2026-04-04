import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { personalInfo, socialLinks } from '../data/portfolio'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        title="About Me"
        subtitle="A glimpse into who I am and what drives me."
      />

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.img
          src={personalInfo.avatarUrl}
          alt={personalInfo.name}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 rounded-2xl object-cover mb-6 shadow-[0_0_40px_rgba(99,102,241,0.2)] border-2 border-white/10"
        />

        {/* Name */}
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          {personalInfo.name}
        </h3>

        {/* Bio */}
        <div className="max-w-2xl space-y-4 mb-8">
          {personalInfo.bio.map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed">{para}</p>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 mb-10">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] transition-all">
            <FiGithub size={18} />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.08] transition-all">
            <FiLinkedin size={18} />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          {personalInfo.stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-accent-light">{stat.value}</p>
              <p className="text-text-muted text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
