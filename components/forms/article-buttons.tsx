"use client"
import {
  ThumbsUpIcon,
  InfoIcon,
  CodeIcon,
  XIcon,
  BookMarkedIcon,
} from "@yamada-ui/lucide"
import {
  IconButton,
  Indicator,
  useSafeLayoutEffect,
  VStack,
} from "@yamada-ui/react"
import type { ArticleMetadata } from "article"
import Link from "next/link"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import type { FC } from "react"
import { useLoginModal } from "../overlay/use-login-modal"
import {
  checkIfBookmarked,
  fetchBookmarkCount,
  toggleBookmark
} from "@/actions/bookmark-actions"
import {
  checkIfLiked,
  fetchLikeCount,
  toggleLike,
} from "@/actions/like-actions"

interface ArticleButtonsProps {
  metadata: ArticleMetadata | undefined
  likeCount: number
  bookmarkCount: number
}

export const ArticleButtons: FC<ArticleButtonsProps> = ({
  metadata,
  likeCount: like,
  bookmarkCount: bookmark,
}) => {
  const { data: session, status } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(like)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(bookmark)
  const { LoginModal, onOpen } = useLoginModal()

  const fetchLikeData = async () => {
    if (!metadata?.slug) return

    // いいね数を取得
    const count = await fetchLikeCount(metadata.slug)
    setLikeCount(count)

    // 現在のいいね状態を確認
    if (session?.user?.name) {
      const liked = await checkIfLiked(session.user.name, metadata.slug)
      setIsLiked(liked)
    }
  }
  const fetchBookmarkData = async () => {
    if (!metadata?.slug) return

    // ブクマ数を取得
    const count = await fetchBookmarkCount(metadata.slug)
    setBookmarkCount(count)

    // 現在のブクマ状態を確認
    if (session?.user?.name) {
      const bookmarked = await checkIfBookmarked(session.user.name, metadata.slug)
      setIsBookmarked(bookmarked)
    }
  }
  useSafeLayoutEffect(() => {
    fetchLikeData()
    fetchBookmarkData()
  }, [metadata?.slug, session])

  const handleLike = async () => {
    if (status === "loading") return
    if (session?.user?.name && metadata?.slug) {
      const result = await toggleLike(session.user.name, metadata.slug)
      setIsLiked(result.status === "added")
      setLikeCount((prev) => (result.status === "added" ? prev + 1 : prev - 1))
      fetchLikeData()
    } else if (!session?.user?.name) {
      // 未ログイン状態の時にログインしてのモーダルを起動
      onOpen()
    }
  }
  const handleBookmark = async () => {
    if (status === "loading") return
    if (session?.user?.name && metadata?.slug) {
      const result = await toggleBookmark(session.user.name, metadata.slug)
      setIsBookmarked(result.status === "added")
      setBookmarkCount((prev) => (result.status === "added" ? prev + 1 : prev - 1))
      fetchBookmarkData()
    } else if (!session?.user?.name) {
      // 未ログイン状態の時にログインしてのモーダルを起動
      onOpen()
    }
  }

  return (
    <>
      <LoginModal />
      <VStack
        maxW="2xs"
        w="full"
        alignItems="center"
        position="sticky"
        top="4rem"
        py="lg"
        display={{ base: "flex", md: "none" }}
      >
        <Indicator label={likeCount}>
          <IconButton
            variant="ghost"
            colorScheme="primary"
            fontSize="3xl"
            boxSize="10"
            onClick={handleLike}
            icon={<ThumbsUpIcon color={isLiked ? "primary" : "gray"} />}
          />
        </Indicator>
        <Indicator label={bookmarkCount}>
          <IconButton
            variant="ghost"
            colorScheme="primary"
            fontSize="3xl"
            boxSize="10"
            onClick={handleBookmark}
            icon={<BookMarkedIcon color={isBookmarked ? "primary" : "gray"} />}
          />
        </Indicator>
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
    </>
  )
}
