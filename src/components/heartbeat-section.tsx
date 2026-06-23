"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

const loveMessages = [
  "بحبك يا حبيبي 💕",
  "بحبك أكثر من أي شيء في الدنيا 💖",
  "يا حبيبي، بحبك وقلبي ملكك 💗",
  "كل حرف في بحبك مش كفاية عشان أوصف حبي ليك 💫",
  "بحبك يا أجمل إنسان في الكون ✨",
  "يا حبيبي، أنت كل حياتي وزيادة 🌹",
  "بحبك… كلمة صغيرة لكنها تعني كل شيء 💕",
  "أنا عايشة عشانك وبحبك يا حبيبي 💖",
]

export function HeartbeatSection() {
  const [clicked, setClicked] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")

  const handleClick = useCallback(() => {
    if (!clicked) {
      setClicked(true)
      setCurrentMessage(loveMessages[Math.floor(Math.random() * loveMessages.length)])
    }
  }, [clicked])

  return (
    <section className="py-8 md:py-12 text-center relative">
      <div className="container relative z-10">
        {/* Name Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-4 text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gradient font-bold tracking-wide mb-2">
            Nour & حبيبي
          </h2>
          <p className="font-arabic text-md md:text-lg text-muted-foreground tracking-wide">
            نبضات قلبينا تعزف لحناً واحداً إلى الأبد ♾️
          </p>
          <div className="w-32 h-px mx-auto mt-4 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        <button
          onClick={handleClick}
          className="relative inline-flex flex-col items-center gap-4 group cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Heart className="w-24 h-24 md:w-32 md:h-32 text-primary transition-transform duration-300 group-hover:scale-110" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1, 0], y: [-20, -40, -60] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 left-1/2 -translate-x-1/2"
          >
            <Sparkles className="w-5 h-5 text-gold" />
          </motion.div>

          {!clicked ? (
            <p className="font-display text-xl md:text-2xl text-gradient mt-4">
              اضغط على القلب 💓
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-display text-2xl md:text-3xl text-gradient mt-6 font-bold"
            >
              {currentMessage}
            </motion.p>
          )}
        </button>
      </div>
    </section>
  )
}
