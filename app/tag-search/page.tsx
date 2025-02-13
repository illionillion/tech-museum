import { Center, Heading, Text, VStack } from "@yamada-ui/react"
import type { Metadata } from "next"
import React from "react"
import { ArticleCard } from "@/components/data-display/article-card"
import { Layout } from "@/components/layouts"
import { getArticleList } from "@/utils/articles"

interface Props {
  searchParams: { query?: string[] | string }
}

export const generateMetadata = ({ searchParams }: Props): Metadata => {
  return {
    title: `タグ検索: ${searchParams.query}`,
  }
}

const Page = async ({ searchParams }: Props) => {
  const { query } = searchParams
  const queryArray = Array.isArray(query) ? query : [query]

  const tags = queryArray
    .filter((i) => i)
    .flatMap((i) => (i as string).split(","))
    .map((i) => i.trim())
  const upperTags = tags.map((tag) => tag.toUpperCase())

  const articles = (await getArticleList()).filter((article) =>
    article?.keyword
      ?.map((word) => word.toUpperCase())
      .some((word) => upperTags.includes(word)),
  )

  return (
    <Layout>
      {articles.length > 0 ? (
        <VStack>
          <Heading>タグ検索: {tags.join(", ")}</Heading>
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </VStack>
      ) : (
        <Center flexDir="column" mx="auto" maxW="md" gap="md">
          <Text>記事が見つかりませんでした</Text>
        </Center>
      )}
    </Layout>
  )
}

export default Page
