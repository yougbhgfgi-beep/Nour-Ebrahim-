"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, X } from "lucide-react"

const navItems = [
  { label: "البداية", href: "#hero" },
  { label: "رسالة حب", href: "#letter" },
  { label: "العد التنازلي", href: "#countdown" },
  { label: "أسباب حبي", href: "#reasons" },
  { label: "نبض القلب", href: "#heartbeat" },
  { label: "أمنيات", href: "#wishes" },
  { label: "لعبة", href: "#game" },
  { label: "ذكريات", href: "#gallery" },
  { label: "الخاتمة", href: "#finale" },
]

export function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className="fixed top-4 right-4 z-[999] glass-dark border border-primary/20 rounded-full p-3 hover:bg-card transition-all duration-300 glow-rose"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/40 backdrop-blur-sm z-[998]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 h-full w-72 z-[999] glass-dark p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Heart className="w-6 h-6 text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="block px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 transition-all duration-300 font-body text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="font-body text-xs text-muted-foreground">مصنوع بحب 💕</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
