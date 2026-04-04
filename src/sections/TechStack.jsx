import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { techStack } from '../data/portfolio'

export default function TechStack() {
  return (
    <SectionWrapper id="techstack">
      <SectionHeading
        title="Tech Stack"
        subtitle="Technologies and tools I work with daily."
      />

      {/* Main Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
        {techStack.map((tech, i) => {
          const IconComponent = tech.icon
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.2 } }}
              className="glass group cursor-pointer p-4 flex flex-col items-center gap-3 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <IconComponent
                size={28}
                className="text-text-muted group-hover:drop-shadow-[0_0_12px_var(--glow)] transition-all duration-300"
                style={{ '--glow': tech.color, color: 'inherit' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = tech.color }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '' }}
              />
              <span className="text-text-muted text-xs text-center group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Marquee */}
      <div className="mt-12 overflow-hidden relative max-w-6xl mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => {
            const IconComponent = tech.icon
            return (
              <div key={`${tech.name}-${i}`} className="mx-6 flex items-center gap-2 text-text-muted/50">
                <IconComponent size={16} />
                <span className="text-sm">{tech.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
