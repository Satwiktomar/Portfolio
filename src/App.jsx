import { useState, useEffect, Suspense, lazy } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CursorGlow from './components/CursorGlow'
import ChatbotButton from './components/ChatbotButton'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import TechStack from './sections/TechStack'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CodingProfiles from './sections/CodingProfiles'
import Certifications from './sections/Certifications'

const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'))

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <CursorGlow />

      {/* Three.js Background — always moving */}
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>

      {/* Main Content */}
      <div className="relative z-10 w-screen">
        <Navbar />
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
        <CodingProfiles />
        <Achievements />
        <Certifications />
        <Contact />
        <Footer />
      </div>

      <ChatbotButton />
    </>
  )
}
