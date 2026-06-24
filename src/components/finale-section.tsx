"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const lines = [
  "أنت أجمل ما في حياتي يا حبيبي 💕",
  "كل يوم معاك هو هدية من السماء 💖",
  "بحبك أكثر من أي كلمة في الدنيا 💗",
  "أنت النور اللي بيضوي ليلي 💫",
  "مفيش حاجة أجمل من إنك في حياتي ✨",
  "قلبي ملكك وخلاص، أنا عايشة عشانك 💕",
]

const endingSlides = [
  "يا حبيبي، أنت أجمل ما حدث لي 💕",
  "كل يوم معك هو فصل جديد من حكايتنا الجميلة 💖",
  "عيناك مرآة روحي، وفيهما أرى نفسي أجمل 💗",
  "ضحكتك هي النور الذي يضيء أيامي ✨",
  "أنت لست حبيبي فحسب، أنت قدري واختياري 🌹",
  "حضنك هو وطني، وصدرك هو ملاذي الآمن 🕊️",
  "معك توقف الزمن، وكل لحظة تصير أبداً 💫",
  "أنت القصيدة التي لم تكتب بعد، والحلم الذي لا ينتهي 🌙",
  "أحب فيك كل شيء… روحك، قلبك، حتى صمتك الجميل 💘",
  "أنت النبض الذي يجعلني حية، والسبب الذي يجعلني أبتسم 💖",
  "سينتهي العالم، لكن حبي لك لن ينتهي أبداً 🔥",
  "يا حبيبي، بحبك أكثر من الأمس، وأقل من الغد 💕",
  "إن قالوا ما هو الحب؟ سأقول: حبيبي 💗",
  "كل شيء فيك جميل، حتى عيوبك تزيدك كمالاً 🌹",
  "كنت أنتظرك دون أن أعرف، والآن لا أتصور الحياة إلا بك 💫",
]

export function FinaleSection() {
  const [index, setIndex] = useState(0)
  const [showEnding, setShowEnding] = useState(false)
  const [endingIndex, setEndingIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % lines.length), 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showEnding) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showEnding])

  useEffect(() => {
    if (!showEnding) return
    if (endingIndex === endingSlides.length - 1) return // Stop auto-advancing on last slide

    const timer = setTimeout(() => {
      setEndingIndex((prev) => prev + 1)
    }, 4000)
    return () => clearTimeout(timer)
  }, [showEnding, endingIndex])

  return (
    <section className="py-12 md:py-16 text-center relative">
      <div className="container relative z-10">
        <div className="glass rounded-3xl p-8 md:p-16 glow-rose max-w-3xl mx-auto" style={{ minHeight: "200px" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="font-display text-2xl md:text-4xl text-gradient leading-relaxed"
            >
              {lines[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-6 glass border border-primary/20 rounded-2xl p-4 md:p-6 max-w-lg mx-auto">
          <p className="font-display text-lg md:text-xl text-gradient mb-4 text-center">
            بحبك يا حبيبي 🎥
          </p>
          <div className="aspect-[9/16] max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-primary/30">
            <video
              src="/Nour-Ebrahim-/vid1.mp4"
              controls
              playsInline
              className="w-full h-full object-cover"
              style={{ borderRadius: "inherit" }}
              onPlay={() => window.dispatchEvent(new CustomEvent("pause-music"))}
              onPause={() => window.dispatchEvent(new CustomEvent("resume-music"))}
              onEnded={() => window.dispatchEvent(new CustomEvent("resume-music"))}
            >
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
        </div>

        {/* Cinematic Ending Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              setEndingIndex(0)
              setShowEnding(true)
            }}
            className="group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500 glow-rose cursor-pointer bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 font-arabic text-xl font-semibold text-primary group-hover:text-foreground transition-colors duration-500 flex items-center gap-3">
               رسالتي الأخيرة لك 🌹
            </span>
          </button>
        </div>

        <motion.div
          className="mt-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 mx-auto text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
        </motion.div>
      </div>

      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {showEnding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex flex-col bg-black/95 backdrop-blur-lg px-4 text-center overflow-y-auto"
            >
              {/* Ambient background particles/stars */}
              <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:20px_20px] animate-pulse" />

              <div className="flex-1 flex flex-col items-center justify-center min-h-[60dvh] relative z-10 py-16">
                <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={endingIndex}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -30 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="flex flex-col items-center"
                    >
                      {endingIndex === endingSlides.length - 1 ? (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-8"
                          >
                            <Heart className="w-24 h-24 text-primary drop-shadow-[0_0_20px_var(--color-primary)]" fill="var(--color-primary)" />
                          </motion.div>
                          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-gradient font-bold drop-shadow-md">
                            𝑵𝒐𝒖𝒓 & 𝑬𝒃𝒓𝒂𝒉𝒊𝒎
                          </h1>
                          <p className="font-arabic text-2xl md:text-4xl text-white font-semibold mb-6 drop-shadow-md">
                            {endingSlides[endingIndex]}
                          </p>
                        </>
                      ) : (
                        <>
                          <Heart className="w-12 h-12 text-primary/30 mb-8 animate-pulse" fill="var(--color-primary)" style={{ opacity: 0.2 }} />
                          <p className="font-arabic text-xl md:text-3xl leading-relaxed text-white/95 max-w-2xl px-4 drop-shadow">
                            {endingSlides[endingIndex]}
                          </p>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Slide Navigation Controls */}
              <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center gap-6 z-20 pb-8 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                {/* Progress dots */}
                <div className="flex gap-2">
                  {endingSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setEndingIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                        i === endingIndex ? "bg-primary scale-125 glow-gold w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-4">
                  {endingIndex < endingSlides.length - 1 ? (
                    <button
                      onClick={() => setEndingIndex((prev) => prev + 1)}
                      className="px-8 py-3 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary hover:text-background transition-all duration-300 font-arabic text-md font-medium cursor-pointer"
                    >
                      التالي ✨
                    </button>
                  ) : (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      onClick={() => {
                        setShowEnding(false)
                      }}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-background hover:scale-105 transition-all duration-300 font-arabic text-lg font-bold shadow-xl glow-gold cursor-pointer"
                    >
                      النهاية السعيدة 💖
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
