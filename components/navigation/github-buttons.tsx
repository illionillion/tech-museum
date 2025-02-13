import { GitPullRequestIcon, InfoIcon } from "@yamada-ui/lucide"
import { Heading, Button, VStack, Card, CardBody } from "@yamada-ui/react"
import type { FC } from "react"

export const GithubButtons: FC = () => {
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
