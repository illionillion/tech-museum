"use client"

import { Center, Tab, TabPanel, Tabs, Text, VStack } from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import React from "react"
import { ArticleCard } from "../data-display/article-card"
import type { getArticleList } from "@/utils/articles"

interface ProfileTabsProps {
  articles: Awaited<ReturnType<typeof getArticleList>>
  tabKey?: "contributions" | "likes" | "bookmarks" | string
  username?: string
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ articles, tabKey, username }) => {
  // デフォルトでは contributions タブを表示
  const tabIndex = tabKey === "likes" ? 1 : tabKey === "bookmarks" ? 2 : 0

  return (
    <Tabs index={tabIndex}>
      <Tab as={Link} href={`/contributors/${username}?tab_key=contributions`}>コントリビュート</Tab>
      <Tab as={Link} href={`/contributors/${username}?tab_key=likes`}>いいね</Tab>
      <Tab as={Link} href={`/contributors/${username}?tab_key=bookmarks`}>ブックマーク</Tab>

      <TabPanel>
        <VStack>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </VStack>
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>いいねした記事はありません</Text>
        </Center>
      </TabPanel>
      <TabPanel>
        <Center>
          <Text>ブックマークした記事はありません</Text>
        </Center>
      </TabPanel>
    </Tabs>
  )
}
