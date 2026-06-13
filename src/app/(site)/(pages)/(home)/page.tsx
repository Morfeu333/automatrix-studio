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

const Homepage = async () => {
  const [data, orgData] = await Promise.all([
    fetchHomepage(),
    fetchOrganizationData()
  ])

  return (
    <div className="flex flex-col gap-18 lg:gap-32">
      <JsonLd data={generateOrganizationSchema(orgData)} />
      <JsonLd data={generateWebSiteSchema()} />
      <Intro data={data} />
      <Brands data={data} />
      <FeaturedProjects data={data} />
      <Capabilities data={data} />
      <Contact />
    </div>
  )
}

export default Homepage
