"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App error:", error)
  }, [error])

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💔</div>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", background: "linear-gradient(135deg, #FFD700, #e91e90)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        حصل خطأ بسيط
      </h1>
      <p style={{ color: "oklch(0.6 0.02 300)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
        حاول تضغط على الزر ده عشان تعيد التحميل
      </p>
      <p style={{ color: "oklch(0.4 0.02 300)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
        {error.message}
      </p>
      <button onClick={reset} style={{
        padding: "0.75rem 2rem", borderRadius: "999px", border: "1px solid oklch(0.85 0.15 85 / 0.3)",
        background: "linear-gradient(135deg, oklch(0.85 0.15 85 / 0.2), oklch(0.7 0.2 330 / 0.15))",
        color: "#FFD700", cursor: "pointer", fontSize: "1rem", fontFamily: "inherit"
      }}>
        ⟲ حاول تاني
      </button>
    </div>
  )
}
