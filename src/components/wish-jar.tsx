"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const defaultWishes = [
  "يارب تفضل دايماً في حياتي 🤲",
  "يارب تتحقق كل أحلامنا 🤲",
  "يارب تسعدنا في الدنيا والآخرة 🤲",
  "يارب تخلي لنا بعض 🤲",
  "يارب نعيش طول العمر في حب وسعادة 🤲",
  "يارب يبعد عننا كل شر 🤲",
  "يارب نفضل سوا لحد ما نشيب 🤲",
  "يارب نزور كل البلاد الحلوة سوا 🤲",
]

interface WishJarProps {
  wishes?: string[]
}

export function WishJar({ wishes = defaultWishes }: WishJarProps) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const advance = () => {
    setIndex((prev) => (prev + 1) % wishes.length)
    setProgress(0)
  }

  return (
    <section className="py-8 md:py-12 container text-center">
      <h2 className="font-display text-3xl md:text-5xl text-gradient mb-6">
        جرة الأمنيات
      </h2>

      <motion.div
        className="max-w-xs mx-auto"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass-dark border border-primary/20 rounded-t-[5rem] rounded-b-2xl p-8 glow-rose relative overflow-hidden" style={{ minHeight: "280px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, var(--color-primary) / 0.05 100%)" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="font-display text-lg md:text-xl leading-relaxed px-4"
              >
                {wishes[index]}
              </motion.p>
            </AnimatePresence>

            <motion.div
              className="mt-6 w-3/4 h-1 rounded-full overflow-hidden bg-muted"
              initial={{ width: "75%" }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                onAnimationComplete={() => {}}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={advance}
        whileHover={{ scale: 1.02 }}
        className="mt-8 px-8 py-3 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all duration-300 glow-rose font-body"
      >
        <Heart className="w-4 h-4 inline ml-2" fill="var(--color-primary)" />
        أمنية جديدة
      </motion.button>
    </section>
  )
}
