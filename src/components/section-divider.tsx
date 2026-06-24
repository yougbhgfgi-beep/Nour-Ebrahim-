"use client"

import { motion } from "framer-motion"

export function SectionDivider() {
  return (
    <div className="py-8 md:py-12 flex items-center justify-center gap-4">
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <motion.svg
        width="16" height="16" viewBox="0 0 24 24"
        className="text-primary"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="var(--color-primary)" opacity="0.2" />
      </motion.svg>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}
