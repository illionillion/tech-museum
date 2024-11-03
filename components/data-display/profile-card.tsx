"use client"
import { GithubIcon, GitPullRequestIcon, UsersIcon } from "@yamada-ui/lucide"
import {
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useI18n } from "@/contexts"
import type { getContributors } from "@/utils/next"

interface ProfileCardProps {
  username: string
  userData:
    | Awaited<ReturnType<typeof getContributors>>["contributors"][number]
    | undefined
  followings: string[]
  followers: string[]
}

export const ProfileCard: FC<ProfileCardProps> = ({
  username,
  userData,
  followers,
  followings,
}) => {
  const { contributors } = useI18n()
  const contributeCount =
    contributors?.contributors?.find(
      (contributor) => contributor.login === username,
    )?.commitCount || 0
  return (
    <VStack flexGrow={1} alignItems={{ base: "stretch", lg: "center" }}>
      <Text fontSize="md">{username}</Text>
      <Text fontSize="sm" color={["gray.500", "gray.100"]}>
        {userData?.bio}
      </Text>
      <HStack flexDir={{ base: "row", md: "column" }}>
        <Center w={{ md: "full" }} gap="sm">
          <UsersIcon color={["gray.500", "gray.100"]} />
          <Flex>
            <Text>{followers.length}</Text>
            <Text color={["gray.500", "gray.100"]}>フォロワー</Text>
          </Flex>
        </Center>
        <Center w={{ md: "full" }} gap="sm">
          <UsersIcon color={["gray.500", "gray.100"]} />
          <Flex>
            <Text>{followings.length}</Text>
            <Text color={["gray.500", "gray.100"]}>フォロー</Text>
          </Flex>
        </Center>
        <Center w={{ md: "full" }} gap="sm">
          <GitPullRequestIcon color={["gray.500", "gray.100"]} />
          <Flex>
            <Text>{contributeCount}</Text>
            <Text color={["gray.500", "gray.100"]}>コントリビューション</Text>
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
  )
}
