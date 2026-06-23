"use client"

import { useEffect, useRef } from "react"

interface Character {
  x: number; y: number; vx: number; vy: number; rotation: number
  type: "bear" | "cat"; mood: "happy" | "wink" | "love"
  moodTimer: number; size: number
}

export function CuteCharacters() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const chars: Character[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const charCount = 3

    for (let i = 0; i < charCount; i++) {
      chars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: 0,
        type: i % 2 === 0 ? "bear" : "cat",
        mood: "happy",
        moodTimer: 0,
        size: 20 + Math.random() * 10,
      })
    }

    function drawBear(ctx: CanvasRenderingContext2D, c: Character) {
      const s = c.size
      ctx.fillStyle = "oklch(0.6 0.1 30 / 0.5)"

      ctx.beginPath()
      ctx.arc(-s * 0.5, -s * 0.3, s * 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(s * 0.5, -s * 0.3, s * 0.3, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "oklch(0.5 0.15 30 / 0.4)"
      ctx.beginPath()
      ctx.arc(0, s * 0.05, s * 0.15, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "oklch(0.15 0.02 0 / 0.6)"
      if (c.mood === "wink") {
        ctx.beginPath()
        ctx.arc(-s * 0.15, -s * 0.05, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(s * 0.05, -s * 0.05)
        ctx.lineTo(s * 0.25, -s * 0.05)
        ctx.strokeStyle = "oklch(0.15 0.02 0 / 0.6)"
        ctx.lineWidth = 1.5
        ctx.stroke()
      } else if (c.mood === "love") {
        ctx.fillStyle = "oklch(0.7 0.25 15 / 0.8)"
        ctx.beginPath()
        ctx.arc(-s * 0.12, -s * 0.08, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(s * 0.12, -s * 0.08, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(-s * 0.15, -s * 0.05, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(s * 0.15, -s * 0.05, s * 0.04, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.strokeStyle = "oklch(0.15 0.02 0 / 0.4)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(0, s * 0.15, s * 0.1, 0.1, Math.PI - 0.1)
      ctx.stroke()
    }

    function drawCat(ctx: CanvasRenderingContext2D, c: Character) {
      const s = c.size
      ctx.fillStyle = "oklch(0.65 0.05 30 / 0.5)"

      ctx.beginPath()
      ctx.moveTo(-s * 0.4, -s * 0.3)
      ctx.lineTo(-s * 0.15, -s * 0.05)
      ctx.lineTo(-s * 0.4, s * 0.05)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(s * 0.4, -s * 0.3)
      ctx.lineTo(s * 0.15, -s * 0.05)
      ctx.lineTo(s * 0.4, s * 0.05)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "oklch(0.15 0.02 0 / 0.6)"
      ctx.beginPath()
      ctx.arc(-s * 0.12, -s * 0.05, s * 0.035, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(s * 0.12, -s * 0.05, s * 0.035, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "oklch(0.15 0.02 0 / 0.3)"
      ctx.lineWidth = 0.5
      for (let side = -1; side <= 1; side += 2) {
        for (let w = 0; w < 3; w++) {
          ctx.beginPath()
          ctx.moveTo(side * s * 0.15, s * 0.08)
          ctx.lineTo(side * (s * 0.15 + s * 0.06 * (w + 1)), s * 0.18)
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      chars.forEach((c) => {
        c.x += c.vx
        c.y += c.vy
        c.rotation += 0.005
        c.moodTimer++

        if (c.x < 0 || c.x > canvas.width) c.vx *= -1
        if (c.y < 0 || c.y > canvas.height) c.vy *= -1

        if (c.moodTimer > 150 + Math.random() * 100) {
          c.mood = ["happy", "wink", "love"][Math.floor(Math.random() * 3)] as Character["mood"]
          c.moodTimer = 0
        }

        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.rotate(c.rotation)
        ctx.globalAlpha = 0.5

        if (c.type === "bear") drawBear(ctx, c)
        else drawCat(ctx, c)

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />
}
