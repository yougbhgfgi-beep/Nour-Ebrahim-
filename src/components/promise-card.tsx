"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface PromiseCardProps {
  promise: string
  index: number
}

export function PromiseCard({ promise, index }: PromiseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-dark border border-primary/20 rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <Heart className="w-24 h-24 text-primary" fill="var(--color-primary)" />
      </div>

      <div className="relative z-10">
        <div className="font-display text-xs text-muted-foreground mb-2">
          وعد #{index + 1}
        </div>
        <p className="font-body text-sm leading-relaxed italic">
          &ldquo;{promise}&rdquo;
        </p>
      </div>
    </motion.div>
  )
}
