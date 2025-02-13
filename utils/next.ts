import path from "path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleContent, getArticlePaths } from "./articles"
import { fetchBookmarkCount } from "@/actions/bookmark-actions"
import { fetchLikeCount } from "@/actions/like-actions"
import contributorData from "@/i18n/contributors.json"

interface Props {
  params: { slug?: string[] }
}

export const generateArticleMetadata =
  (categoryGroupName: string) =>
  async ({ params }: Props): Promise<Metadata> => {
    const { slug } = params

    if (!slug)
      return {
        title: "Not Found",
        description: "Not Found",
      }

    const { metadata } = await getStaticArticleContent(categoryGroupName)(slug)

    return {
      title: metadata?.title || "Not Content Found",
      description: metadata?.description || "Not Content Found",
      keywords: metadata?.keyword,
    }
  }

export const generateStaticArticleParams =
  (categoryGroupName: string) => async () => {
    const paths = await getArticlePaths(categoryGroupName)

    return paths
  }

export const getStaticArticleContent =
  (categoryGroupName: string) => async (slug?: string[]) => {
    const contentsPath = path.join(
      process.cwd(),
      "contents",
      categoryGroupName,
      ...(slug || []),
    )
    const { content, metadata } = await getArticleContent(contentsPath)

    if (!content) {
      notFound()
    }

    const likeCount = await fetchLikeCount(
      path.join(categoryGroupName, ...(slug || [])),
    )
    const bookmarkCount = await fetchBookmarkCount(
      path.join(categoryGroupName, ...(slug || [])),
    )

    return {
      content: content || "No content found",
      metadata: metadata,
      likeCount,
      bookmarkCount,
    }
  }

export const getContributors = () => {
  return contributorData
}
