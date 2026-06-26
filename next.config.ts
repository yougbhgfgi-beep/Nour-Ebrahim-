import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Nour-Ebrahim-",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
