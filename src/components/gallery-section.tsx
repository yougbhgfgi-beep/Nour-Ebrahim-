"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const galleryItems = [
  { title: "أنت أجمل ما رأت عيناي 💕", url: "/Nour-Ebrahim-/img1.jpeg" },
  { title: "ضحكتك تنير عالمي ✨", url: "/Nour-Ebrahim-/img2.jpeg" },
  { title: "عيناك مرآة روحي 💗", url: "/Nour-Ebrahim-/img3.jpeg" },
  { title: "حضنك هو وطني 🌹", url: "/Nour-Ebrahim-/img4.jpeg" },
  { title: "معك الحياة أجمل 💖", url: "/Nour-Ebrahim-/img5.jpeg" },
  { title: "أنت كل شيء يا حبيبي 💫", url: "/Nour-Ebrahim-/img6.jpeg" },
]

export function GallerySection() {
  return (
    <section className="py-8 md:py-12 container relative">
      {/* Page decorative border */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        background: "radial-gradient(ellipse at 50% 0%, oklch(0.85 0.15 85 / 0.1), transparent 70%)",
      }} />
      <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <h2 className="font-display text-3xl md:text-5xl text-gradient text-center mb-6">
        ذكرياتنا 📸
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass rounded-2xl overflow-hidden group cursor-pointer relative"
          >
            {/* Decorative frame - always visible */}
            <div className="absolute -inset-[3px] rounded-2xl pointer-events-none" style={{
              background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.4), oklch(0.7 0.2 330 / 0.25), oklch(0.85 0.15 85 / 0.4))",
            }} />
            <div className="absolute -inset-[1px] rounded-2xl pointer-events-none" style={{
              background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.2), transparent, oklch(0.85 0.15 85 / 0.2))",
            }} />
            {/* Corner decorations - always visible */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-primary/50 rounded-tl-xl z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-primary/50 rounded-tr-xl z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-primary/50 rounded-bl-xl z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-primary/50 rounded-br-xl z-10" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group-hover:shadow-2xl transition-all duration-500 bg-black/20 flex items-center justify-center">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-display text-lg">{item.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
