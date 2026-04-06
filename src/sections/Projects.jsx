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
                <div className="relative w-full h-44 overflow-hidden">
                  {/* Themed placeholder — always rendered beneath the real image */}
                  <div className="project-placeholder absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-violet-600/20 animate-pulse-slow" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-purple-400/10" />
                    {/* Dot grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    {/* Corner accent lines */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-accent/40 rounded-tl" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent/40 rounded-tr" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-accent/40 rounded-bl" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-accent/40 rounded-br" />
                    {/* Project initial glyph */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                        <span className="font-display text-2xl font-bold text-accent/70">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-accent/40">
                        Under Construction
                      </span>
                    </div>
                  </div>

                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="relative z-10 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}

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
