"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function CornerDecorations() {
  const corners = useMemo(() => [
    { id: "tl", className: "top-0 left-0 rotate-0", delay: 0 },
    { id: "tr", className: "top-0 right-0 rotate-90", delay: 0.3 },
    { id: "bl", className: "bottom-0 left-0 -rotate-90", delay: 0.6 },
    { id: "br", className: "bottom-0 right-0 rotate-180", delay: 0.9 },
  ], [])

  return (
    <>
      {corners.map((c) => (
        <motion.div
          key={c.id}
          className={`fixed ${c.className} z-20 pointer-events-none opacity-20`}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path d="M10 10 L70 10 M10 10 L10 70" stroke="var(--color-primary)" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M10 10 Q30 15 35 30 Q40 15 60 10" stroke="var(--color-secondary)" strokeWidth="0.8" fill="none" />
            <circle cx="10" cy="10" r="3" fill="var(--color-primary)" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      <motion.div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-6 h-6 text-primary/30" fill="var(--color-primary)" />
      </motion.div>
    </>
  )
}
