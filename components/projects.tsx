'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, LayoutDashboard, Gamepad2, Cpu, X } from 'lucide-react'
import { SnakeGame, TicTacToe, WebAppDemo } from '@/components/games'

type DemoKey = 'webapp' | 'snake' | 'ttt'

const projects: {
  icon: typeof LayoutDashboard
  title: string
  blurb: string
  tags: string[]
  demo: DemoKey
  source: string
}[] = [
  {
    icon: LayoutDashboard,
    title: 'Full-Stack Web App',
    blurb:
      'A responsive, component-driven web application featuring a clean dashboard UI, reusable design system, and smooth client-side interactions.',
    tags: ['React', 'Tailwind CSS', 'REST API'],
    demo: 'webapp',
    source: 'https://github.com/ManyuTheDeveloper',
  },
  {
    icon: Gamepad2,
    title: '2D Canvas Game',
    blurb:
      'A custom browser game built on the HTML5 Canvas with interactive gameplay, collision detection, and smooth physics-based movement.',
    tags: ['JavaScript', 'Canvas API', 'Game Logic'],
    demo: 'snake',
    source: 'https://github.com/ManyuTheDeveloper',
  },
  {
    icon: Cpu,
    title: 'Tic-Tac-Toe AI',
    blurb:
      'An unbeatable Tic-Tac-Toe opponent powered by the minimax algorithm — a hands-on take on game theory, recursion, and decision trees.',
    tags: ['Java', 'OOP', 'Minimax'],
    demo: 'ttt',
    source: 'https://github.com/ManyuTheDeveloper',
  },
]

const demoTitles: Record<DemoKey, string> = {
  webapp: 'Full-Stack Web App — Live Demo',
  snake: '2D Canvas Game — Live Demo',
  ttt: 'Tic-Tac-Toe AI — Live Demo',
}

export function Projects() {
  const [openDemo, setOpenDemo] = useState<DemoKey | null>(null)

  useEffect(() => {
    if (!openDemo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDemo(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openDemo])

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6"
    >
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-cyan">// projects</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A selection of things I&apos;ve designed, built, and shipped — from
          full web apps to interactive games and developer tools. Hit{' '}
          <span className="font-mono text-cyan">Live Demo</span> to try each one
          right here in your browser.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="glass glass-hover group flex flex-col rounded-2xl p-6"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan transition-transform group-hover:scale-110">
              <project.icon className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {project.blurb}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setOpenDemo(project.demo)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </button>
            </div>
          </article>
        ))}
      </div>

      {openDemo && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={demoTitles[openDemo]}
        >
          <button
            type="button"
            aria-label="Close demo"
            onClick={() => setOpenDemo(null)}
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          />
          <div className="glass relative z-10 w-full max-w-lg rounded-2xl p-5 shadow-2xl shadow-black/40 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-muted-foreground">
                {demoTitles[openDemo]}
              </p>
              <button
                type="button"
                onClick={() => setOpenDemo(null)}
                aria-label="Close demo"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">
              {openDemo === 'webapp' && <WebAppDemo />}
              {openDemo === 'snake' && <SnakeGame />}
              {openDemo === 'ttt' && <TicTacToe />}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
