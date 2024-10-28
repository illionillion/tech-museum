import {
  GitPullRequestArrow,
  BookOpen,
  UsersRound,
  Puzzle,
} from "@yamada-ui/lucide"

import {
  Button,
  Heading,
  Text,
  Container,
  Card,
  SimpleGrid,
  GridItem,
  Accordion,
  AccordionItem,
  VStack,
  Icon,
  CardBody,
  HStack,
} from "@yamada-ui/react"
import { Layout } from "@/components/layouts"

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

const FeatureCard = () => {
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
//参加方法
const HowToJoin = () => {
  const steps = [
    {
      description:
        "まだアカウントをお持ちでない場合は、Githubアカウントを作成してください。",
    },
    {
      description: "Tech.museumのリポジトリをフォークする",
    },
    {
      description: "ローカル環境にクローンし、新しい記事を作成する",
    },
    {
      description: "変更をコミットし、プルリクエストを作成する",
    },
    {
      description: "コミュニティからのフィードバックを受け記事を改善する",
    },
    {
      description: "マージされたら、記事が公開される",
    },
  ]
  return (
    <Container>
      <Heading as="h3" fontSize={{ base: "5xl", md: "lg" }} m="auto">
        参加方法
      </Heading>
      <Card p="md">
        {steps.map((step, index) => (
          <Text key={step.description} py="md">
            {index + 1}.{step.description}
          </Text>
        ))}
      </Card>
    </Container>
  )
}
//よくある質問
const QuestionAccordion = () => {
  const questions = [
    {
      question: "Tech.museumで記事を書くにはどうすればいいですか？",
      answer:
        "まだアカウントをお持ちでない場合は、Githubアカウントを作成してください。",
    },
    {
      question: "Tech.museumで扱うトピックに制限はありますか",
      answer:
        "ありません。作成したいトピックが存在しない場合は、あなた自身でトピックを作成してください。",
    },
  ]
  return (
    <Container>
      <VStack>
        <Accordion variant="basic">
          {questions.map((question) => (
            <AccordionItem label={question.question} key={question.answer}>
              <Text p="ms">{question.answer}</Text>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Container>
  )
}
const CommunityIntroduction = () => {
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
