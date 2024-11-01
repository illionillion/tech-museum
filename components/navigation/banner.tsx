import {
  ButtonGroup,
  Heading,
  Text,
  Button,
  VStack,
  Card,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"

export const Banner: FC = () => {
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
