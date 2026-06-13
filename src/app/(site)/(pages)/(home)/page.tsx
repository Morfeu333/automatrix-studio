import type { Metadata } from "next"

import { Contact } from "@/components/layout/contact"
import { JsonLd } from "@/lib/structured-data/json-ld"
import {
  generateOrganizationSchema,
  generateWebSiteSchema
} from "@/lib/structured-data/schemas/organization"

import { Brands } from "./brands"
import { Capabilities } from "./capabilities"
import { FeaturedProjects } from "./featured-projects"
import { Intro } from "./intro"
import { fetchHomepage, fetchOrganizationData } from "./sanity"

export const metadata: Metadata = {
  title: {
    absolute: "Automatrix IA | Automatize com Inteligência Artificial"
  },
  description:
    "Crie automações, apps e workflows conversando com nosso agente IA. n8n, chatbots, WhatsApp, CRM e muito mais.",
  alternates: {
    canonical: "https://automatrix-ia.com"
  }
}

const FALLBACK_DATA = {
  homepage: {
    introTitle: null,
    introSubtitle: null,
    capabilitiesIntro: null,
    featuredProjects: null,
    capabilities: null,
    clients: null
  }
}

const FALLBACK_ORG = {
  description: "Automatize com Inteligência Artificial",
  foundingDate: "2024",
  email: "lucas@automatrix-ia.com",
  addressCity: "Brasil",
  addressRegion: null,
  addressCountry: "BR",
  logoUrl: null,
  founders: [{ name: "Lucas", url: null, jobTitle: "CEO" }],
  awards: [],
  social: {
    github: "https://github.com/morfeu333",
    instagram: "https://instagram.com/automatrix.ia",
    twitter: "https://x.com/automatrix_ai",
    linkedIn: null
  }
}

const Homepage = async () => {
  const [data, orgData] = await Promise.all([
    fetchHomepage(),
    fetchOrganizationData()
  ])

  const safeData: typeof FALLBACK_DATA = {
    homepage: data?.homepage ?? FALLBACK_DATA.homepage
  }
  const safeOrg = orgData ?? FALLBACK_ORG

  return (
    <div className="flex flex-col gap-18 lg:gap-32">
      <JsonLd data={generateOrganizationSchema(safeOrg)} />
      <JsonLd data={generateWebSiteSchema()} />
      <Intro data={safeData} />
      <Brands data={safeData} />
      <FeaturedProjects data={safeData} />
      <Capabilities data={safeData} />
      <Contact />
    </div>
  )
}

export default Homepage
