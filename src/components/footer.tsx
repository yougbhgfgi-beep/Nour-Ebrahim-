"use client"

import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <Heart className="w-4 h-4 text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
          <span className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>
        <p className="font-body text-sm text-muted-foreground">
           معمول بحب مالوش حدود، عشانك إنت 💕
        </p>
      </div>
    </footer>
  )
}
