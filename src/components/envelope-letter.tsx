"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X, ArrowLeft } from "lucide-react"

interface EnvelopeLetterProps {
  onDismiss: () => void
}

export function EnvelopeLetter({ onDismiss }: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [autoDismiss, setAutoDismiss] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)

  const letterContent = `26/6/2022

بص يا عمري، إحنا بقالنا زمن عارفين بعض، ويوم ما دخلت حياتي كان بشكل مفاجئ ومن غير أي ترتيب، مجرد صدفة… بس الصدفة دي كانت أحلى وأجمل صدفة حصلتلي في عمري كله، لأن من خلالها عرفت أحنّ وأطيب وأجمل قلب شافه قلبي، يا نبض قلبي كله 🥺♥️
عايزة أقولك إن من يوم ما عرفتك، وأنت بقيت كل حاجة ليا… بقيت حبيبي، وصاحبي، وسندي، وكل دنيتي 🌍💕
بقيت الحياة اللي بحب أعيشها عشانها، وبقيت الأمان اللي بطمن بيه.
أنا بحبك أوي… بحب حنيتك عليا، وكلامك اللي بيدخل قلبي من غير استئذان، بحب ضحكتك، وبحب غيرتك عليا، وبحب فيك كل حاجة، بحبك كلك على بعضك كده 🌹💞
أنت أجمل حاجة طلعت بيها من الدنيا دي، وأغلى نعمة ربنا رزقني بيها، أنت الأكسجين اللي بتنفسه، والنبض اللي بيخلّي قلبي يعيش 🫀💕
والأيام بتجري وإنت معايا يا عمري، وإن شاء الله تفضل معايا طول العمر، ونكمّل حياتنا سوا، ونبني بيتنا وحلمنا بإيدينا إحنا الاتنين 🏠🌍❤️😘
ربنا يخليك ليا، ويديمك نعمة في حياتي، وما يحرمنيش منك أبدًا يا روح قلبي ونبض عيني 🤍🌍🏠😘
وبختمها بكلمة واحدة… بحبك جدًا جدًا ♥️🌚`

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      let i = 0
      setTypedText("")
      setTypingDone(false)
      const interval = setInterval(() => {
        if (i < letterContent.length) {
          setTypedText(letterContent.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isOpen, letterContent])

  useEffect(() => {
    // Lock scroll when envelope is shown
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => onDismiss(), 1000)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, onDismiss])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[9998] flex items-center justify-center gradient-bg-soft"
        data-envelope="true"
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, var(--color-secondary) / 0.1 0%, transparent 60%)" }} />

        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 text-center cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <div className="w-40 h-32 md:w-52 md:h-40 relative mx-auto glass-dark border border-primary/20 rounded-xl flex items-center justify-center glow-rose hover:scale-105 transition-transform duration-300">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-16 h-16 md:w-20 md:h-20 text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
                </motion.div>
                <motion.div
                  className="absolute top-2 left-2"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-lg">✨</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-display text-xl md:text-2xl text-foreground"
            >
              اضغط على الظرف 💌
            </motion.p>

            <motion.div
              className="mt-4"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowLeft className="w-6 h-6 mx-auto text-primary" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-md mx-auto px-4"
          >
            <div className="glass-dark border border-primary/20 rounded-3xl p-6 md:p-12 glow-rose flex flex-col max-h-[90vh]">
              <button
                onClick={() => setAutoDismiss(true)}
                className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 text-center flex-shrink-0"
              >
                <Heart className="w-10 h-10 mx-auto text-primary" fill="var(--color-primary)" style={{ opacity: 0.3 }} />
              </motion.div>

              <h2 className="font-display text-3xl md:text-4xl text-gradient text-center mb-4 flex-shrink-0">
                𝑯𝒂𝒃𝒊𝒃𝒚 💕
              </h2>

              <div className="text-right font-handwritten text-sm md:text-base leading-relaxed flex-1 overflow-y-auto min-h-0 max-w-full" style={{ fontFeatureSettings: "'kern' 1" }}>
                <p className="whitespace-pre-line break-words" dir="rtl">{typedText}</p>
                {!typingDone && (
                  <span className="inline-block w-[2px] h-4 bg-primary animate-pulse mr-1 align-middle" />
                )}
              </div>

              {typingDone && (
                <div className="mt-4 pt-2 text-center flex-shrink-0">
                  <motion.button
                    onClick={() => setAutoDismiss(true)}
                    whileHover={{ scale: 1.02 }}
                    className="px-8 py-3 rounded-full bg-primary/20 border border-primary/40 hover:bg-primary/30 transition-all duration-300 glow-rose font-body"
                  >
                    ابدأ استكشاف القصة
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
