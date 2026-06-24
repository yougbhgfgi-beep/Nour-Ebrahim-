"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "reveal" | "exit">("enter")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 400)
    const t2 = setTimeout(() => setPhase("exit"), 1400)
    const t3 = setTimeout(() => onFinish(), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.02 0.004 300)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.85 0.15 85 / 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 50% 60%, oklch(0.7 0.2 330 / 0.03) 0%, transparent 50%)
            `
          }} />

          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              animate={phase === "reveal" ? { scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] } : { opacity: 0.4, scale: 1 }}
              transition={{ duration: 2, repeat: phase === "reveal" ? Infinity : 0, ease: "easeInOut" }}
              className="mb-6"
            >
              <Heart
                className="w-16 h-16 mx-auto"
                style={{
                  color: "oklch(0.85 0.15 85)",
                  filter: "drop-shadow(0 0 30px oklch(0.85 0.15 85 / 0.3))",
                  opacity: phase === "reveal" ? 1 : 0.3,
                }}
                fill="oklch(0.85 0.15 85)"
              />
            </motion.div>

            <motion.h1
              className="font-display text-3xl md:text-5xl mb-3"
              style={{
                background: "linear-gradient(135deg, oklch(0.85 0.15 85), oklch(0.7 0.2 330))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              قصة حبنا
            </motion.h1>

            <motion.p
              className="font-body text-sm tracking-[0.3em]"
              style={{ color: "oklch(0.85 0.15 85 / 0.3)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0.5 : 0 }}
              transition={{ duration: 0.8 }}
            >
              أَحْلَى قِصَّةِ حُب
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.85 0.15 85 / 0.4)" }}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: d * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
