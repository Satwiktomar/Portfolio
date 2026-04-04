import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { achievements } from '../data/portfolio'

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones and recognitions along the way."
      />

      <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {achievements.map((ach, i) => {
          return (
            <div key={ach.title}>
              <Card delay={i * 0.08} className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-10">
                <span className="text-accent-light text-xs font-medium tracking-widest uppercase mb-3">
                  {ach.year}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-4 leading-tight tracking-wide">
                  {ach.title}
                </h3>
                <p className="text-text-secondary w-full text-[15px] leading-relaxed">
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
