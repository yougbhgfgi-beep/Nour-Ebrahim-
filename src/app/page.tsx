"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { startAudio } from "@/lib/audio-manager"

const SplashScreen = dynamic(() => import("@/components/splash-screen").then((m) => ({ default: m.SplashScreen })), { ssr: false })
const LoginOverlay = dynamic(() => import("@/components/login-overlay").then((m) => ({ default: m.LoginOverlay })), { ssr: false })
const EnvelopeLetter = dynamic(() => import("@/components/envelope-letter").then((m) => ({ default: m.EnvelopeLetter })), { ssr: false })
const ScrollProgressBar = dynamic(() => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgressBar })), { ssr: false })
const ConfettiRain = dynamic(() => import("@/components/login-confetti").then((m) => ({ default: m.ConfettiRain })), { ssr: false })
const Particles = dynamic(() => import("@/components/particles").then((m) => ({ default: m.Particles })), { ssr: false })
const FloatingPetals = dynamic(() => import("@/components/falling-petals").then((m) => ({ default: m.FloatingPetals })), { ssr: false })
const FloatingEmojis = dynamic(() => import("@/components/floating-emojis").then((m) => ({ default: m.FloatingEmojis })), { ssr: false })
const TwinklingStars = dynamic(() => import("@/components/twinkling-stars").then((m) => ({ default: m.TwinklingStars })), { ssr: false })
const OrnateDivider = dynamic(() => import("@/components/ornate-divider").then((m) => ({ default: m.OrnateDivider })), { ssr: false })
const FloralBackground = dynamic(() => import("@/components/floral-pattern").then((m) => ({ default: m.FloralBackground })), { ssr: false })
const TransitionProvider = dynamic(() => import("@/components/transition-provider").then((m) => ({ default: m.TransitionProvider })), { ssr: false })
const FloatingNav = dynamic(() => import("@/components/floating-nav").then((m) => ({ default: m.FloatingNav })), { ssr: false })
const MusicPlayer = dynamic(() => import("@/components/music-player").then((m) => ({ default: m.MusicPlayer })), { ssr: false })
const ClickHearts = dynamic(() => import("@/components/click-hearts").then((m) => ({ default: m.ClickHearts })), { ssr: false })
const HeroSection = dynamic(() => import("@/components/hero-section").then((m) => ({ default: m.HeroSection })), { ssr: false })
const TypewriterLetter = dynamic(() => import("@/components/typewriter-letter").then((m) => ({ default: m.TypewriterLetter })), { ssr: false })
const CountdownSection = dynamic(() => import("@/components/countdown-section").then((m) => ({ default: m.CountdownSection })), { ssr: false })
const LoveReasons = dynamic(() => import("@/components/love-reasons").then((m) => ({ default: m.LoveReasons })), { ssr: false })
const LoveTimeline = dynamic(() => import("@/components/love-timeline").then((m) => ({ default: m.LoveTimeline })), { ssr: false })
const HeartbeatSection = dynamic(() => import("@/components/heartbeat-section").then((m) => ({ default: m.HeartbeatSection })), { ssr: false })
const WishJar = dynamic(() => import("@/components/wish-jar").then((m) => ({ default: m.WishJar })), { ssr: false })
const LoveGame = dynamic(() => import("@/components/love-game").then((m) => ({ default: m.LoveGame })), { ssr: false })
const GallerySection = dynamic(() => import("@/components/gallery-section").then((m) => ({ default: m.GallerySection })), { ssr: false })
const FinaleSection = dynamic(() => import("@/components/finale-section").then((m) => ({ default: m.FinaleSection })), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })), { ssr: false })

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [envelopeDismissed, setEnvelopeDismissed] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<{ id: number; x: number; y: number; rotation: number; scale: number; color: string; shape: "circle" | "heart"; delay: number }[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  // Start audio on first user interaction (bypass browser autoplay policy)
  const audioStarted = useRef(false)

  useEffect(() => {
    const src = "/Nour-Ebrahim-/music/bg-audio.mp3"
    const handler = () => {
      if (audioStarted.current) return
      audioStarted.current = true
      startAudio(src)
      document.removeEventListener("click", handler)
      document.removeEventListener("touchstart", handler)
      document.removeEventListener("touchend", handler)
    }
    document.addEventListener("click", handler)
    document.addEventListener("touchstart", handler)
    document.addEventListener("touchend", handler)
    return () => {
      document.removeEventListener("click", handler)
      document.removeEventListener("touchstart", handler)
      document.removeEventListener("touchend", handler)
    }
  }, [])

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true)
  }, [])

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true)

    const colors = ["oklch(0.85 0.15 85)", "oklch(0.7 0.2 330)", "oklch(0.8 0.1 270)", "oklch(0.65 0.18 30)", "oklch(0.9 0.1 85)"]
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: -20 - Math.random() * 200,
      rotation: Math.random() * 720,
      scale: 0.3 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (Math.random() > 0.5 ? "heart" : "circle") as "circle" | "heart",
      delay: Math.random() * 1.5,
    }))
    setConfettiPieces(pieces)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}

      {splashDone && !isLoggedIn && <LoginOverlay onLogin={handleLogin} />}
      {isLoggedIn && !envelopeDismissed && <EnvelopeLetter onDismiss={() => setEnvelopeDismissed(true)} />}

      <ConfettiRain pieces={confettiPieces} show={showConfetti} />

      <TransitionProvider>
        {isLoggedIn && envelopeDismissed && (
          <>
            <ScrollProgressBar />
            <Particles />
            <FloatingPetals />
            <FloatingEmojis />
            <TwinklingStars />
            <ClickHearts />
            <FloatingNav />
            <MusicPlayer audioSrc="/Nour-Ebrahim-/music/bg-audio.mp3" />

            <div id="heartbeat" className="relative">
              <FloralBackground />
              <HeartbeatSection />
            </div>
            <OrnateDivider />

            <div id="hero"><HeroSection /></div>
            <OrnateDivider />

            <div id="letter" className="relative">
              <FloralBackground />
              <section className="relative py-8">
                <div className="container text-center">
                  <p className="font-display text-2xl md:text-4xl" style={{
                    background: "linear-gradient(135deg, oklch(0.85 0.15 85), oklch(0.7 0.2 330))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontStyle: "italic",
                  }}>
                    &ldquo;كل قصة حب جميلة، لكن قصتنا هي الأجمل&rdquo;
                  </p>
                </div>
              </section>
              <TypewriterLetter />
            </div>
            <OrnateDivider />

            <div id="countdown"><CountdownSection targetDate="2022-6-26" title="مدة حبنا" /></div>
            <OrnateDivider />

            <div id="reasons"><LoveReasons /></div>
            <OrnateDivider />

            <div id="timeline"><LoveTimeline /></div>
            <OrnateDivider />

            <div id="wishes"><WishJar /></div>
            <OrnateDivider />

            <div id="game"><LoveGame /></div>
            <OrnateDivider />

            <div id="gallery"><GallerySection /></div>
            <OrnateDivider />

            <div id="finale" className="relative">
              <FloralBackground />
              <FinaleSection />
            </div>

            <Footer />
          </>
        )}
      </TransitionProvider>
    </>
  )
}
