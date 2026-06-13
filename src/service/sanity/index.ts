import type { QueryParams } from "next-sanity"

import { client } from "./client"
import { liveSanityFetch } from "./live"

export { client }

type Perspective = "published" | "drafts"

export async function sanityFetch<T>({
  query,
  params = {},
  stega,
  perspective
}: {
  query: string
  params?: QueryParams
  /** Disable stega encoding (use in generateMetadata, generateStaticParams, and for asset URLs/IDs). */
  stega?: boolean
  /** Override the perspective. Pass "published" in generateStaticParams / generateMetadata. */
  perspective?: Perspective
}): Promise<T> {
  try {
    const { data } = await liveSanityFetch({
      query,
      params,
      stega,
      perspective
    })
    return data as T
  } catch (err) {
    // Dataset may not exist yet — return null so pages render with fallback content
    if (process.env.NODE_ENV === "development") {
      console.warn("[Sanity] fetch failed (dataset missing?):", (err as Error).message)
    }
    return null as T
  }
}
