import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { achievements } from '../data/portfolio'
import { useCountUp, useInView } from '../hooks/useAnimations'

// Extracts a numeric value and suffix from strings like "150+", "9.0", "Top 16"
function parseStatValue(title) {
  const match = title.match(/(\d+\.?\d*)\+?/)
  if (!match) return null
  return { num: parseFloat(match[1]), hasPlus: title.includes('+'), raw: title }
}

function AnimatedTitle({ title }) {
  const [ref, inView] = useInView(0.5)
  const parsed = parseStatValue(title)

  const count = useCountUp(
    parsed ? parsed.num : 0,
    1600,
    inView && !!parsed
  )

  if (!parsed) {
    return (
      <h3 ref={ref} className="font-display text-xl font-bold text-white mb-4 leading-tight tracking-wide">
        {title}
      </h3>
    )
  }

  const isDecimal = String(parsed.num).includes('.')

  return (
    <h3 ref={ref} className="font-display text-xl font-bold text-white mb-4 leading-tight tracking-wide">
      {/* Replace the first number in the title with the animated count */}
      {title.replace(
        /\d+\.?\d*/,
        isDecimal ? count.toFixed(1) : Math.floor(count).toString()
      )}
    </h3>
  )
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading
        title="Achievements"
        subtitle="Milestones and recognitions along the way."
      />

      <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {achievements.map((ach, i) => (
          <div key={ach.title}>
            <Card delay={i * 0.08} className="h-full flex flex-col items-center justify-center text-center p-5 sm:p-8 md:p-10">
              <span className="text-accent-light text-xs font-medium tracking-widest uppercase mb-3">
                {ach.year}
              </span>
              <AnimatedTitle title={ach.title} />
              <p className="text-text-secondary w-full text-[15px] leading-relaxed">
                {ach.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
