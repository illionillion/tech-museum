"use client"
import {
  Center,
  Tab,
  TabPanel,
  Tabs,
  Text,
  useAsync,
  VStack,
} from "@yamada-ui/react"
import { useSession } from "next-auth/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import { fetchArticlesByUsername } from "@/actions/like-actions"
import type { getArticleList } from "@/utils/articles"

interface TopPageTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
}
export const TopPageTabs: FC<TopPageTabsProps> = ({ articles }) => {
  const { data: session } = useSession()
  const { value: likedArticles } = useAsync(async () => {
    // 例として、likedArticlesを取得する処理
    const fetchedArticles = await fetchArticlesByUsername(
      session?.user?.name || "",
    )

    const newArticles = (
      await Promise.all(
        articles.map(async (article) => {
          const isLiked = fetchedArticles.some(
            (item) => item.articleURL === article.slug,
          )
          return isLiked ? article : null // 一致した場合は記事を返し、一致しない場合はnull
        }),
      )
    )
      // nullを除外して最終的なlikedArticlesを得る
      .filter((article) => article !== null)

    return newArticles
  })
  return (
    <Tabs>
      <Tab>一覧</Tab>
      <Tab>いいね</Tab>
      <Tab>ブックマーク</Tab>
      <Tab>フォロー中</Tab>

      <TabPanel>
        <VStack>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </VStack>
      </TabPanel>
      <TabPanel>
        {likedArticles?.length ? (
          likedArticles?.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <Center>
            <Text>いいねした記事はありません</Text>
          </Center>
        )}
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>ブックマークされた記事はありません</Text>
        </Center>
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>フォロー中のユーザーの記事はありません</Text>
        </Center>
      </TabPanel>
    </Tabs>
  )
}
