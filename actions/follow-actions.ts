// /app/actions/followActions.ts
"use server"

import {
  addFollow,
  removeFollow,
  isFollowing,
  getFollowingList,
} from "@/prisma/repositories/follow-repository"

// フォローするアクション
export const followUser = async (fromUsername: string, toUsername: string) => {
  const alreadyFollowing = await isFollowing(fromUsername, toUsername)

  if (!alreadyFollowing) {
    await addFollow(fromUsername, toUsername)
    return { status: "followed" }
  } else {
    return { status: "already_following" }
  }
}

// フォロー解除アクション
export const unfollowUser = async (
  fromUsername: string,
  toUsername: string,
) => {
  const alreadyFollowing = await isFollowing(fromUsername, toUsername)

  if (alreadyFollowing) {
    await removeFollow(fromUsername, toUsername)
    return { status: "unfollowed" }
  } else {
    return { status: "not_following" }
  }
}

// ユーザーのフォロー一覧を取得するアクション
export const fetchFollowingList = async (username: string) => {
  return await getFollowingList(username)
}

// フォローしているかを確認
export const checkIfFollowing = async (
  fromUsername: string,
  toUsername: string,
) => {
  return await isFollowing(fromUsername, toUsername)
}
