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
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import { fetchArticlesByUsername } from "@/actions/like-actions"
import type { getArticleList } from "@/utils/articles"

interface ProfileTabsProps {
  username: string
  articles: Awaited<ReturnType<typeof getArticleList>>
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ username, articles }) => {
  const { value: likedArticles } = useAsync(async () => {
    // 例として、likedArticlesを取得する処理
    const fetchedArticles = await fetchArticlesByUsername(username || "")

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
      <Tab>コントリビュート</Tab>
      <Tab>いいね</Tab>
      <Tab>ブックマーク</Tab>

      <TabPanel>
        <VStack>
          {articles.length ? (
            articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          ) : (
            <Center>
              <Text>記事はありません</Text>
            </Center>
          )}
        </VStack>
      </TabPanel>
      <TabPanel>
        {likedArticles && likedArticles.length ? (
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
          <Text>ブックマークした記事はありません</Text>
        </Center>
      </TabPanel>
    </Tabs>
  )
}
