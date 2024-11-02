import { readFile } from "fs/promises"
import type { ArticleMetadata } from "article"
import { glob } from "glob"
import matter from "gray-matter"
import type { fetchBookmarksByUsername } from "@/actions/bookmark-actions"
import type { fetchArticlesByUsername} from "@/actions/like-actions";
import { fetchLikeCount } from "@/actions/like-actions"

export const getArticlePaths = async (dir: string) => {
  const articlePaths = (await glob(`contents/${dir}/**/*.md`)).map((filePath) =>
    filePath
      .replace(/\\/g, "/")
      .replace(/^contents\//, "")
      .replace(`${dir}/`, "")
      .replace(".md", "")
      .split("/"),
  )
  return articlePaths.map((path) => ({ slug: path }))
}

export const getArticleList = async () => {
  const articlePaths = await glob(`contents/**/*.md`)

  const articleList = await Promise.all(
    articlePaths.map(async (articlePath) => {
      const { metadata } = await getArticleContent(
        articlePath.replace(".md", ""),
      )
      const likeCount = await fetchLikeCount(
        articlePath.replace("contents/", "").replace(".md", ""),
      )

      const slug = articlePath
        .replace(/\\/g, "/")
        .replace(/^contents\//, "")
        .replace(".md", "")
      return { ...metadata, slug, likeCount }
    }),
  )

  return articleList
}

export const getArticleContent = async (
  dir: string,
): Promise<{ content: string; metadata?: ArticleMetadata }> => {
  const articleFilePath = dir + ".md"

  try {
    const fileContent = await readFile(articleFilePath, "utf-8")
    const { data, content } = matter(fileContent)
    const metadataContent = data as ArticleMetadata
    return { content, metadata: metadataContent }
  } catch (error) {
    console.error(`Failed to read markdown file: ${error}`)
    return { content: "" }
  }
}

export function joinArticles(
  fetchedArticles: Awaited<ReturnType<typeof fetchArticlesByUsername>> | Awaited<ReturnType<typeof fetchBookmarksByUsername>>,
  articles: Awaited<ReturnType<typeof getArticleList>>
) {
  return articles.map((article) => {
    const isHit = fetchedArticles.some(
      (item) => item.articleURL === article.slug,
    )
    return isHit ? article : null // 一致した場合は記事を返し、一致しない場合はnull
  })
    // nullを除外して最終的なlikedArticlesを得る
    .filter((article) => article !== null)
}
