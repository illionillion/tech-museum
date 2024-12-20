// /app/actions/likeActions.ts
"use server"

import {
  addLike,
  isLiked,
  removeLike,
  getLikeCount,
  getArticlesByUsername,
} from "@/prisma/repositories/like-repository"
import { auth } from "@/utils/auth"

export const toggleLike = async (articleURL: string) => {
  const session = await auth()
  const username = session?.user?.name
  if (!username) {
    return { status: "not_logged_in" }
  }
  const liked = await isLiked(username, articleURL)

  if (liked) {
    await removeLike(username, articleURL)
    return { status: "removed" }
  } else {
    await addLike(username, articleURL)
    return { status: "added" }
  }
}

// いいね数を取得する関数
export const fetchLikeCount = async (articleURL: string) => {
  return await getLikeCount(articleURL)
}

// 現在のいいね状態を取得する関数
export const checkIfLiked = async (username: string, articleURL: string) => {
  return await isLiked(username, articleURL)
}

export const fetchArticlesByUsername = async (username: string) => {
  return await getArticlesByUsername(username)
}
