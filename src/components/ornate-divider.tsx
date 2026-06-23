"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function OrnateDivider() {
  const [type] = useState(Math.random() > 0.5 ? "heart" : "flower")

  return (
    <div className="py-4 md:py-6 flex flex-col items-center justify-center">
      {type === "heart" ? (
        <div className="flex items-center gap-4 w-full max-w-md mx-auto px-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24"
            className="text-primary"
            animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--color-primary)" opacity="0.2" />
          </motion.svg>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full max-w-md mx-auto px-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          <motion.svg
            width="20" height="20" viewBox="0 0 24 24"
            className="text-secondary"
            animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 6 }, (_, p) => {
              const angle = (p * 60 * Math.PI) / 180
              const cx = 12 + Math.cos(angle) * 8
              const cy = 12 + Math.sin(angle) * 8
              return (
                <ellipse key={p} cx={cx} cy={cy} rx={4} ry={2} fill="var(--color-secondary)" opacity="0.2" transform={`rotate(${p * 60}, ${cx}, ${cy})`} />
              )
            })}
            <circle cx="12" cy="12" r="2" fill="var(--color-primary)" opacity="0.3" />
          </motion.svg>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="w-1.5 h-1.5 rounded-full bg-primary/30"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: d * 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
