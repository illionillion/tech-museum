import {
  Text,
  Container,
  Accordion,
  AccordionItem,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"

//よくある質問
export const QuestionAccordion: FC = () => {
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