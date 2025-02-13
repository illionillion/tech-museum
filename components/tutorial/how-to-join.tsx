import { Heading, Text, Container, Card } from "@yamada-ui/react"
import type { FC } from "react"

//参加方法
export const HowToJoin: FC = () => {
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
