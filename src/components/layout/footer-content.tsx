import type { PortableTextBlock } from "@/service/sanity/types"
import { cn } from "@/utils/cn"

import { Copyright, InternalLinks, SocialLinks } from "./shared-sections"
import { StayConnected } from "./stay-connected"

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col items-center gap-3 py-4", className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/images/automatrix-icon.png"
      alt="Automatrix IA"
      className="h-16 w-16 object-contain lg:h-24 lg:w-24"
      style={{ imageRendering: "pixelated" }}
    />
    <span className="font-mono text-2xl font-bold tracking-widest text-brand-green lg:text-4xl">
      automatrix IA
    </span>
    <span className="text-center text-sm text-brand-w2 lg:text-base">
      Automatize com Inteligência Artificial
    </span>
  </div>
)

interface FooterContentProps {
  projectsCount: number
  postsCount: number
  socialLinks: {
    twitter: string
    instagram: string
    github: string
    linkedIn: string
  }
  newsletter: PortableTextBlock[]
}

export const FooterContent = ({
  projectsCount,
  postsCount,
  socialLinks,
  newsletter
}: FooterContentProps) => {
  const LINKS = [
    {
      title: "Hub",
      href: "/"
    },
    {
      title: "Serviços",
      href: "/services"
    },
    {
      title: "Clientes",
      href: "/showcase",
      count: projectsCount
    },
    {
      title: "Equipe",
      href: "/people"
    },
    {
      title: "Blog",
      href: "/blog",
      count: postsCount
    },
    {
      title: "Sandbox",
      href: "/lab"
    }
  ]

  return (
    <footer className="relative z-10 flex flex-col justify-between bg-brand-k pb-4 lg:h-[calc(100dvh-3.25rem)]">
      <div className="grid-layout">
        <Logo className="col-span-full mx-auto border-b border-brand-w1/30 pb-2 text-brand-w2 lg:pb-4" />
      </div>

      <div className="grid-layout relative grid-rows-[auto_auto_28px] !gap-y-10 pb-2 pt-4 lg:grid-rows-[auto] lg:items-end lg:!gap-y-2 lg:py-0">
        <InternalLinks
          className="col-start-1 col-end-5 row-start-1 border-b border-brand-w1/30 pb-4 lg:col-start-7 lg:col-end-9 lg:border-none lg:pb-0"
          links={LINKS}
          onNav={false}
        />

        <StayConnected
          className="col-start-1 col-end-5 row-start-2 hidden lg:row-auto"
          content={newsletter}
        />

        <div className="col-span-full row-start-3 flex flex-col justify-end gap-y-2 lg:hidden">
          <SocialLinks
            className="col-start-1 col-end-5 row-start-2 lg:hidden"
            links={socialLinks}
          />
          <Copyright className="text-left" />
        </div>

        <div className="col-start-10 col-end-13 hidden translate-y-[3px] flex-col items-end gap-y-2 lg:flex">
          <SocialLinks links={socialLinks} />
          <Copyright />
        </div>
      </div>
    </footer>
  )
}
