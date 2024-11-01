import { CalendarIcon, StarIcon, UserIcon } from "@yamada-ui/lucide"
import {
  Card,
  CardBody,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Tag,
  Text,
} from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import Link from "next/link"
import type { FC } from "react"
import { Contributor } from "./contributors"

interface ArticleCardProps {
  article: ArticleMetadata
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card key={article.slug} as={LinkBox}>
      <CardBody gap="md">
        <Heading as="h3" fontSize="xl" mb="md">
          <LinkOverlay href={`/${article.slug}`} as={Link}>
            {article.title}
          </LinkOverlay>
        </Heading>
        <Text>{article.description}</Text>
        <HStack
          flexWrap="wrap"
          textAlign="right"
          display={{ base: "flex", sm: "none" }}
        >
          {article?.keyword?.map((word) => <Tag href={`/tag-search?query=${encodeURIComponent(word)}`} as={Link} key={word}>{word}</Tag>)}
        </HStack>

        <HStack
          flexDir={{ base: "row", sm: "column" }}
          alignItems={{ base: "center", sm: "start" }}
        >
          <HStack gap="0">
            <UserIcon />
            <Contributor contributors={article.contributors} />
          </HStack>
          <Spacer display={{ base: "flex", sm: "none" }} />
          <HStack>
            <CalendarIcon />
            <Text>{article.latest_date}</Text>
          </HStack>
          <HStack>
            <StarIcon />
            <Text>10</Text>
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  )
}
