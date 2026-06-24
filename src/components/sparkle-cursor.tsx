"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function SparkleCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] blur-xl"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", background: "var(--color-primary)" }}
      />
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] blur-lg"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", background: "var(--color-accent)" }}
      />
    </>
  )
}
