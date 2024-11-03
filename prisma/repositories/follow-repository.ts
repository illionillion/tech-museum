// /prisma/repositories/follow-repository.ts

import { db } from "@/utils/db"

// フォローする
export const addFollow = async (fromUserId: string, toUserId: string) => {
  return await db.follow.create({
    data: {
      fromUserId,
      toUserId,
    },
  })
}

// フォロー解除する
export const removeFollow = async (fromUserId: string, toUserId: string) => {
  return await db.follow.updateMany({
    where: {
      fromUserId,
      toUserId,
      removedAt: null, // 有効なフォローのみ対象
    },
    data: {
      removedAt: new Date(),
    },
  })
}

// フォローしているかを確認
export const isFollowing = async (fromUserId: string, toUserId: string) => {
  const follow = await db.follow.findFirst({
    where: {
      fromUserId,
      toUserId,
      removedAt: null, // 有効なフォローのみ対象
    },
  })
  return !!follow
}

// 特定ユーザーのフォロー一覧を取得
export const getFollowingList = async (userId: string) => {
  return await db.follow.findMany({
    where: {
      fromUserId: userId,
      removedAt: null, // 有効なフォローのみ対象
    },
    select: {
      toUserId: true,
    },
  })
}
