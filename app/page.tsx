import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { StatsStrip } from '@/components/stats-strip'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Hobbies } from '@/components/hobbies'
import { Contact, Footer } from '@/components/contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Skills />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
