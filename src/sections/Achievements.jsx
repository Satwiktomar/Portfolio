import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { achievements } from '../data/portfolio'
import { FiAward, FiCheck, FiStar } from 'react-icons/fi'

const typeConfig = {
  hackathon: { icon: FiStar, label: 'Hackathon', color: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/20' },
  certification: { icon: FiCheck, label: 'Certification', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/20' },
  award: { icon: FiAward, label: 'Award', color: 'from-accent/20 to-purple-500/20', border: 'border-accent/20' },
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones and recognitions along the way."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {achievements.map((ach, i) => {
          const config = typeConfig[ach.type]
          const Icon = config.icon
          return (
            <div key={ach.title} className={i === 3 ? 'lg:col-start-2' : ''}>
              <Card delay={i * 0.08} className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4 mt-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} border ${config.border} flex items-center justify-center shadow-lg`}>
                    <Icon size={22} className="text-white/90" />
                  </div>
                  <span className="text-text-muted text-sm font-medium">{ach.year}</span>
                </div>
                <span className={`inline-block w-max px-3 py-1 rounded-md text-xs font-medium mb-4 bg-gradient-to-r ${config.color} border ${config.border} text-white/80`}>
                  {config.label}
                </span>
                <h3 className="font-display text-lg font-semibold text-white mb-3 leading-tight tracking-wide">
                  {ach.title}
                </h3>
                <p className="text-text-secondary text-[15px] leading-relaxed">
                  {ach.description}
                </p>
              </Card>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
