import { GithubIcon, GitPullRequestIcon, UsersIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@yamada-ui/react"
import { getArticleList } from "../../../utils/articles"
import { ProfileTabs } from "@/components/disclosure/profile-tabs"
import { FollowButton } from "@/components/forms/follow-button"
import { Layout } from "@/components/layouts"
import { getContributors } from "@/utils/next"

interface Props {
  params: { username?: string }
  searchParams: { tab_key?: string }
}

export const dynamicParams = false

// メタデータの生成
export const generateMetadata = async ({ params }: Props) => {
  const { username } = params

  // ユーザー名が存在しない場合のデフォルトメタデータ
  if (!username) {
    return {
      title: "User not found",
      description: "No user data available for this page",
    }
  }

  // 動的にタイトルや説明文を生成
  return {
    title: `${username}'s Profile`,
    description: `Explore the articles and contributions made by ${username}.`,
  }
}

// Static Params の生成
export const generateStaticParams = async () => {
  const contributors = getContributors().contributors

  return contributors.map((contributor) => ({ username: contributor.login }))
}

const Page = async ({ params, searchParams }: Props) => {
  const { username } = params
  const { tab_key } = searchParams

  const userData = getContributors().contributors.find(
    (user) => user.login === username,
  )
  const articles = await getArticleList()
  const userArticles = articles.filter((article) =>
    article.contributors?.some((contributor) => contributor.login === username),
  )

  return (
    <Layout>
      <Container maxW="9xl" w="full" p={0}>
        <Card>
          <CardBody>
            <HStack w="full" flexDir={{ base: "row", lg: "column" }}>
              <Box>
                <Avatar boxSize="3xs" src={userData?.avatar_url} />
              </Box>
              <VStack
                flexGrow={1}
                alignItems={{ base: "stretch", lg: "center" }}
              >
                <Text fontSize="md">{username}</Text>
                <Text fontSize="sm" color={["gray.500", "gray.100"]}>
                  {userData?.bio}
                </Text>
                <HStack flexDir={{ base: "row", md: "column" }}>
                  <Center w={{ md: "full" }} gap="sm">
                    <UsersIcon color={["gray.500", "gray.100"]} />
                    <Flex>
                      <Text>1234</Text>
                      <Text color={["gray.500", "gray.100"]}>フォロワー</Text>
                    </Flex>
                  </Center>
                  <Center w={{ md: "full" }} gap="sm">
                    <UsersIcon color={["gray.500", "gray.100"]} />
                    <Flex>
                      <Text>1234</Text>
                      <Text color={["gray.500", "gray.100"]}>フォロー</Text>
                    </Flex>
                  </Center>
                  <Center w={{ md: "full" }} gap="sm">
                    <GitPullRequestIcon color={["gray.500", "gray.100"]} />
                    <Flex>
                      <Text>1234</Text>
                      <Text color={["gray.500", "gray.100"]}>フォロワー</Text>
                    </Flex>
                  </Center>
                  <Center>
                    <IconButton
                      variant="ghost"
                      fontSize="4xl"
                      icon={<GithubIcon />}
                      as="a"
                      target="_blank"
                      href={userData?.html_url}
                    />
                  </Center>
                </HStack>
              </VStack>
              <FollowButton username={username || ""} />
            </HStack>
          </CardBody>
        </Card>
        <ProfileTabs
          articles={userArticles}
          tabKey={tab_key}
          username={username}
        />
      </Container>
    </Layout>
  )
}

export default Page
