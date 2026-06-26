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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var key = "__app_ok";
  window[key] = false;
  var style = document.createElement("style");
  style.textContent = [
    "#__fallback{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0a0a0f;color:#f7f7f7;font-family:system-ui,sans-serif;text-align:center;padding:2rem;z-index:999999}",
    "#__fallback h2{font-size:1.5rem;margin-bottom:0.5rem;background:linear-gradient(135deg,#FFD700,#e91e90);-webkit-background-clip:text;-webkit-text-fill-color:transparent}",
    "#__fallback p{color:oklch(0.6 0.02 300);font-size:0.9rem;margin-bottom:1.5rem}",
    "#__fallback button{padding:0.75rem 2rem;border-radius:999px;border:1px solid rgba(255,215,0,0.3);background:linear-gradient(135deg,rgba(255,215,0,0.2),rgba(233,30,144,0.15));color:#FFD700;cursor:pointer;font-size:1rem;font-family:inherit}",
    "#__fallback.hide{display:none}"
  ].join("");
  document.head.appendChild(style);

  window.addEventListener("error", function(e) { window[key] = true; });
  window.addEventListener("unhandledrejection", function(e) { window[key] = true; });

  function hideFallback() { document.getElementById("__fallback").classList.add("hide"); }

  setTimeout(function(){
    if (!window[key]) {
      document.getElementById("__fallback").innerHTML = [
        "<div>",
        "<div style='font-size:3rem;margin-bottom:1rem'>\uD83D\uDC94</div>",
        "<h2>\u062D\u0635\u0644 \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644</h2>",
        "<p>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0632\u0631 \u0623\u0633\u0641\u0644 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</p>",
        "<button onclick='location.reload()'>\u27F2 \u062D\u0627\u0648\u0644 \u062A\u0627\u0646\u064A</button>",
        "</div>"
      ].join("");
    } else {
      hideFallback();
    }
  }, 5000);

  window.__onAppReady = hideFallback;
})();
            `,
          }}
        />
      </head>
      <body className={`${cairo.variable} ${inter.variable} ${playfair.variable} ${reemKufi.variable} antialiased selection:bg-primary/30 selection:text-primary`}>
        <div id="__fallback" className="hide" />
        {children}
      </body>
    </html>
  )
}
