import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { experiences } from '../data/portfolio'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey and the roles that shaped my growth."
      />

      <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
        {experiences.map((exp, i) => {
          const Wrapper = exp.url ? motion.a : motion.div;
          
          return (
            <Wrapper
              href={exp.url || undefined}
              target={exp.url ? "_blank" : undefined}
              rel={exp.url ? "noopener noreferrer" : undefined}
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`w-full glass p-5 sm:p-8 rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group ${exp.url ? 'cursor-pointer hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:-translate-y-1' : ''}`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-4 gap-2 text-center sm:text-left">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-accent-light transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-accent-light text-lg font-medium">{exp.company}</p>
                </div>
                <span className="text-text-muted text-sm px-4 py-1.5 rounded-full bg-white/5 border border-white/10 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <p className="text-text-secondary text-base leading-relaxed mb-6 text-center sm:text-left">
                {exp.description}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-accent/[0.08] border border-accent/[0.15] text-accent-light text-sm font-medium hover:bg-accent/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Wrapper>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
