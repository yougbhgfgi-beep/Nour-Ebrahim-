"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw } from "lucide-react"

const emojiPairs = ["💕", "💖", "💗", "🌹", "💫", "✨", "🥰", "💝"]

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const createCards = (): Card[] => {
  const cards: Card[] = []
  emojiPairs.forEach((emoji, i) => {
    cards.push({ id: i * 2, emoji, isFlipped: false, isMatched: false })
    cards.push({ id: i * 2 + 1, emoji, isFlipped: false, isMatched: false })
  })
  return cards.sort(() => Math.random() - 0.5)
}

const winMessages = [
  "يا حبيبي،\nكل حرف في هذه الكلمات يبحث عنك.\nكل نبضة في قلبي تحمل اسمك.",
  "أنت لست مجرد شخص في حياتي،\nأنت الحياة التي اخترتها بكل حواسي.\nأنت اليقين في زمن السؤال.",
  "أحب فيك ضحكتك التي تشبه الصباح،\nوصمتك الذي يفهمني قبل الكلام،\nوحضنك الذي هو ملاذي الأول والأخير.",
  "سأظل أحبك يا حبيبي\nليس لأنني مضطرة، بل لأن قلبي\nلم يعد يعرف كيف يحب غيرك.",
]

export function LoveGame() {
  const [cards, setCards] = useState<Card[]>(createCards)
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  const handleFlip = (id: number) => {
    if (isChecking || flipped.includes(id) || cards.find((c) => c.id === id)?.isMatched) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)
    setMoves((m) => m + 1)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [first, second] = newFlipped
      const card1 = cards.find((c) => c.id === first)!
      const card2 = cards.find((c) => c.id === second)!

      if (card1.emoji === card2.emoji) {
        setCards((prev) => prev.map((c) => (c.id === first || c.id === second ? { ...c, isMatched: true } : c)))
        setFlipped([])
        setIsChecking(false)

        const remaining = cards.filter((c) => c.id !== first && c.id !== second && !c.isMatched)
        if (remaining.length === 0) {
          setWon(true)
          setMsgIndex(Math.floor(Math.random() * winMessages.length))
        }
      } else {
        setTimeout(() => {
          setFlipped([])
          setIsChecking(false)
        }, 800)
      }
    }
  }

  const reset = () => {
    setCards(createCards())
    setFlipped([])
    setMoves(0)
    setWon(false)
    setIsChecking(false)
  }

  return (
    <section className="py-8 md:py-12 container text-center">
      <h2 className="font-display text-3xl md:text-5xl text-gradient mb-2">
        لعبة الذاكرة 🧠
      </h2>
      <p className="font-body text-muted-foreground mb-4">حركات: {moves}</p>

      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || card.isMatched

          return (
            <motion.button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all duration-300 ${isFlipped ? "glass glow-rose" : "bg-muted hover:bg-muted/80"}`}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <AnimatePresence mode="wait">
                {isFlipped ? (
                  <motion.span
                    key="front"
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    exit={{ scale: 0, rotateY: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <motion.span
                    key="back"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    ❓
                  </motion.span>
                )}
              </AnimatePresence>
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
