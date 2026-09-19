const stats = [
  { value: '2+', label: 'Years Active Development' },
  { value: '10+', label: 'Completed Web & App Projects' },
  { value: '100%', label: 'Dedication to Scalable Code' },
  { value: 'Top 1%', label: 'Young Tech Talent' },
]

export function StatsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center transition-colors hover:bg-white/[0.03]"
          >
            <span className="font-mono text-3xl font-bold text-gradient sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
