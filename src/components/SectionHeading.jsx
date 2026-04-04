export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-20 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </div>
  )
}
