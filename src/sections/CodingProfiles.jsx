import { motion } from 'framer-motion'
import { codingProfiles } from '../data/portfolio'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function CodingProfiles() {
  return (
    <SectionWrapper id="coding">
      <SectionHeading
        title="Coding Profiles"
        subtitle="My active presences across competitive programming and open-source platforms."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {codingProfiles.map((profile, index) => {
          const Icon = profile.icon;
          return (
            <motion.a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center gap-4 group hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 transition-transform duration-300 group-hover:scale-110"
                style={{ color: profile.color }}
              >
                <Icon className="text-4xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-light transition-colors">{profile.platform}</h3>
                <p className="text-sm text-text-muted font-medium">{profile.rating}</p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
