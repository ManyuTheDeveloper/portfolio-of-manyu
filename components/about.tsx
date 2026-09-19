import { Code2, Rocket, GraduationCap, Zap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Focus',
    desc: 'Comfortable across the stack — from React interfaces to Java logic and REST APIs.',
  },
  {
    icon: Rocket,
    title: '2+ Years Shipping',
    desc: 'Hands-on experience building and refining real web and application projects.',
  },
  {
    icon: Zap,
    title: 'Performance-Minded',
    desc: 'Obsessed with clean, scalable architecture and smooth, responsive UX.',
  },
  {
    icon: GraduationCap,
    title: 'Always Learning',
    desc: 'Self-driven learner exploring new frameworks, patterns, and game mechanics.',
  },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-sm text-cyan">// about</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A young developer with a{' '}
            <span className="text-gradient">senior mindset.</span>
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            At 13, I&apos;ve spent the last couple of years turning curiosity
            into working software. I love the entire process — designing an
            interface, wiring up the logic, and polishing every interaction
            until it feels effortless.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            My core toolkit spans <span className="text-foreground">React</span>,{' '}
            <span className="text-foreground">modern JavaScript</span>, and{' '}
            <span className="text-foreground">Java</span>, backed by solid
            fundamentals in object-oriented programming and modern web
            architecture. I&apos;m driven to build things that are fast,
            accessible, and genuinely fun to use.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="glass glass-hover rounded-2xl p-5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
