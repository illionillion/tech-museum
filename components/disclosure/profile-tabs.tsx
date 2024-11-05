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
import Link from "next/link"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import { fetchBookmarksByUsername } from "@/actions/bookmark-actions"
import { fetchArticlesByUsername } from "@/actions/like-actions"
import type { getArticleList } from "@/utils/articles"
import { joinArticles } from "@/utils/join-articles"

interface ProfileTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
  userArticles: Awaited<ReturnType<typeof getArticleList>>
  tabKey?: "contributions" | "likes" | "bookmarks" | string
  username?: string
}

export const ProfileTabs: FC<ProfileTabsProps> = ({
  articles,
  userArticles,
  tabKey,
  username,
}) => {
  // デフォルトでは contributions タブを表示
  const tabIndex = tabKey === "likes" ? 1 : tabKey === "bookmarks" ? 2 : 0

  const { value: likedArticles } = useAsync(async () => {
    // 例として、likedArticlesを取得する処理
    const fetchedArticles = await fetchArticlesByUsername(username || "")
    return joinArticles(fetchedArticles, articles)
  })
  const { value: bookmarks } = useAsync(async () => {
    const fetchedArticles = await fetchBookmarksByUsername(username || "")
    return joinArticles(fetchedArticles, articles)
  })

  return (
    <Tabs index={tabIndex}>
      <Tab as={Link} href={`/contributors/${username}?tab_key=contributions`}>
        コントリビュート
      </Tab>
      <Tab as={Link} href={`/contributors/${username}?tab_key=likes`}>
        いいね
      </Tab>
      <Tab as={Link} href={`/contributors/${username}?tab_key=bookmarks`}>
        ブックマーク
      </Tab>

      <TabPanel>
        <VStack>
          {userArticles.length ? (
            userArticles.map((article) => (
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
        {bookmarks && bookmarks.length ? (
          bookmarks?.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))
        ) : (
          <Center>
            <Text>ブックマークした記事はありません</Text>
          </Center>
        )}
      </TabPanel>
    </Tabs>
  )
}
