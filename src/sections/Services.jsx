import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import { services } from '../data/portfolio'

export default function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeading
        title="What I Do"
        subtitle="Specialized services I offer to bring your ideas to life."
      />

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service, i) => (
          <Card key={service.title} delay={i * 0.1}>
            <div className="text-3xl mb-4">{service.icon}</div>
            <h3 className="font-display text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {service.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
