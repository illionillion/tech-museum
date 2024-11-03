// /app/actions/likeActions.ts
"use server"

import {
  createBookmark,
  isBookmarked,
  removeBookmark,
  getBookmarkCount,
  getBookmarksByUsername,
} from "@/prisma/repositories/bookmark-repository"

export const toggleBookmark = async (username: string, articleURL: string) => {
  const liked = await isBookmarked(username, articleURL)

  if (liked) {
    await removeBookmark(username, articleURL)
    return { status: "removed" }
  } else {
    await createBookmark(username, articleURL)
    return { status: "added" }
  }
}

// ブクマ数を取得する関数
export const fetchBookmarkCount = async (articleURL: string) => {
  return await getBookmarkCount(articleURL)
}

// 現在のいいね状態を取得する関数
export const checkIfBookmarked = async (username: string, articleURL: string) => {
  return await isBookmarked(username, articleURL)
}

export const fetchBookmarksByUsername = async (username: string) => {
  return await getBookmarksByUsername(username)
}
