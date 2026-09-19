'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'

const EMAIL = 'manyuthedeveloper@gmail.com'

const socials = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/ManyuTheDeveloper',
  },
  { icon: Mail, label: 'Email', href: `mailto:${EMAIL}` },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const subject = `Portfolio message from ${name || 'someone'}`
    const body = `${message}\n\n—\nFrom: ${name}\nReply to: ${email}`
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="font-mono text-sm text-cyan">// contact</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s <span className="text-gradient">build together.</span>
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Open to mentorship, software collaborations, and exciting coding
            challenges. Have an idea or just want to say hi? Drop me a message.
          </p>

          <ul className="mt-8 space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover inline-flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium sm:w-auto"
                >
                  <social.icon className="h-4 w-4 text-cyan" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-cyan" />
              <h3 className="text-xl font-semibold">Message sent!</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Thanks for reaching out — I&apos;ll get back to you as soon as I
                can.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-medium text-cyan hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/60 focus:bg-white/[0.07]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/60 focus:bg-white/[0.07]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your idea..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/60 focus:bg-white/[0.07]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] glow-cyan"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <a href="#top" className="font-mono text-sm font-bold">
          <span className="text-cyan">{'<'}</span>Manyu
          <span className="text-purple"> {'/>'}</span>
        </a>
        <p className="text-xs text-muted-foreground">
          Open to mentorship, software collaborations, and exciting coding
          challenges.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Manyu Srivastava
        </p>
      </div>
    </footer>
  )
}
