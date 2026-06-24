"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface HeartData {
  id: number
  x: number
  y: number
  size: number
  color: string
}

const colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)", "var(--color-wine)", "var(--color-plum)"]

export function ClickHearts() {
  const [hearts, setHearts] = useState<HeartData[]>([])
  let idCounter = 0

  const addHeart = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("[data-envelope]")) return

    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + idCounter++,
      x: e.clientX + (Math.random() - 0.5) * 60,
      y: e.clientY + (Math.random() - 0.5) * 40,
      size: 16 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)))
    }, 2000)
  }, [])

  useEffect(() => {
    window.addEventListener("click", addHeart)
    return () => window.removeEventListener("click", addHeart)
  }, [addHeart])

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute"
            style={{ left: h.x, top: h.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ y: h.y - 120, scale: [0, 1, 0], opacity: [1, 0.8, 0], rotate: (Math.random() - 0.5) * 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Heart style={{ width: h.size, height: h.size }} fill={h.color} color={h.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
