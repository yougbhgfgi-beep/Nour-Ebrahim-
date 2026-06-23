"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function FloralBackground() {
  const flowers = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 30 + Math.random() * 40,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ top: `${f.top}%`, left: `${f.left}%` }}
          animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: "linear" }}
        >
          <svg width={f.size} height={f.size} viewBox="0 0 40 40" opacity="0.02">
            {Array.from({ length: 6 }, (_, p) => {
              const angle = (p * 60 * Math.PI) / 180
              const cx = 20 + Math.cos(angle) * 10
              const cy = 20 + Math.sin(angle) * 10
              return (
                <ellipse
                  key={p}
                  cx={cx}
                  cy={cy}
                  rx={6}
                  ry={3}
                  fill="var(--color-primary)"
                  transform={`rotate(${p * 60}, ${cx}, ${cy})`}
                />
              )
            })}
            <circle cx="20" cy="20" r="3" fill="var(--color-secondary)" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export function RoseDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="w-4 h-4 text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
      </motion.div>
      <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
    </div>
  )
}
