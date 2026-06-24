"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CountdownSectionProps {
  targetDate: string
  title?: string
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="glass-dark border border-primary/20 w-20 h-20 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center glow-rose"
      key={value}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="font-display text-2xl md:text-3xl text-gradient">{value}</span>
      <span className="font-body text-xs md:text-sm text-muted-foreground mt-1">{label}</span>
    </motion.div>
  )
}

export function CountdownSection({ targetDate, title = "أيام حتى يومنا المميز" }: CountdownSectionProps) {
  const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const start = new Date(targetDate)
      const now = new Date()
      const diff = now.getTime() - start.getTime()
      if (diff <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }

      let years = now.getFullYear() - start.getFullYear()
      let months = now.getMonth() - start.getMonth()
      let days = now.getDate() - start.getDate()

      if (days < 0) {
        months--
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += prevMonth.getDate()
      }
      if (months < 0) {
        years--
        months += 12
      }

      const hours = now.getHours() - start.getHours()
      const minutes = now.getMinutes() - start.getMinutes()
      const seconds = now.getSeconds() - start.getSeconds()

      return { years, months, days, hours, minutes, seconds }
    }

    setTimeElapsed(calc())
    const interval = setInterval(() => setTimeElapsed(calc()), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <section className="py-8 md:py-12 container text-center">
      <h2 className="font-display text-3xl md:text-5xl text-gradient mb-2 font-bold drop-shadow-md">{title}</h2>
      {targetDate && (
        <p className="font-body text-sm tracking-widest text-muted-foreground mb-6">
          {targetDate.split("-").join(" / ")}
        </p>
      )}
      <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
        <TimeBlock value={timeElapsed.years} label="سنين" />
        <TimeBlock value={timeElapsed.months} label="شهور" />
        <TimeBlock value={timeElapsed.days} label="أيام" />
        <TimeBlock value={timeElapsed.hours} label="ساعات" />
        <TimeBlock value={timeElapsed.minutes} label="دقايق" />
        <TimeBlock value={timeElapsed.seconds} label="ثواني" />
      </div>
    </section>
  )
}
