import { Gamepad2, Puzzle, Cpu, BookOpen } from 'lucide-react'

const interests = [
  {
    icon: Gamepad2,
    title: 'Gaming',
    desc: 'Playing and studying games to understand what makes them feel great.',
  },
  {
    icon: Cpu,
    title: 'Game Mechanics',
    desc: 'Reverse-engineering physics, controls, and systems that power gameplay.',
  },
  {
    icon: Puzzle,
    title: 'Algorithmic Puzzles',
    desc: 'Competitive coding and brain-teasers that sharpen problem-solving.',
  },
  {
    icon: BookOpen,
    title: 'Self-Learning',
    desc: 'Constantly exploring new tools, frameworks, and ideas on my own.',
  },
]

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6"
    >
      <div className="glass overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan">// beyond code</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            When I&apos;m not{' '}
            <span className="text-gradient">shipping code.</span>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A lot of my curiosity comes from play. Games taught me that great
            software is equal parts logic and delight — so I&apos;m always
            exploring mechanics, cracking puzzles, and learning something new
            just for the fun of it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((item) => (
            <div
              key={item.title}
              className="glass-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple/25 to-cyan/15 text-purple">
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
