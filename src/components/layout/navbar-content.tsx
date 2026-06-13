"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { mergeRefs } from "react-merge-refs"

import { useContactStore } from "@/components/contact/contact-store"
import { Link } from "@/components/primitives/link"
import { Portal } from "@/components/primitives/portal"
import { useCurrentScene } from "@/hooks/use-current-scene"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { useHandleContactButton } from "@/hooks/use-handle-contact"
import { useHandleNavigation } from "@/hooks/use-handle-navigation"
import { useMedia } from "@/hooks/use-media"
import { useScrollControl } from "@/hooks/useScrollControl"
import type { PortableTextBlock } from "@/service/sanity/types"
import { cn } from "@/utils/cn"
import { isInPath } from "@/utils/is-in-path"

import MusicToggle from "./music-toggle"
import { Copyright, InternalLinks, SocialLinks } from "./shared-sections"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onCopy: () => void
}

const ContextMenu = memo(({ x, y, onClose, onCopy }: ContextMenuProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCopy()
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-[9999] w-fit bg-brand-k p-0.5"
      style={{ left: x, top: y }}
    >
      <button
        onClick={handleCopy}
        className="group flex w-full items-center gap-2 px-2 py-1.5 text-f-p-mobile font-semibold leading-4 text-brand-w1 lg:text-f-p"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-brand-w1"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="group-hover:text-brand-o"
            >
              Copy logo as SVG
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
})
ContextMenu.displayName = "ContextMenu"

const Logo = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Automatrix pixel-art icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/automatrix-icon-64.png"
        alt="Automatrix"
        className="h-5 w-5 object-contain"
        style={{ imageRendering: "pixelated" }}
      />
      <span
        className="font-mono text-[0.85rem] font-bold tracking-wide text-brand-cyan"
        style={{ letterSpacing: "0.04em" }}
      >
        automatrix
      </span>
    </div>
  )
})
Logo.displayName = "Logo"

interface NavbarContentProps {
  links: {
    title: string
    href: string
    count?: number
  }[]

  socialLinks: {
    twitter: string
    instagram: string
    github: string
    linkedIn: string
  }

  newsletter: PortableTextBlock[]
}

export const NavbarContent = memo(
  ({ links, socialLinks, newsletter }: NavbarContentProps) => {
    const { handleNavigation } = useHandleNavigation()
    const scene = useCurrentScene()

    if (scene === "404") return null

    return (
      <nav
        className={cn(
          "fixed top-0 z-navbar flex w-full flex-col items-center justify-center bg-brand-k transition-transform duration-300 lg:bg-transparent",
          "[background-image:linear-gradient(#000000_1px,transparent_1px),linear-gradient(to_right,#000000_1px,rgba(0,0,0,0.7)_1px)] [background-position-y:1px] [background-size:2px_2px]",
          "after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-brand-w1/10"
        )}
      >
        <div className="grid-layout h-9">
          <button
            onClick={() => handleNavigation("/")}
            className="col-span-1 w-fit lg:col-start-1 lg:col-end-3"
            aria-label="Go to homepage"
          >
            <Logo className="h-[0.9375rem] text-brand-w1" />
          </button>

          <DesktopContent
            links={links}
            socialLinks={socialLinks}
            newsletter={newsletter}
          />

          <MobileContent
            links={links}
            socialLinks={socialLinks}
            newsletter={newsletter}
          />
        </div>
      </nav>
    )
  }
)
NavbarContent.displayName = "NavbarContent"

const DesktopContent = memo(({ links }: NavbarContentProps) => {
  const { handleNavigation } = useHandleNavigation()
  const isContactOpen = useContactStore((state) => state.isContactOpen)
  const handleContactButton = useHandleContactButton()

  const pathname = usePathname()

  return (
    <>
      <div className="col-start-3 col-end-11 hidden w-full justify-center gap-5 lg:flex">
        {links.map((link) => (
          <div
            key={link.href}
            className={cn(
              "flex items-center gap-1 text-[0.75rem] font-semibold leading-4"
            )}
          >
            <Link
              href={link.href}
              className={cn(
                "group space-x-1 text-brand-w1 transition-colors duration-0 hover:text-brand-o",
                isInPath(link.href, pathname) && "!text-brand-o",
                !isInPath(link.href, pathname) && "actionable-opacity"
              )}
              onClick={() => handleNavigation(link.href)}
            >
              {link.title}
            </Link>
            {(link.count ?? 0) > 0 && (
              <sup className="text-caption text-brand-g1">({link.count})</sup>
            )}
          </div>
        ))}
      </div>

      <div className="col-start-11 col-end-13 ml-auto hidden items-center gap-5 lg:flex">
        <MusicToggle />

        <button
          id="nav-contact"
          onClick={handleContactButton}
          className={cn(
            "text-[0.75rem] font-semibold leading-4 text-brand-w1 transition-colors duration-0 hover:text-brand-o",
            isContactOpen && "text-brand-g1"
          )}
        >
          <span className="actionable-opacity">Contato</span>
        </button>
      </div>
    </>
  )
})
DesktopContent.displayName = "DesktopContent"

const MobileContent = memo(({ links, socialLinks }: NavbarContentProps) => {
  const isDesktop = useMedia("(min-width: 1024px)")
  const [isOpen, setIsOpen] = useState(false)
  const { enableScroll, disableScroll } = useScrollControl()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuHandlerRef = useRef<HTMLButtonElement>(null)

  const { focusTrapRef } = useFocusTrap(isOpen, menuHandlerRef)

  const handleChangeLink = () => {
    setIsOpen(false)
    enableScroll()
  }

  const memoizedMenu = useMemo(() => {
    if (isDesktop || !isOpen) return null

    return (
      <Portal id="mobile-menu">
        <motion.div
          ref={mergeRefs([mobileMenuRef, focusTrapRef])}
          className={cn(
            "grid-layout fixed left-0 top-[35px] z-navbar h-[calc(100dvh-35px)] w-full origin-top grid-rows-2 bg-brand-k py-6"
          )}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transition: { delay: 0.35 } }}
          transition={{ duration: 0.4, type: "spring", bounce: 0 }}
        >
          <InternalLinks
            links={links}
            onClick={handleChangeLink}
            className="col-span-4"
            onNav={true}
            animated={true}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0 }}
            className="col-span-4 flex h-full flex-col justify-end gap-y-16"
          >
            <div className="flex flex-col items-start gap-y-2">
              <SocialLinks links={socialLinks} />
              <Copyright />
            </div>
          </motion.div>
        </motion.div>
      </Portal>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, focusTrapRef, mobileMenuRef, isDesktop, links, socialLinks])

  const Label = useMemo(() => {
    return function Label({ children }: { children: React.ReactNode }) {
      return (
        <motion.p
          id="menu-button"
          key={isOpen ? "close" : "menu"}
          className="w-[2.4rem] origin-bottom text-center text-f-p-mobile text-brand-w1"
          initial={{ opacity: 0, scaleY: 0.5, filter: "blur(4px)" }}
          animate={{ opacity: 1, scaleY: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scaleY: 0.5, filter: "blur(4px)" }}
          transition={{ duration: 0.9, type: "spring", bounce: 0 }}
        >
          {children}
        </motion.p>
      )
    }
  }, [isOpen])

  const handleMenuClick = () => {
    if (isOpen) {
      setIsOpen(false)
      enableScroll()
    } else {
      setIsOpen(true)
      disableScroll()
    }
  }
  return (
    <div className="col-start-3 col-end-5 flex items-center justify-end gap-5 lg:hidden">
      <MusicToggle />

      <button
        onClick={handleMenuClick}
        className="flex items-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isOpen ? <Label>Close</Label> : <Label>Menu</Label>}
        </AnimatePresence>

        <span
          className="relative flex w-5 flex-col items-center justify-center gap-1 overflow-visible pl-1"
          ref={menuHandlerRef}
          aria-labelledby="menu-button"
        >
          <span
            className={cn(
              "h-[1.5px] w-full origin-center transform bg-brand-w1 transition-[transform,width] duration-300 ease-in-out",
              { "w-10/12 translate-y-[3px] rotate-[45deg]": isOpen }
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-full origin-center transform bg-brand-w1 transition-[transform,width] duration-300 ease-in-out",
              { "w-10/12 -translate-y-[2.5px] -rotate-[45deg]": isOpen }
            )}
          />
        </span>
      </button>

      <AnimatePresence>{memoizedMenu}</AnimatePresence>
    </div>
  )
})
MobileContent.displayName = "MobileContent"
