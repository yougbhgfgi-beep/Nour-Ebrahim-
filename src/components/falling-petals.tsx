"use client"

import { useEffect, useRef } from "react"

export function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 0 : 20

    let animId: number
    const petals: { x: number; y: number; size: number; rotation: number; rotSpeed: number; speed: number; hue: number; opacity: number; drift: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 3,
        speed: 0.3 + Math.random() * 0.8,
        hue: Math.random() > 0.5 ? 340 + Math.random() * 20 : 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.forEach((p) => {
        p.y += p.speed
        p.x += p.drift
        p.rotation += p.rotSpeed

        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        if (p.x > canvas.width + 20) p.x = -20
        if (p.x < -20) p.x = canvas.width + 20

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity

        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.7 0.2 ${p.hue} / ${p.opacity})`
        ctx.fill()

        ctx.restore()
      })

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
