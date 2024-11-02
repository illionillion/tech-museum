import { ThumbsUpIcon } from "@yamada-ui/lucide"
import { HStack, Text, useSafeLayoutEffect } from "@yamada-ui/react"
import type { FC } from "react"
import { useState } from "react"
import { fetchLikeCount } from "@/actions/like-actions"
import type { getArticleList } from "@/utils/articles"

interface LikeCountProps {
  article: Awaited<ReturnType<typeof getArticleList>>[number]
}

export const LikeCount: FC<LikeCountProps> = ({ article }) => {
  const [count, setCount] = useState(article.likeCount)

  const countFetch = async () => {
    const newCount = await fetchLikeCount(article.slug)
    setCount(newCount)
  }

  useSafeLayoutEffect(() => {
    countFetch()
  }, [])

  return (
    <HStack gap="sm">
      <ThumbsUpIcon />
      <Text>{count}</Text>
    </HStack>
  )
}
