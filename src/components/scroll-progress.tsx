"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10000] h-[2px] origin-left"
      style={{
        scaleX: scaleY,
        background: "linear-gradient(90deg, oklch(0.85 0.15 85), oklch(0.7 0.2 330), oklch(0.85 0.15 85))",
        boxShadow: "0 0 10px oklch(0.85 0.15 85 / 0.3)",
      }}
    />
  )
}
