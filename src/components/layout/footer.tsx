import { FooterContent } from "./footer-content"
import { fetchCompanyInfo, fetchPostsCount, fetchProjectsCount } from "./sanity"

const FALLBACK_SOCIAL = {
  twitter: "https://x.com/automatrix_ai",
  instagram: "https://instagram.com/automatrix.ia",
  github: "https://github.com/morfeu333",
  linkedIn: ""
}

export const Footer = async () => {
  const [projectsCount, postsCount, companyInfo] = await Promise.all([
    fetchProjectsCount(),
    fetchPostsCount(),
    fetchCompanyInfo()
  ])

  return (
    <FooterContent
      projectsCount={projectsCount ?? 0}
      postsCount={postsCount ?? 0}
      socialLinks={{
        twitter: companyInfo?.twitter || FALLBACK_SOCIAL.twitter,
        instagram: companyInfo?.instagram || FALLBACK_SOCIAL.instagram,
        github: companyInfo?.github || FALLBACK_SOCIAL.github,
        linkedIn: companyInfo?.linkedIn || FALLBACK_SOCIAL.linkedIn
      }}
      newsletter={companyInfo?.newsletter || []}
    />
  )
}
