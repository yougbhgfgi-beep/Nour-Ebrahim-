"use client"

import { useEffect, useRef, ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    ScrollTrigger.normalizeScroll(true)

    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const scrollHeight = container.scrollHeight
      const viewportHeight = window.innerHeight

      gsap.to(container, {
        y: () => -(scrollHeight - viewportHeight),
        ease: "none",
        scrollTrigger: {
          trigger: container.parentElement,
          start: "top top",
          end: () => `+=${scrollHeight - viewportHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  )
}
