import type { getArticleList } from "./articles"
import type { fetchBookmarksByUsername } from "@/actions/bookmark-actions"
import type { fetchArticlesByUsername } from "@/actions/like-actions"

export function joinArticles(
  fetchedArticles:
    | Awaited<ReturnType<typeof fetchArticlesByUsername>>
    | Awaited<ReturnType<typeof fetchBookmarksByUsername>>,
  articles: Awaited<ReturnType<typeof getArticleList>>,
) {
  return (
    articles
      .map((article) => {
        const isHit = fetchedArticles.some(
          (item) => item.articleURL === article.slug,
        )
        return isHit ? article : null // 一致した場合は記事を返し、一致しない場合はnull
      })
      // nullを除外して最終的なlikedArticlesを得る
      .filter((article) => article !== null)
  )
}
