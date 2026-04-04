import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/portfolio'
import { FiGithub } from 'react-icons/fi'

const isMobileDevice = () =>
  typeof window !== 'undefined' && window.innerWidth < 768

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const isMobile = isMobileDevice()

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        title="Featured Projects"
        subtitle="Real projects I've built — click any card to view the code on GitHub."
      />

      <div className="flex flex-wrap justify-center gap-6 mx-auto mt-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <Tilt
              tiltEnable={!isMobile}
              tiltMaxAngleDegrees={8}
              glareEnable={!isMobile}
              glareMaxOpacity={0.12}
              glareColor="#6366f1"
              glarePosition="all"
              scale={1.02}
              transitionSpeed={600}
              className="h-full"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="glass-surface group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_8px_60px_rgba(99,102,241,0.15)] block h-full rounded-xl border border-white/[0.08] hover:border-accent/30"
              >
                {/* Project Image */}
                <div className="relative w-full h-44 bg-gradient-to-br from-accent/[0.08] to-purple-500/[0.08] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback when no image */}
                  <div className="absolute inset-0 hidden items-center justify-center text-text-muted/40 text-4xl font-bold font-display">
                    {project.title.charAt(0)}
                  </div>

                  {/* Hover overlay with description */}
                  <AnimatePresence>
                    {hoveredIdx === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                      >
                        <p className="text-white/90 text-sm text-center leading-relaxed">
                          {project.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-accent/30 text-accent-light text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Featured
                    </div>
                  )}

                  {/* GitHub icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                    <FiGithub size={14} />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h3>

                  {/* Truncated description for mobile */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 md:hidden">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-text-muted text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
