"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

const emojis = ["💕", "💖", "🌸", "✨"]

export function FloatingEmojis() {
  const items = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      emoji: emojis[i],
      x: 15 + i * 25,
      delay: i * 3,
      duration: 14 + i * 2,
      size: 14 + i * 4,
    })),
  [])

  return (
    <div className="fixed inset-0 z-[15] pointer-events-none overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, bottom: "-30px" }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight + 200 : 1000)],
            opacity: [0, 0.4, 0],
          }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
        >
          <span style={{ fontSize: item.size }}>{item.emoji}</span>
        </motion.div>
      ))}
    </div>
  )
}
