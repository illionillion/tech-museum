import { GitPullRequestIcon, InfoIcon } from "@yamada-ui/lucide"
import {
  ButtonGroup,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Card,
  CardBody,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { TopContributor } from "@/components/data-display/top-contributor"
import { TopPageTabs } from "@/components/disclosure/top-page-tabs"
import { Layout } from "@/components/layouts"
import { getArticleList } from "@/utils/articles"

export default async function Home() {
  const articles = await getArticleList()
  return (
    <Layout>
      <Banner />
      <HStack w="full" alignItems="start">
        <VStack w="full" gap="md">
          <TopPageTabs articles={articles} />
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

const Banner: FC = () => {
  return (
    <Card
      w="full"
      textAlign="center"
      p="lg"
      borderRadius="md"
      bgGradient={[
        "linear(-60deg, primary.500, secondary.500)",
        "linear(-60deg, primary.600, secondary.600)",
      ]}
    >
      <VStack gap="md">
        <Heading color="white" as="h2">
          オープンソースで技術ブログを革新する
        </Heading>
        <Text color="white">
          Githubを活用した共同執筆でより質の高いコンテンツを
        </Text>

        <ButtonGroup gap="md" margin="0 auto">
          <Button
            as="a"
            target="_blank"
            href="https://github.com/illionillion/tech-museum/blob/main/CONTRIBUTING.ja.md"
          >
            はじめる
          </Button>
          <Button as={Link} href="/welcome">
            詳しく見る
          </Button>
        </ButtonGroup>
      </VStack>
    </Card>
  )
}

const GithubButtons: FC = () => {
  return (
    <Card w="full" p="md">
      <CardBody textAlign="left">
        <Heading as="h4" mb="md" fontSize="xl">
          参加する
        </Heading>
        <VStack gap="md" m="0 auto">
          <Button
            variant="outline"
            colorScheme="primary"
            leftIcon={<InfoIcon />}
            as="a"
            target="_blank"
            href="https://github.com/illionillion/tech-museum/issues"
          >
            Issueを見る
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            leftIcon={<GitPullRequestIcon />}
            as="a"
            target="_blank"
            href="https://github.com/illionillion/tech-museum/pulls"
          >
            Pull Requestを見る
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}
