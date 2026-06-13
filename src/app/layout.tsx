import "@/styles/globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"

import { DisableDraftMode } from "@/components/sanity/disable-draft-mode"
import { SanityLive } from "@/service/sanity/live"
import { cn } from "@/utils/cn"

export const metadata: Metadata = {
  title: {
    template: "%s | automatrix",
    default: "automatrix | AI Automation Agency"
  },
  description:
    "Automatrix — We automate what slows you down. AI agents, workflows, and intelligent systems for ambitious businesses.",
  twitter: {
    creator: "@automatrix",
    site: "@automatrix",
    card: "summary_large_image",
    title: "automatrix | AI Automation Agency",
    images: {
      url: "/images/twitter-image.png",
      width: 1200,
      height: 642
    },
    description:
      "Automatrix — We automate what slows you down. AI agents, workflows, and intelligent systems."
  },
  openGraph: {
    images: {
      url: "/images/opengraph-image.gif",
      width: 1200,
      height: 642
    }
  }
}

// TODO: find a way to load font-feature-settings
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

const flauta = localFont({
  src: "../../public/fonts/flauta.ttf",
  variable: "--font-flauta"
})

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          flauta.variable,
          "font-sans"
        )}
        suppressHydrationWarning
      >
        {children}
        <SanityLive />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  )
}

export default RootLayout
