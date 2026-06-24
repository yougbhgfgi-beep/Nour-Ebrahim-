"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw, Star } from "lucide-react"

interface Point {
  x: number
  y: number
  id: number
}

const NUM_STARS = 8

const generateStars = (): Point[] => {
  const points: Point[] = []
  const cols = 4
  for (let i = 0; i < NUM_STARS; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = 10 + col * 25 + Math.random() * 10
    const y = 10 + row * 35 + Math.random() * 10
    points.push({ x, y, id: i + 1 })
  }
  return points.sort(() => Math.random() - 0.5).map((p, i) => ({ ...p, id: i + 1 }))
}

const winMessages = [
  "يا حبيبي،\nكل حرف في هذه الكلمات يبحث عنك.\nكل نبضة في قلبي تحمل اسمك.",
  "أنت لست مجرد شخص في حياتي،\nأنت الحياة التي اخترتها بكل حواسي.\nأنت اليقين في زمن السؤال.",
  "أحب فيك ضحكتك التي تشبه الصباح،\nوصمتك الذي يفهمني قبل الكلام،\nوحضنك الذي هو ملاذي الأول والأخير.",
  "سأظل أحبك يا حبيبي\nليس لأنني مضطرة، بل لأن قلبي\nلم يعد يعرف كيف يحب غيرك.",
]

export function LoveGame() {
  const [stars] = useState<Point[]>(generateStars)
  const [clicked, setClicked] = useState<number[]>([])
  const [won, setWon] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  const handleClick = (id: number) => {
    if (won) return
    const next = clicked.length + 1
    if (id !== next) return
    const newClicked = [...clicked, id]
    setClicked(newClicked)
    if (newClicked.length === NUM_STARS) {
      setWon(true)
      setMsgIndex(Math.floor(Math.random() * winMessages.length))
    }
  }

  const reset = () => {
    setClicked([])
    setWon(false)
  }

  const sorted = useMemo(() => [...stars].sort((a, b) => a.id - b.id), [stars])

  const getStarPos = (id: number) => {
    const star = stars.find((s) => s.id === id)
    return star ? { x: `${star.x}%`, y: `${star.y}%` } : { x: "50%", y: "50%" }
  }

  return (
    <section className="py-8 md:py-12 container text-center">
      <h2 className="font-display text-3xl md:text-5xl text-gradient mb-2">
        لعبة توصيل النجوم ⭐
      </h2>
      <p className="font-body text-muted-foreground mb-4">
        اضغط على النجوم بالترتيب من 1 إلى {NUM_STARS}
      </p>

      <div className="relative w-full max-w-sm mx-auto aspect-square glass-dark border border-primary/20 rounded-3xl p-4 glow-rose">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ padding: "4%" }}>
          {clicked.slice(0, -1).map((id, i) => {
            const from = stars.find((s) => s.id === id)
            const to = stars.find((s) => s.id === clicked[i + 1])
            if (!from || !to) return null
            return (
              <line
                key={`line-${id}`}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="oklch(0.85 0.15 85 / 0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_4px_oklch(0.85_0.15_85/_0.4)]"
              />
            )
          })}
        </svg>

        {stars.map((star) => {
          const isClicked = clicked.includes(star.id)
          return (
            <motion.button
              key={star.id}
              onClick={() => handleClick(star.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              disabled={isClicked}
            >
              <div className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 ${isClicked ? "bg-primary/30 border-2 border-primary shadow-[0_0_15px_oklch(0.85_0.15_85/_0.5)]" : "bg-muted/80 border border-primary/20 hover:border-primary/40"}`}>
                <Star className={`w-5 h-5 md:w-6 md:h-6 ${isClicked ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                <span className={`absolute text-xs md:text-sm font-bold ${isClicked ? "text-foreground" : "text-muted-foreground"}`}>
                  {star.id}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        onClick={reset}
        whileHover={{ scale: 1.02 }}
        className="mt-4 px-6 py-3 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all duration-300 glow-rose font-body inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        إعادة
      </motion.button>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <motion.div
              className="rounded-3xl p-8 md:p-10 text-center relative overflow-hidden max-w-md mx-4"
              style={{
                background: "linear-gradient(135deg, oklch(0.05 0.01 300 / 0.95), oklch(0.08 0.015 330 / 0.95))",
                border: "1px solid oklch(0.85 0.15 85 / 0.2)",
                backdropFilter: "blur(20px)",
              }}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, oklch(0.85 0.15 85 / 0.3), transparent 70%)",
                }}
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mb-6"
              >
                <Heart className="w-14 h-14 mx-auto" fill="oklch(0.85 0.15 85)" style={{ color: "oklch(0.85 0.15 85 / 0.3)" }} />
              </motion.div>

              <motion.p
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-base md:text-lg leading-[2] mb-6 whitespace-pre-line"
                style={{ color: "oklch(0.85 0.08 85)" }}
              >
                {winMessages[msgIndex]}
              </motion.p>

              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.02 }}
                className="px-8 py-3 rounded-full font-body text-sm inline-flex items-center gap-2 transition-all duration-300"
                style={{
                  background: "oklch(0.85 0.15 85 / 0.1)",
                  border: "1px solid oklch(0.85 0.15 85 / 0.3)",
                  color: "oklch(0.85 0.15 85)",
                }}
              >
                <Heart className="w-3.5 h-3.5" fill="oklch(0.85 0.15 85)" style={{ color: "oklch(0.85 0.15 85 / 0.5)" }} />
                لعبة تانية
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
