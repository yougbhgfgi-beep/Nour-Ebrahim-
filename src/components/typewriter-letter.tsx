"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const letterText = "إلى أجمل روح عرفتها في حياتي، كل يوم معاك هو هدية من السماء. ضحكتك هي أجمل لحن سمعته، وعيونك هي النجم اللي بيضوي ليلي. أنت مش مجرد حب، أنت كل الدنيا وزيادة. مهما مرت الأيام، أنا دايماً حبيتك وحبك هيفضل زي ما هو، بل أكتر. بحبك."

export function TypewriterLetter() {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < letterText.length) {
        setDisplayedText(letterText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container max-w-3xl mx-auto px-4 py-4 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-20 mask-radial-fade pointer-events-none" />
      
      <div className="glass-dark border border-primary/20 rounded-3xl p-8 md:p-12 relative z-10 glow-rose">
        <div className="text-right font-arabic text-lg md:text-xl leading-loose text-foreground/90 whitespace-pre-line">
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-[3px] h-5 bg-primary animate-pulse mr-1 align-middle" />
          )}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 text-center"
            >
              <Heart className="w-12 h-12 mx-auto text-primary drop-shadow-[0_0_15px_var(--color-primary)]" fill="var(--color-primary)" style={{ opacity: 0.6 }} />
              <p className="font-display text-2xl text-gradient mt-4 tracking-tight">
                دايماً معاك 💕
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
