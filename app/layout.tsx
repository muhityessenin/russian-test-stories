import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Орыс тілін үйрену - Білім Academy",
  description: "Орыс тілін үйренуге арналған интерактивті қосымша",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
