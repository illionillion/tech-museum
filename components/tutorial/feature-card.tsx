import {
  GitPullRequestArrow,
  BookOpen,
  UsersRound,
  Puzzle,
} from "@yamada-ui/lucide"

import {
  Heading,
  Text,
  Card,
  SimpleGrid,
  GridItem,
  Icon,
  CardBody,
  HStack,
} from "@yamada-ui/react"
import type { FC } from "react"

export const FeatureCard: FC = () => {
  const features = [
    {
      title: "オープンソースの力",
      icon: GitPullRequestArrow,
      color: "blue.500",
      description:
        "Githubを活用した共同執筆で、より質の高い技術コンテンツを生み出します。",
    },
    {
      title: "幅広い技術トピック",
      icon: BookOpen,
      color: "green.500",
      description:
        "フロントエンド、バックエンド、データベース、セキュリティなど、幅広い技術トピックをカバーします。",
    },
    {
      title: "活発なコミュニティー",
      icon: UsersRound,
      color: "purple.500",
      description:
        "エンジニア同士が知識を共有し、お互いに学び合える環境を提供します。",
    },
    {
      title: "キャリア成長",
      icon: Puzzle,
      color: "red.500",
      description:
        "記事の執筆やレビューを通うじて、技術力とコミュニケーション能力を向上させます",
    },
  ]
  return (
    <>
      <Heading as="h2" fontSize={{ base: "5xl", md: "lg" }} m="auto">
        Tech.museumの特徴
      </Heading>
      <SimpleGrid w="full" columns={{ base: 2, md: 1 }} gap="md">
        {features.map((feature) => (
          <GridItem key={feature.title} w="full" rounded="md" as={Card}>
            <CardBody>
              <HStack>
                <Icon color={feature.color} as={feature.icon} fontSize="4xl" />
                <Heading as="h3" fontSize={{ base: "lg", md: "md" }}>
                  {feature.title}
                </Heading>
              </HStack>
              <Text>{feature.description}</Text>
            </CardBody>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  )
}
