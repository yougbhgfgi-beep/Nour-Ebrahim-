"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart } from "lucide-react"

export function HeroSection() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep Ambient Lighting */}
      <div className="hero-bg-glow absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-glow opacity-60 mask-radial-fade" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="mb-6 relative inline-block"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--color-primary)" className="relative mx-auto drop-shadow-[0_0_15px_var(--color-primary)]">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight tracking-tight text-gradient font-bold drop-shadow-md"
        >
          𝑵𝒐𝒖𝒓 & 𝑬𝒃𝒓𝒂𝒉𝒊𝒎
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-arabic text-xl md:text-3xl text-foreground/70 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          حبك هو أجمل ما في حياتي، أنت كل شيء بالنسبة لي 💕
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setShowPopup(true)}
            className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 glow-gold cursor-pointer"
          >
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="absolute inset-0 border border-primary/50 rounded-full" />
            <span className="relative z-10 font-arabic text-lg font-medium text-primary group-hover:text-background transition-colors duration-500">
              افتح قلبي يا حبيبي ❤️
            </span>
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50 font-inter">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent relative">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Love Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="glass-dark border border-primary/30 rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center glow-rose relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background animations */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2.5s" }} />

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
              >
                <Heart className="w-20 h-20 mx-auto text-primary drop-shadow-[0_0_15px_var(--color-primary)]" fill="var(--color-primary)" />
              </motion.div>

              <h2 className="font-display text-3xl md:text-5xl mb-6 leading-tight text-gradient font-bold drop-shadow-md">
                بحبك يا حبيبي 💕
              </h2>

              <p className="font-arabic text-lg md:text-xl text-white/90 leading-relaxed max-w-md mx-auto mb-8 drop-shadow">
                أنت كل حاجة حلوة في حياتي، وأجمل شيء حصل ليّ.
                قلبي ملكك من أول يوم، وهيفضل ملكك للأبد. 💖
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPopup(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/40 text-foreground font-arabic text-lg font-medium shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
              >
                بحبك 💕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
