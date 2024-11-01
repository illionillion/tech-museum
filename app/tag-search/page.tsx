import { Text, VStack } from "@yamada-ui/react"
import React from "react"
import { ArticleCard } from "@/components/data-display/article-card"
import { Layout } from "@/components/layouts"
import { getArticleList } from "@/utils/articles"

interface Props {
  searchParams: { query?: string }
}

const Page = async ({ searchParams }: Props) => {
  const { query } = searchParams

  if (!query) {
    return <Text>Home page or default content</Text>
  }

  const articles = (await getArticleList()).filter((article) => article.keyword.includes(query))
  
  return (
    <Layout>
      <VStack>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </VStack>
    </Layout>
  )
}

export default Page
