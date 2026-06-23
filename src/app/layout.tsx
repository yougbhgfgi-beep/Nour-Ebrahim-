import type { Metadata } from "next"
import { Cairo, Inter, Playfair_Display, Reem_Kufi } from "next/font/google"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  variable: "--font-handwritten",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://yougbhgfgi-beep.github.io"),
  title: "✿ 𝑯𝒂𝒃𝒊𝒃𝒚 ✿ — رسالة من القلب 💌",
  description: "🌙 إلى أعز إنسان في الكون… كلمات من القلب تكتبها الأيام ويزينها الحب. رسالتي الأخيرة لك ✨",
  openGraph: {
    title: "✿ 𝑯𝒂𝒃𝒊𝒃𝒚 ✿ — رسالة من القلب 💌",
    description: "🌙 إلى أعز إنسان في الكون… كلمات من القلب تكتبها الأيام ويزينها الحب. رسالتي الأخيرة لك ✨",
    type: "website",
    siteName: "𝑯𝒂𝒃𝒊𝒃𝒚 💕",
    images: [{
      url: "/Nour-Ebrahim-/img1.jpeg",
      width: 1200,
      height: 630,
      alt: "𝑯𝒂𝒃𝒊𝒃𝒚 💕 — رسالة حب",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "✿ 𝑯𝒂𝒃𝒊𝒃𝒚 ✿ — رسالة من القلب 💌",
    description: "🌙 إلى أعز إنسان في الكون… كلمات من القلب تكتبها الأيام ويزينها الحب. 💕",
    images: ["/Nour-Ebrahim-/img1.jpeg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${inter.variable} ${playfair.variable} ${reemKufi.variable} antialiased selection:bg-primary/30 selection:text-primary`}>
        {children}
      </body>
    </html>
  )
}
