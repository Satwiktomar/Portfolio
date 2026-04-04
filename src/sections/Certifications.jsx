import { motion } from 'framer-motion'
import { certifications } from '../data/portfolio'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Professional credentials and verified expertise in AI and Cloud infrastructure."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border border-white/10 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all flex flex-col justify-center items-center text-center cursor-pointer group"
          >
            {cert.image ? (
              <img src={cert.image} alt={cert.issuer} className="h-16 mb-6 object-contain group-hover:scale-105 transition-transform" />
            ) : (
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
            )}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-light transition-colors">{cert.title}</h3>
            <p className="text-accent-light font-medium mb-1">{cert.issuer}</p>
            <span className="text-sm text-text-muted bg-white/5 py-1 px-3 rounded-full mt-2">
              {cert.year}
            </span>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  )
}
