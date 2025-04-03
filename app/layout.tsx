import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "🎸 Guitar Galaxy | Learn Guitar the Modern Way",
  description: "Master guitar with interactive lessons, chord libraries, and song tutorials.",
  generator: "v0.dev",
  keywords: [
    "Learn Guitar",
    "Online Guitar Lessons",
    "Chord Libraries",
    "Song Tutorials",
    "Beginner Guitar",
    "Advanced Guitar",
  ],
  openGraph: {
    title: "Guitar Galaxy | Interactive Guitar Learning Platform",
    description:
      "Your ultimate destination for mastering guitar with real-time feedback, video tutorials, and community support.",
    type: "website",
    url: "https://guitargalaxy.com",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "Guitar Galaxy - Learn Guitar Online",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background font-sans antialiased text-gray-900 dark:text-gray-100",
          fontSans.variable
        )}
      >
        {/* ✅ Theme Provider for Dark Mode Support */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          
          {/* ✅ Sticky Header for better navigation */}
          <div className="sticky top-0 z-50 bg-white dark:bg-black shadow-md">
            <Header />
          </div>

          {/* ✅ Page Content */}
          <main className="container mx-auto flex-grow px-6 py-10 lg:px-16 xl:px-24">
            {children}
          </main>

          {/* ✅ Global Toaster for notifications */}
          <Toaster aria-live="polite" />

        </ThemeProvider>
      </body>
    </html>
  )
}
