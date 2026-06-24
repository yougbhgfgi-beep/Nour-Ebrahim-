"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  shape: "circle" | "heart"
  delay: number
}

const colors = [
  "oklch(0.85 0.15 85)",  // gold
  "oklch(0.7 0.2 330)",   // rose
  "oklch(0.8 0.1 270)",   // lavender
  "oklch(0.65 0.18 30)",  // peach
  "oklch(0.9 0.1 85)",    // light gold
]

export function LoginConfetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [show, setShow] = useState(false)

  const fire = useCallback(() => {
    setShow(true)
    const newPieces: ConfettiPiece[] = []
    for (let i = 0; i < 80; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        rotation: Math.random() * 720,
        scale: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? "heart" : "circle",
        delay: Math.random() * 1.5,
      })
    }
    setPieces(newPieces)
    setTimeout(() => setShow(false), 5000)
  }, [])

  return { fire, show }
}

export function ConfettiRain({ pieces, show }: { pieces: ConfettiPiece[]; show: boolean }) {
  const [viewportHeight, setViewportHeight] = useState(800)

  useEffect(() => {
    setViewportHeight(window.innerHeight)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, p.scale, p.scale, 0.5],
                y: [0, viewportHeight + 100],
                rotate: [0, p.rotation],
              }}
              transition={{ duration: 3 + Math.random() * 2, delay: p.delay, ease: "easeIn" }}
            >
              {p.shape === "heart" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill={p.color}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <div
                  style={{
                    width: 8 + Math.random() * 6,
                    height: 8 + Math.random() * 6,
                    background: p.color,
                    borderRadius: "50%",
                    opacity: 0.8,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
