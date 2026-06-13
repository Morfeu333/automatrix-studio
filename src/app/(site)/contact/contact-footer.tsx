import { fetchCompanyInfo } from "@/components/layout/sanity"
import { SocialLinks } from "@/components/layout/shared-sections"

export const ContactFooter = async () => {
  const companyInfo = await fetchCompanyInfo()

  return (
    <footer className="col-span-4 row-start-2 mt-auto flex flex-col justify-end gap-6 xl:mt-0">
      <a
        href="mailto:lucas@automatrix-ia.com"
        className="w-fit text-[30px] font-semibold not-italic leading-none tracking-[-2.16px] xl:text-[56px] xl:tracking-[-2.24px]"
      >
        <span className="actionable actionable-no-underline group !inline">
          <span className="custom-underline">lucas@</span>
          <br />
          <span className="custom-underline">automatrix-</span>
          <br />
          <span className="custom-underline">ia.com</span>
        </span>
      </a>
      <SocialLinks
        links={{
          twitter: companyInfo.twitter || "https://x.com/automatrix_ai",
          instagram: companyInfo.instagram || "https://instagram.com/automatrix.ia",
          github: companyInfo.github || "https://github.com/morfeu333",
          linkedIn: companyInfo.linkedIn || ""
        }}
        className="flex items-center gap-2 text-f-h3-mobile lg:text-f-h3"
      />
    </footer>
  )
}
