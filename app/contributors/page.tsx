import { Heading, Text, Box } from "@yamada-ui/react"
import React from "react"
import { TopContributor } from "../../components/data-display/top-contributor"
import { ContributorList } from "@/components/data-display/contributors-list"
import { Layout } from "@/components/layouts"
const Page = () => {
  return (
    <Layout>
      <Box p={4} w="90%" m="0 auto">
        <Heading as="h1" p="pd">
          Contributors
        </Heading>
        <Text p="md">
          Tech.museumに時間・労力・思考を提供してくれた素晴らしいエンジニア。彼らの貢献に深く感謝します。
        </Text>
        <TopContributor />
        <ContributorList />
      </Box>
    </Layout>
  )
}

export default Page
