"use client"
import {
  ThumbsUpIcon,
  InfoIcon,
  CodeIcon,
  XIcon,
  BookMarkedIcon,
} from "@yamada-ui/lucide"
import { IconButton, VStack } from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import Link from "next/link"
import { useSession } from "next-auth/react"
import React from "react"
import type { FC } from "react"

interface ArticleButtonsProps {
  metadata: ArticleMetadata | undefined
}

export const ArticleButtons: FC<ArticleButtonsProps> = ({ metadata }) => {
  const { data: session, status } = useSession()
  const handleLike = async () => {
    if (status === "loading" && !session) return
    console.log(session?.user?.id)
    console.log(metadata?.slug)

    const res = await fetch(`/api/likes/`, {
      method: "POST",
      body: JSON.stringify({
        userId: session?.user?.id ? session?.user?.id : 0,
        articleUrl: metadata?.slug,
      }),
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <VStack
      maxW="2xs"
      w="full"
      alignItems="center"
      position="sticky"
      top="4rem"
      py="lg"
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        onClick={handleLike}
        icon={<ThumbsUpIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        href="#"
        icon={<BookMarkedIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        target="_blank"
        href="https://github.com/illionillion/tech-museum/issues/new?template=feature_request_article.yml"
        icon={<InfoIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        target="_blank"
        href={`https://github.com/illionillion/tech-museum/tree/main/contents/${metadata?.slug}.md`}
        icon={<CodeIcon />}
      />
      <IconButton
        variant="ghost"
        colorScheme="primary"
        fontSize="3xl"
        boxSize="10"
        as={Link}
        href="#"
        icon={<XIcon />}
      />
    </VStack>
  )
}
