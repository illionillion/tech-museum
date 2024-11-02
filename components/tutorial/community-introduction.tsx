import {
  Button,
  Heading,
  Text,
  Container,
} from "@yamada-ui/react"
import type { FC } from "react"

export const CommunityIntroduction: FC = () => {
  return (
    <Container textAlign="center" w="full" margin="auto">
      <Heading as="h1" fontSize={{ base: "5xl", md: "xl" }}>
        Tech.museumコミュニティに参加しよう
      </Heading>
      <Text>
        あなたの知識と経験を共有し、他の開発者から学び、一緒に成長しましょう
      </Text>
      <Button
        m="auto"
        as="a"
        target="_blank"
        href="https://github.com/illionillion/tech-museum/"
      >
        Githubリポジトリ
      </Button>
    </Container>
  )
}
