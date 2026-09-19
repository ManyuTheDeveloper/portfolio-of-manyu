import { Layout, Server, Wrench, Gamepad2 } from 'lucide-react'

type Category = {
  icon: typeof Layout
  title: string
  accent: string
  skills: { name: string; level: number }[]
}

const categories: Category[] = [
  {
    icon: Layout,
    title: 'Frontend',
    accent: 'from-cyan/25 to-cyan/5 text-cyan',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Responsive Design', level: 90 },
    ],
  },
  {
    icon: Server,
    title: 'Backend & Core',
    accent: 'from-purple/25 to-purple/5 text-purple',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'Object-Oriented Programming', level: 82 },
      { name: 'REST APIs', level: 78 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    accent: 'from-cyan/25 to-purple/10 text-cyan',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 88 },
      { name: 'VS Code', level: 92 },
      { name: 'Vite', level: 80 },
    ],
  },
  {
    icon: Gamepad2,
    title: 'Creative Tech',
    accent: 'from-purple/25 to-cyan/10 text-purple',
    skills: [
      { name: 'Game Logic', level: 80 },
      { name: 'UI Prototyping', level: 84 },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-cyan">// skills</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Technical <span className="text-gradient">Skills</span>
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A growing toolkit spanning modern frontend, core backend engineering,
          and creative development.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.title} className="glass glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.accent}`}
              >
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{cat.title}</h3>
            </div>

            <ul className="mt-6 space-y-4">
              {cat.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-purple"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
