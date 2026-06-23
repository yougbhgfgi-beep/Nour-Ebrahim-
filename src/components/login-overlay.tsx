"use client"

import { type FormEvent, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowLeft } from "lucide-react"

interface LoginOverlayProps {
  onLogin: () => void
}

function convertArabicToEnglishDigits(str: string): string {
  const arabicDigits = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(arabicDigits[i], i.toString()).replace(persianDigits[i], i.toString());
  }
  return result;
}

export function LoginOverlay({ onLogin }: LoginOverlayProps) {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")
    
    const d = convertArabicToEnglishDigits(day.trim()).replace(/^0+/, "")
    const m = convertArabicToEnglishDigits(month.trim()).replace(/^0+/, "")
    const y = convertArabicToEnglishDigits(year.trim()).replace(/^0+/, "")
    
    if (d === "10" && m === "4" && y === "2006") {
      setIsSubmitting(true)
      setTimeout(() => onLogin(), 1200)
    } else {
      setError("💔 كلمة سر غلط، حاولي تاني")
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.03 0.008 290)" }}
      >
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 20%, oklch(0.85 0.15 85 / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 80%, oklch(0.7 0.2 330 / 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 50%, oklch(0.85 0.15 85 / 0.04) 0%, transparent 50%)
          `
        }} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-md mx-auto px-4"
        >
          <div className="relative rounded-3xl p-[1px]" style={{ background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.4), oklch(0.7 0.2 330 / 0.2), oklch(0.85 0.15 85 / 0.4))" }}>
            <div className="rounded-3xl p-8 md:p-12" style={{ background: "oklch(0.05 0.005 290 / 0.85)" }}>
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 relative flex justify-center"
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "radial-gradient(circle, oklch(0.85 0.15 85 / 0.2) 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 rounded-full blur-xl"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "oklch(0.85 0.15 85 / 0.2)" }}
                  />
                  <Heart className="relative w-16 h-16" style={{ color: "oklch(0.85 0.15 85)", filter: "drop-shadow(0 0 20px oklch(0.85 0.15 85 / 0.4))" }} fill="oklch(0.85 0.15 85)" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-4xl md:text-5xl mb-4 leading-relaxed text-center"
                style={{
                  background: "linear-gradient(135deg, oklch(0.9 0.15 85), oklch(0.75 0.2 330), oklch(0.85 0.15 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                حبيبي
                <br />
                نورت المكان
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center mb-10 font-body text-sm tracking-wide"
                style={{ color: "oklch(0.6 0.02 290)" }}
              >
                أكتبي كلمة السر عشان تفتحي المفاجأة
              </motion.p>

              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="flex gap-3 justify-center items-center" dir="ltr">
                  <div className="relative group w-20">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      value={day}
                      onChange={(e) => { setDay(e.target.value); setError("") }}
                      placeholder="DD"
                      className="w-full h-14 rounded-2xl text-center text-lg placeholder:text-center font-body tracking-widest transition-all duration-300"
                      style={{
                        background: "oklch(0.08 0.005 290 / 0.6)",
                        border: "1px solid oklch(0.85 0.15 85 / 0.15)",
                        color: "oklch(0.97 0.01 290)",
                      }}
                      autoFocus
                      onFocus={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.4)"}
                      onBlur={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.15)"}
                    />
                  </div>
                  <span className="text-2xl" style={{ color: "oklch(0.85 0.15 85 / 0.4)" }}>/</span>
                  <div className="relative group w-20">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={2}
                      value={month}
                      onChange={(e) => { setMonth(e.target.value); setError("") }}
                      placeholder="MM"
                      className="w-full h-14 rounded-2xl text-center text-lg placeholder:text-center font-body tracking-widest transition-all duration-300"
                      style={{
                        background: "oklch(0.08 0.005 290 / 0.6)",
                        border: "1px solid oklch(0.85 0.15 85 / 0.15)",
                        color: "oklch(0.97 0.01 290)",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.4)"}
                      onBlur={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.15)"}
                    />
                  </div>
                  <span className="text-2xl" style={{ color: "oklch(0.85 0.15 85 / 0.4)" }}>/</span>
                  <div className="relative group w-28">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={year}
                      onChange={(e) => { setYear(e.target.value); setError("") }}
                      placeholder="YYYY"
                      className="w-full h-14 rounded-2xl text-center text-lg placeholder:text-center font-body tracking-widest transition-all duration-300"
                      style={{
                        background: "oklch(0.08 0.005 290 / 0.6)",
                        border: "1px solid oklch(0.85 0.15 85 / 0.15)",
                        color: "oklch(0.97 0.01 290)",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.4)"}
                      onBlur={(e) => e.target.style.borderColor = "oklch(0.85 0.15 85 / 0.15)"}
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm font-body"
                    style={{ color: "oklch(0.6 0.2 15)" }}
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={!day || !month || !year || isSubmitting}
                  className="group relative w-full h-14 rounded-2xl overflow-hidden transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.2), oklch(0.7 0.2 330 / 0.15))",
                    border: "1px solid oklch(0.85 0.15 85 / 0.3)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.15), oklch(0.7 0.2 330 / 0.1))",
                    }}
                  />

                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <Heart className="w-5 h-5" style={{ color: "oklch(0.85 0.15 85)" }} />
                    </motion.div>
                  ) : (
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <span className="font-body text-lg" style={{ color: "oklch(0.85 0.15 85)" }}>
                        افتح قلبي 🌹
                      </span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" style={{ color: "oklch(0.85 0.15 85)" }} />
                    </div>
                  )}
                </button>
              </motion.form>

              <motion.div
                className="mt-8 flex justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="w-1 h-1 rounded-full"
                    style={{ background: "oklch(0.85 0.15 85 / 0.3)" }}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: d * 0.3 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="absolute bottom-8 left-0 right-0 text-center z-10 font-body text-xs tracking-widest"
          style={{ color: "oklch(0.85 0.15 85 / 0.2)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          ✦ صنع بحب لأجلك ✦
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}

