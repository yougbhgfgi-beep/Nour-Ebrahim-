"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  ChevronDown, 
  Activity, 
  Sun, 
  Sparkles, 
  Home, 
  Eye, 
  Moon, 
  Clock, 
  CloudRain, 
  Compass, 
  Infinity as InfinityIcon
} from "lucide-react"

const reasons = [
  "لأن ضحكتك تفتح في صدري نافذة من النور، فأتنفس حياة لا أعرفها إلا معك",
  "لأن روحك هادئة كقمر ليلة تمام، وفيك أسكن بلا خوف",
  "لأنك لست حبيبي فحسب، أنت قدري الذي ارتضاه قلبي قبل العقل",
  "لأن حضنك ليس يدين فقط، بل هو وطن صغير يتسع لكل أحلامي",
  "لأن عينيك مرآة روحي، حين أنظر فيهما أرى نفسي أجمل",
  "لأنك تفهم صمتي، وتقرأ ما بين الحروف قبل أن تكتب",
  "لأن معك الزمن يتوقف، وكل لحظة تصير أبداً لا ينتهي",
  "لأن وجودك كالمطر في صحراء، يحيي فيَّ ما ظننته مات",
  "لأن قلبك ليس أبيض فقط، بل هو ضياء ينير لي الطريق حين أضيع",
  "لأنك أنت... ولأنه لا سبب يكفي، وحبك أكبر من كل الأسباب",
]

const romanticTitles = [
  { text: "نبض قلبي", icon: Activity },
  { text: "دفء روحي", icon: Sun },
  { text: "قدر حياتي", icon: Sparkles },
  { text: "وطني وأماني", icon: Home },
  { text: "نور عيني", icon: Eye },
  { text: "سر صمتي", icon: Moon },
  { text: "زمن حبنا", icon: Clock },
  { text: "مطر عمري", icon: CloudRain },
  { text: "ضياء دربي", icon: Compass },
  { text: "عهدي ووعدي", icon: InfinityIcon },
]

export function LoveReasons() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-8 md:py-12 container relative">
      <div className="absolute inset-0 bg-radial-glow opacity-30 mask-radial-fade pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4"
        >
          <Heart className="w-8 h-8 mx-auto text-primary drop-shadow-[0_0_10px_var(--color-primary)]" fill="var(--color-primary)" style={{ opacity: 0.6 }} />
        </motion.div>
        <h2 className="font-display text-4xl md:text-5xl text-gradient mb-3 tracking-tight">
          عشرة أسباب
        </h2>
        <p className="font-arabic text-lg text-muted-foreground">
          لماذا أنت نبض قلبي
        </p>
        <div className="w-24 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto relative z-10">
        {reasons.map((reason, i) => {
          const isOpen = openIndex === i
          const IconComponent = romanticTitles[i].icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              layout
              className="group"
            >
              <motion.button
                onClick={() => toggle(i)}
                layout
                className={`w-full text-right rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${isOpen ? "shadow-xl shadow-primary/20 bg-card border-primary/30" : "hover:shadow-md bg-card/50 border border-border/50 hover:border-primary/30"}`}
              >
                <div className="px-5 py-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 text-primary">
                      <IconComponent className="w-5 h-5 drop-shadow-[0_0_5px_var(--color-primary)]" />
                      <span className="font-arabic text-md font-semibold text-gradient">
                        {romanticTitles[i].text}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent my-4" />
                        <p className="font-arabic text-sm md:text-base leading-relaxed text-foreground/90">
                          {reason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
