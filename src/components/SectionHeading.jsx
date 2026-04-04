export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-10 sm:mb-16">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base sm:text-lg mx-auto leading-relaxed max-w-xs sm:max-w-none">
          {subtitle}
        </p>
      )}
      <div className="mt-5 sm:mt-6 mx-auto w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </div>
  )
}
