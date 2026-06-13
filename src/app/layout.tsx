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
    template: "%s | Automatrix IA",
    default: "Automatrix IA | Automatize com Inteligência Artificial"
  },
  description:
    "Crie automações, apps e workflows conversando com nosso agente IA. n8n, chatbots WhatsApp, CRM e agentes inteligentes para empresas.",
  twitter: {
    creator: "@automatrix_ai",
    site: "@automatrix_ai",
    card: "summary_large_image",
    title: "Automatrix IA | Automatize com Inteligência Artificial",
    images: {
      url: "/images/automatrix-icon.png",
      width: 512,
      height: 512
    },
    description:
      "Crie automações, apps e workflows conversando com nosso agente IA. n8n, chatbots, CRM e muito mais."
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
