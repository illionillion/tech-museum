import { Center, Text, VStack } from "@yamada-ui/react"
import type { Metadata } from "next"
import React from "react"
import { ArticleCard } from "@/components/data-display/article-card"
import { Layout } from "@/components/layouts"
import { getArticleList } from "@/utils/articles"

interface Props {
  searchParams: { query?: string }
}

export const generateMetadata = ({ searchParams }: Props): Metadata => {
  return {
    title: `タグ検索: ${searchParams.query}`,
  }
}

const Page = async ({ searchParams }: Props) => {
  const { query } = searchParams

  if (!query) {
    return <Text>Home page or default content</Text>
  }
  const tags = query.split(",")

  const articles = (await getArticleList()).filter((article) => article.keyword.some((word) => tags.includes(word)))

  return (
    <Layout>
      {articles.length > 0
        ? (
          <VStack>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </VStack>
        )
        : (
          <Center flexDir="column" mx="auto" maxW="md" gap="md">
            <Text>記事が見つかりませんでした</Text>
          </Center>
        )}
    </Layout>
  )
}

export default Page
