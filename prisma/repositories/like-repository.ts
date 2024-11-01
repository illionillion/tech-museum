import { db } from "@/utils/db"

export const addLike = async (username: string, articleURL: string) => {
  return await db.like.create({
    data: { username, articleURL },
  })
}

export const removeLike = async (username: string, articleURL: string) => {
  return await db.like.updateMany({
    where: {
      username,
      articleURL,
      removedAt: null, // 現在「いいね」状態のものだけ
    },
    data: {
      removedAt: new Date(),
    },
  })
}

export const isLiked = async (username: string, articleURL: string) => {
  const like = await db.like.findFirst({
    where: {
      username,
      articleURL,
      removedAt: null,
    },
  })
  return Boolean(like)
}

export const getLikeCount = async (articleURL: string) => {
  return await db.like.count({
    where: { articleURL, removedAt: null },
  })
}

export const getArticlesByUsername = async (username: string) => {
  return await db.like.findMany({
    where: {
      username: username,
      removedAt: null,
    },
  })
}
