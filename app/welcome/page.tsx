import {
  Button,
  Heading,
  Text,
  Container,
} from "@yamada-ui/react"
import { Layout } from "@/components/layouts"
import { CommunityIntroduction } from "@/components/tutorial/community-introduction"
import { FeatureCard } from "@/components/tutorial/feature-card"
import { HowToJoin } from "@/components/tutorial/how-to-join"
import { QuestionAccordion } from "@/components/tutorial/question-accordion"

export default function Home() {
  return (
    <Layout>
      <Container
        textAlign="center"
        w="full"
        m="auto"
        bgGradient={[
          "linear(-60deg, primary.500, secondary.500)",
          "linear(-60deg, primary.600, secondary.600)",
        ]}
      >
        <Heading color="white" as="h1" fontSize={{ base: "6xl", md: "xl" }}>
          Tech.museumへようこそ
        </Heading>
        <Text color="white">
          オープンソースの力で、より良い技術ブログを一緒に作り上げましょう
        </Text>
        <Button
          m="auto"
          as="a"
          target="_blank"
          href="https://github.com/illionillion/tech-museum/blob/main/CONTRIBUTING.ja.md"
        >
          今すぐ始める
        </Button>
      </Container>

      <FeatureCard />
      <HowToJoin />
      <QuestionAccordion />
      <CommunityIntroduction />
    </Layout>
  )
}
