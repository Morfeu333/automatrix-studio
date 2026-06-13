import { NavbarContent } from "./navbar-content"
import { fetchCompanyInfo, fetchPostsCount, fetchProjectsCount } from "./sanity"

interface NavbarLink {
  title: string
  href: string
  count?: number
}

export const Navbar = async () => {
  const [projectsCount, postsCount, companyInfo] = await Promise.all([
    fetchProjectsCount(),
    fetchPostsCount(),
    fetchCompanyInfo()
  ])

  const LINKS: NavbarLink[] = [
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
    <NavbarContent
      key="navbar-content"
      links={LINKS}
      socialLinks={{
        twitter: companyInfo?.twitter || "https://x.com/automatrix_ai",
        instagram: companyInfo?.instagram || "https://instagram.com/automatrix.ia",
        github: companyInfo?.github || "https://github.com/morfeu333",
        linkedIn: companyInfo?.linkedIn || ""
      }}
      newsletter={companyInfo?.newsletter || []}
    />
  )
}
