import {
  VStack,
  HStack,
} from "@yamada-ui/react"
import { TopContributor } from "@/components/data-display/top-contributor"
import { TopPageTabs } from "@/components/disclosure/top-page-tabs"
import { Layout } from "@/components/layouts"
import { Banner } from "@/components/navigation/banner"
import { GithubButtons } from "@/components/navigation/github-buttons"
import { getArticleList } from "@/utils/articles"

interface Props {
  searchParams: { tab_key?: string }
}

export default async function Home({ searchParams }: Props) {
  const { tab_key } = searchParams
  const articles = await getArticleList()
  return (
    <Layout>
      <Banner />
      <HStack w="full" alignItems="start">
        <VStack w="full" gap="md">
          <TopPageTabs articles={articles} tabKey={tab_key} />
        </VStack>
        <VStack
          maxW="sm"
          w="full"
          gap="md"
          display={{ base: "flex", lg: "none" }}
        >
          <TopContributor isLink />
          <GithubButtons />
        </VStack>
      </HStack>
    </Layout>
  )
}
