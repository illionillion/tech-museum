// /prisma/repositories/follow-repository.ts

import { db } from "@/utils/db"

// フォローする
export const addFollow = async (fromUsername: string, toUsername: string) => {
  return await db.follow.create({
    data: {
      fromUsername,
      toUsername,
    },
  })
}

// フォロー解除する
export const removeFollow = async (
  fromUsername: string,
  toUsername: string,
) => {
  return await db.follow.updateMany({
    where: {
      fromUsername,
      toUsername,
      removedAt: null, // 有効なフォローのみ対象
    },
    data: {
      removedAt: new Date(),
    },
  })
}

// フォローしているかを確認
export const isFollowing = async (fromUsername: string, toUsername: string) => {
  const follow = await db.follow.findFirst({
    where: {
      fromUsername,
      toUsername,
      removedAt: null, // 有効なフォローのみ対象
    },
  })
  return !!follow
}

// 特定ユーザーのフォロー一覧を取得
export const getFollowingList = async (username: string) => {
  return await db.follow.findMany({
    where: {
      fromUsername: username,
      removedAt: null, // 有効なフォローのみ対象
    },
    select: {
      toUsername: true,
    },
  })
}

// フォロワー一覧取得
export const getFollowerList = async (toUsername: string) => {
  return await db.follow.findMany({
    where: {
      toUsername: toUsername,
      removedAt: null, // 有効なフォロワーのみ取得
    },
    select: {
      fromUsername: true, // フォロワーのユーザー名を取得
    },
  })
}
