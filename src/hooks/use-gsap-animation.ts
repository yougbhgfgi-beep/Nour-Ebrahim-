"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface UseGsapOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  scrollTrigger?: boolean | gsap.plugins.ScrollTriggerInstanceVars
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  delay?: number
  deps?: React.DependencyList
}

export function useGsapAnimation<T extends HTMLElement>({
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  scrollTrigger = true,
  trigger,
  start = "top 80%",
  end = "top 20%",
  scrub,
  markers = false,
  delay = 0,
  deps = [],
}: UseGsapOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const vars: gsap.TweenVars = { ...to, delay }
      if (scrollTrigger) {
        vars.scrollTrigger = {
          trigger: trigger || el,
          start,
          end,
          scrub,
          markers,
          toggleActions: "play none none reverse",
        }
      }
      gsap.fromTo(el, from, vars)
    }, el)

    return () => ctx.revert()
  }, deps)

  return ref
}

export function useGsapTimeline<T extends HTMLElement>(opts: UseGsapOptions = {}) {
  const ref = useRef<T>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        scrollTrigger: opts.scrollTrigger
          ? {
              trigger: opts.trigger || el,
              start: opts.start || "top 80%",
              end: opts.end || "top 20%",
              scrub: opts.scrub,
              markers: opts.markers,
              toggleActions: "play none none reverse",
            }
          : undefined,
      })
    }, el)

    return () => ctx.revert()
  }, opts.deps || [])

  return { ref, timeline }
}
