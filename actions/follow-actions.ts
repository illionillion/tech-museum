// /app/actions/followActions.ts
"use server"

import {
  addFollow,
  removeFollow,
  isFollowing,
  getFollowingList,
} from "@/prisma/repositories/follow-repository"

// フォローするアクション
export const followUser = async (fromUserId: string, toUserId: string) => {
  const alreadyFollowing = await isFollowing(fromUserId, toUserId)

  if (!alreadyFollowing) {
    await addFollow(fromUserId, toUserId)
    return { status: "followed" }
  } else {
    return { status: "already_following" }
  }
}

// フォロー解除アクション
export const unfollowUser = async (fromUserId: string, toUserId: string) => {
  const alreadyFollowing = await isFollowing(fromUserId, toUserId)

  if (alreadyFollowing) {
    await removeFollow(fromUserId, toUserId)
    return { status: "unfollowed" }
  } else {
    return { status: "not_following" }
  }
}

// ユーザーのフォロー一覧を取得するアクション
export const fetchFollowingList = async (userId: string) => {
  return await getFollowingList(userId)
}
