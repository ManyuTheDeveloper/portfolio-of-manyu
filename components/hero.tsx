'use client'

import { ArrowRight, Mail, Sparkles } from 'lucide-react'

const codeLines = [
  { t: 'const', v: ' developer', o: ' = {' },
  { indent: true, k: '  name:', v: " 'Manyu Srivastava',", c: '' },
  { indent: true, k: '  age:', v: ' 13,', c: '' },
  { indent: true, k: '  stack:', v: " ['React', 'Java', 'JS'],", c: '' },
  { indent: true, k: '  status:', v: " 'building the future',", c: '' },
  { plain: '}' },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-16 pt-36 sm:px-6 lg:flex-row lg:pt-44"
    >
      {/* Left: copy */}
      <div className="flex-1 text-center lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-cyan">
          <Sparkles className="h-3.5 w-3.5" />
          Full-Stack Web &amp; Mobile Developer · Junior Tech Prodigy
        </span>

        <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Building High-Impact Web &amp; App Experiences{' '}
          <span className="text-gradient">Before High School.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
          Hi, I&apos;m Manyu Srivastava. A 13-year-old developer specializing in
          React, Java, and modern JavaScript, crafting scalable web applications
          and interactive digital experiences.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
          <a
            href="#projects"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-semibold text-navy transition-all hover:scale-[1.03] glow-cyan sm:w-auto"
          >
            Explore Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/40 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-cyan hover:bg-cyan/10 sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </div>
      </div>

      {/* Right: terminal widget */}
      <div className="w-full flex-1 lg:max-w-md">
        <div className="glass glass-hover animate-float rounded-2xl p-1 shadow-2xl shadow-black/40">
          <div className="rounded-xl bg-navy-soft/80">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                developer.ts
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                {codeLines.map((line, i) => (
                  <div key={i}>
                    {line.plain ? (
                      <span className="text-foreground">{line.plain}</span>
                    ) : line.indent ? (
                      <>
                        <span className="text-purple">{line.k}</span>
                        <span className="text-emerald-300">{line.v}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-cyan">{line.t}</span>
                        <span className="text-foreground">{line.v}</span>
                        <span className="text-muted-foreground">{line.o}</span>
                      </>
                    )}
                  </div>
                ))}
                <div className="mt-1 flex items-center text-foreground">
                  <span className="text-cyan">$</span>
                  <span className="ml-2 text-muted-foreground">
                    npm run build
                  </span>
                  <span className="ml-1 inline-block h-4 w-2 animate-blink bg-cyan" />
                </div>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
