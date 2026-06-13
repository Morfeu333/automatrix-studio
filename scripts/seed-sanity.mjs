/**
 * Seed script for Automatrix IA Sanity dataset.
 *
 * Usage:
 *   SANITY_READ_TOKEN=<token> node scripts/seed-sanity.mjs
 *
 * Requires the token to have write access (editor or above).
 * The token in .env.local is a read token — you need a write token from:
 *   https://sanity.io/manage/project/prjw6h6g/api#tokens
 */

import { createClient } from "@sanity/client"

const PROJECT_ID = "prjw6h6g"
const DATASET = "production"
const API_VERSION = "2026-01-01"

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN
if (!token) {
  console.error("Error: set SANITY_WRITE_TOKEN env var before running this script")
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false
})

async function upsert(doc) {
  return client.createOrReplace({ ...doc })
}

async function seed() {
  console.log("Seeding Automatrix IA Sanity dataset...\n")

  // -----------------------------------------------------------------------
  // 1. Company Info
  // -----------------------------------------------------------------------
  await upsert({
    _id: "companyInfo",
    _type: "companyInfo",
    title: "Company Info",
    github: "https://github.com/morfeu333",
    instagram: "https://instagram.com/automatrix.ia",
    twitter: "https://x.com/automatrix_ai",
    linkedIn: "",
    newsletter: [
      {
        _type: "block",
        _key: "newsletter-block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "newsletter-span-1",
            text: "Assine nossa newsletter e receba novidades sobre automação com IA."
          }
        ]
      }
    ]
  })
  console.log("✓ companyInfo")

  // -----------------------------------------------------------------------
  // 2. Homepage singleton
  // -----------------------------------------------------------------------
  await upsert({
    _id: "homepage",
    _type: "homepage",
    introTitle: [
      {
        _type: "block",
        _key: "intro-title-1",
        style: "normal",
        children: [
          { _type: "span", _key: "t1", text: "Automatize com" },
          { _type: "span", _key: "t2", text: " Inteligência Artificial" }
        ]
      }
    ],
    introSubtitle: [
      {
        _type: "block",
        _key: "intro-sub-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Crie automações, apps e workflows conversando com nosso agente IA. n8n, chatbots, WhatsApp, CRM e muito mais."
          }
        ]
      }
    ],
    capabilitiesIntro: [
      {
        _type: "block",
        _key: "cap-intro-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "c1",
            text: "Do que somos capazes"
          }
        ]
      }
    ],
    featuredProjects: [],
    capabilities: [],
    clients: []
  })
  console.log("✓ homepage")

  // -----------------------------------------------------------------------
  // 3. People page (title: string, subheading1/2: block[])
  // -----------------------------------------------------------------------
  await upsert({
    _id: "peoplePage",
    _type: "peoplePage",
    title: "Equipe",
    subheading1: [
      {
        _type: "block",
        _key: "people-sub1-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ps1-1",
            text: "Pessoas que tornam a automação com IA acessível para todos."
          }
        ]
      }
    ],
    subheading2: [
      {
        _type: "block",
        _key: "people-sub2-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "ps2-1",
            text: "Uma equipe multidisciplinar apaixonada por tecnologia e resultados."
          }
        ]
      }
    ],
    preOpenPositionsText: [
      {
        _type: "block",
        _key: "pre-op-1",
        style: "normal",
        children: [{ _type: "span", _key: "pop1", text: "Quer fazer parte da equipe? Entre em contato." }]
      }
    ]
  })
  console.log("✓ peoplePage")

  // -----------------------------------------------------------------------
  // 4. Departments
  // -----------------------------------------------------------------------
  const deptDev = await upsert({
    _id: "dept-dev",
    _type: "department",
    title: "Desenvolvimento"
  })
  const deptDesign = await upsert({
    _id: "dept-design",
    _type: "department",
    title: "Design & Automação"
  })
  console.log("✓ departments")

  // -----------------------------------------------------------------------
  // 5. Team members
  // -----------------------------------------------------------------------
  await upsert({
    _id: "person-lucas",
    _type: "person",
    title: "Lucas Automatrix",
    role: "Fundador & CEO",
    department: { _type: "reference", _ref: "dept-dev" },
    socialNetworks: [
      { _key: "sn-github", platform: "github", url: "https://github.com/morfeu333" },
      { _key: "sn-ig", platform: "instagram", url: "https://instagram.com/automatrix.ia" }
    ]
  })

  await upsert({
    _id: "person-leo",
    _type: "person",
    title: "Leo",
    role: "Dev Full-Stack",
    department: { _type: "reference", _ref: "dept-dev" },
    socialNetworks: []
  })

  await upsert({
    _id: "person-henrique",
    _type: "person",
    title: "Henrique",
    role: "Colaborador",
    department: { _type: "reference", _ref: "dept-design" },
    socialNetworks: []
  })
  console.log("✓ people (Lucas, Leo, Henrique)")

  // -----------------------------------------------------------------------
  // 6. Project categories (capabilities)
  // -----------------------------------------------------------------------
  await upsert({
    _id: "cat-automation",
    _type: "projectCategory",
    title: "Automação",
    slug: { _type: "slug", current: "automacao" },
    description: "Workflows automáticos com n8n, Zapier e IA",
    subcategories: [
      { _key: "sub-n8n", title: "n8n & Make" },
      { _key: "sub-whatsapp", title: "WhatsApp Business" },
      { _key: "sub-crm", title: "CRM & Vendas" }
    ]
  })

  await upsert({
    _id: "cat-chatbots",
    _type: "projectCategory",
    title: "Chatbots & IA",
    slug: { _type: "slug", current: "chatbots-ia" },
    description: "Agentes conversacionais com Claude, GPT e modelos locais",
    subcategories: [
      { _key: "sub-agents", title: "Agentes Autônomos" },
      { _key: "sub-rag", title: "RAG & Base de Conhecimento" }
    ]
  })

  await upsert({
    _id: "cat-apps",
    _type: "projectCategory",
    title: "Apps & Integrações",
    slug: { _type: "slug", current: "apps-integracoes" },
    description: "Aplicações web e integrações entre sistemas",
    subcategories: [
      { _key: "sub-webapp", title: "Web Apps" },
      { _key: "sub-api", title: "API & Integrações" }
    ]
  })
  console.log("✓ projectCategories")

  // -----------------------------------------------------------------------
  // 7. Showcase page
  // -----------------------------------------------------------------------
  await upsert({
    _id: "showcasePage",
    _type: "showcasePage",
    projects: []
  })
  console.log("✓ showcasePage")

  // -----------------------------------------------------------------------
  // 8. Services page (title: string, intro: block[])
  // -----------------------------------------------------------------------
  await upsert({
    _id: "servicesPage",
    _type: "servicesPage",
    title: "Services",
    intro: [
      {
        _type: "block",
        _key: "svc-intro-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "si1",
            text: "Transformamos ideias em soluções automatizadas com IA."
          }
        ]
      }
    ],
    serviceCategories: [
      {
        _key: "svc-cat-1",
        title: "Automação de Processos",
        description: [
          {
            _type: "block",
            _key: "svc-cat-desc-1",
            style: "normal",
            children: [{ _type: "span", _key: "sd1", text: "Workflows com n8n, Make e APIs." }]
          }
        ]
      },
      {
        _key: "svc-cat-2",
        title: "Chatbots & Agentes IA",
        description: [
          {
            _type: "block",
            _key: "svc-cat-desc-2",
            style: "normal",
            children: [{ _type: "span", _key: "sd2", text: "Assistentes conversacionais para WhatsApp, web e apps." }]
          }
        ]
      },
      {
        _key: "svc-cat-3",
        title: "Consultoria & Implementação",
        description: [
          {
            _type: "block",
            _key: "svc-cat-desc-3",
            style: "normal",
            children: [{ _type: "span", _key: "sd3", text: "Diagnóstico, estratégia e execução de projetos de IA." }]
          }
        ]
      }
    ]
  })
  console.log("✓ servicesPage")

  console.log("\n✅ Seed completo! Acesse http://localhost:3001 para ver o resultado.")
  console.log("   Sanity Studio: http://localhost:3001/studio")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
