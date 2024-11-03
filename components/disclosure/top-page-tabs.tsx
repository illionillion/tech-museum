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
import { useSession } from "next-auth/react"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import { fetchBookmarksByUsername } from "@/actions/bookmark-actions"
import { fetchArticlesByUsername } from "@/actions/like-actions"
import type { getArticleList } from "@/utils/articles"
import { joinArticles } from "@/utils/join-articles"

interface TopPageTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
  tabKey?: "list" | "likes" | "bookmarks" | "followings" | string
}

export const TopPageTabs: FC<TopPageTabsProps> = ({ articles, tabKey }) => {

  const { data: session } = useSession()
  const { value: likedArticles } = useAsync(async () => {
    // 例として、likedArticlesを取得する処理
    const fetchedArticles = await fetchArticlesByUsername(
      session?.user?.name || "",
    )

    return joinArticles(fetchedArticles, articles)
  })
  const { value: bookmarks } = useAsync(async () => {
    // 例として、likedArticlesを取得する処理
    const fetchedArticles = await fetchBookmarksByUsername(
      session?.user?.name || "",
    )

    return joinArticles(fetchedArticles, articles)
  })
  const tabIndex = tabKey === "likes" ? 1
    : tabKey === "bookmarks" ? 2
    : tabKey === "followings" ? 3
      : 0

  return (
    <Tabs index={tabIndex}>
      <Tab as={Link} href="/?tab_key=list">一覧</Tab>
      <Tab as={Link} href="/?tab_key=likes">いいね</Tab>
      <Tab as={Link} href="/?tab_key=bookmarks">ブックマーク</Tab>
      <Tab as={Link} href="/?tab_key=followings">フォロー中</Tab>

      <TabPanel>
        <VStack>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
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
            <Text>ブックマークされた記事はありません</Text>
          </Center>
        )}
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>フォロー中のユーザーの記事はありません</Text>
        </Center>
      </TabPanel>
    </Tabs>
  )
}
