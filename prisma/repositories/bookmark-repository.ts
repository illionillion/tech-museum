import { db } from "@/utils/db"

export const createBookmark = async (username: string, articleURL: string) => {
  return await db.bookmark.create({
    data: { username, articleURL },
  })
}

export const removeBookmark = async (username: string, articleURL: string) => {
  return await db.bookmark.updateMany({
    where: {
      username,
      articleURL,
      removedAt: null, // 現在「ブックマーク」状態のものだけ
    },
    data: {
      removedAt: new Date(),
    },
  })
}

export const isBookmarked = async (username: string, articleURL: string) => {
  const like = await db.bookmark.findFirst({
    where: {
      username,
      articleURL,
      removedAt: null,
    },
  })
  return Boolean(like)
}

export const getBookmarkCount = async (articleURL: string) => {
  return await db.bookmark.count({
    where: { articleURL, removedAt: null },
  })
}

export const getBookmarksByUsername = async (username: string) => {
  return await db.bookmark.findMany({
    where: {
      username: username,
      removedAt: null,
    },
  })
}
