"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"

const icons = ["✨", "💫", "💖", "🌙", "🕊️", "♾️"]

const moments = [
  {
    date: "بداية الحكاية",
    title: "يوم التقينا",
    desc: "من يوم ما عرفتك، عرفت إنك أجمل ما في الدنيا. ولسه كل يوم بحبك أكتر.",
  },
  {
    date: "أول ضحكة",
    title: "ضحكتك تطير الهم",
    desc: "ضحكتك الحلوة دي يا رب ما تروح منك أبداً وتفضل دايماً مبسوط.",
  },
  {
    date: "كل سنة",
    title: "بتكبر وتحلى",
    desc: "كل سنة وأنت معايا، ونفضل حبايب دايماً يا رب.",
  },
  {
    date: "أمنية القلب",
    title: "أجمل حب",
    desc: "يا رب يديمك في حياتي، ويخليك ليا. أنت أجمل حاجة حصلت لي يا حبيبي.",
  },
  {
    date: "كل يوم",
    title: "حبّ يكتب نفسه",
    desc: "ومازلت أكتشف فيك كل يوم شيئاً جديداً لأحبه يا حبيبي.",
  },
  {
    date: "وإلى الأبد",
    title: "قصّتنا لم تنتهِ",
    desc: "أنا سندك يا حبيبي بعد ربنا وضهرك دايماً.",
  },
]

export function LoveTimeline() {
  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <Heart className="w-7 h-7 mx-auto" style={{ color: "oklch(0.85 0.15 85 / 0.3)" }} fill="oklch(0.85 0.15 85)" />
          </motion.div>
          <h2 className="font-display text-3xl md:text-5xl mb-3 text-gradient font-bold drop-shadow-md">
            ذكرياتنا
          </h2>
          <p className="font-body text-sm tracking-widest text-muted-foreground">
            مِن أَيْنَ نَبْدَأُ الْحِكَايَةَ؟
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute right-[14px] md:right-1/2 top-0 bottom-0 w-[1px]"
            style={{ background: "linear-gradient(180deg, transparent, oklch(0.85 0.15 85 / 0.2), oklch(0.7 0.2 330 / 0.2), transparent)" }}
          />

          {moments.map((m, i) => (
            <TimelineCard key={i} moment={m} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ moment, index, isLeft }: {
  moment: typeof moments[0]
  index: number
  isLeft: boolean
}) {
  const icon = icons[index]
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 30%"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [40, 0, 0, -20])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="relative mb-6 md:mb-8 flex flex-row items-center md:items-start"
      dir="rtl"
    >
      {/* Central Dot for Desktop */}
      <div 
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 z-10 items-center justify-center"
      >
        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center animate-pulse"
          style={{
            background: "oklch(0.98 0.01 350)",
            border: "1px solid oklch(0.85 0.15 85 / 0.3)",
            boxShadow: "0 0 20px oklch(0.85 0.15 85 / 0.1)",
          }}
        >
          <span className="text-xs md:text-sm">{icon}</span>
        </div>
      </div>

      {/* Dot for Mobile (on the right) */}
      <div 
        className="flex md:hidden absolute right-[4px] top-2 z-10 items-center justify-center"
      >
        <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.98 0.01 350)",
            border: "1px solid oklch(0.85 0.15 85 / 0.3)",
          }}
        >
          <span className="text-xs">{icon}</span>
        </div>
      </div>

      {isLeft ? (
        <>
          {/* Spacer on the right */}
          <div className="hidden md:block md:w-1/2" />
          
          {/* Card on the left */}
          <div className="flex-1 min-w-0 pr-12 md:pr-0 md:pl-12 md:w-1/2 md:text-left">
            <motion.div
              className="rounded-2xl p-4 md:p-6"
              style={{
                background: "oklch(0.05 0.01 300 / 0.8)",
                border: "1px solid oklch(0.85 0.15 85 / 0.3)",
                backdropFilter: "blur(12px)",
              }}
              whileHover={{ y: -3, borderColor: "oklch(0.85 0.15 85 / 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2 md:flex-row-reverse">
                <span className="font-body text-xs tracking-widest" style={{ color: "oklch(0.85 0.15 85 / 0.5)" }}>
                  {moment.date}
                </span>
                <span className="h-px flex-1" style={{ background: "linear-gradient(to right, oklch(0.85 0.15 85 / 0.2), transparent)" }} />
              </div>

              <h3 className="font-display text-base md:text-xl mb-1 font-bold text-gradient">
                {moment.title}
              </h3>

              <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: "oklch(0.8 0.02 300)" }}>
                {moment.desc}
              </p>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          {/* Card on the right */}
          <div className="flex-1 min-w-0 pr-12 md:pr-12 md:w-1/2 md:text-right">
            <motion.div
              className="rounded-2xl p-4 md:p-6"
              style={{
                background: "oklch(0.05 0.01 300 / 0.8)",
                border: "1px solid oklch(0.85 0.15 85 / 0.3)",
                backdropFilter: "blur(12px)",
              }}
              whileHover={{ y: -3, borderColor: "oklch(0.85 0.15 85 / 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-body text-xs tracking-widest" style={{ color: "oklch(0.85 0.15 85 / 0.5)" }}>
                  {moment.date}
                </span>
                <span className="h-px flex-1" style={{ background: "linear-gradient(to left, oklch(0.85 0.15 85 / 0.2), transparent)" }} />
              </div>

              <h3 className="font-display text-base md:text-xl mb-1 font-bold text-gradient">
                {moment.title}
              </h3>

              <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: "oklch(0.8 0.02 300)" }}>
                {moment.desc}
              </p>
            </motion.div>
          </div>

          {/* Spacer on the left */}
          <div className="hidden md:block md:w-1/2" />
        </>
      )}
    </motion.div>
  )
}
