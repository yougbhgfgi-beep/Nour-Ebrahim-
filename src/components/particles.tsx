"use client"

import { useEffect, useRef } from "react"

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 6 : 15

    let animId: number
    let particles: {
      x: number; y: number; vx: number; vy: number; size: number
      opacity: number; hue: number; life: number; maxLife: number
    }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < count; i++) {
      const maxLife = 200 + Math.random() * 300
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.3,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.3,
        hue: Math.random() > 0.5 ? 45 : 330,
        life: Math.random() * maxLife,
        maxLife,
      })
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life >= p.maxLife) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = -0.1 - Math.random() * 0.3
          p.life = 0
          p.maxLife = 200 + Math.random() * 300
        }

        const opacity = Math.sin((p.life / p.maxLife) * Math.PI) * p.opacity
        if (opacity < 0.01) continue

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)

        const color = p.hue === 45
          ? `oklch(0.85 0.15 85 / ${opacity})`
          : `oklch(0.7 0.2 330 / ${opacity})`

        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
