// /app/actions/followActions.ts
"use server"

import {
  addFollow,
  removeFollow,
  isFollowing,
  getFollowingList,
  getFollowerList,
} from "@/prisma/repositories/follow-repository"
import { auth } from "@/utils/auth"

// フォローするアクション
export const followUser = async (toUsername: string) => {
  const session = await auth()
  const fromUsername = session?.user?.name
  if (!fromUsername) {
    return { status: "not_logged_in" }
  }
  const alreadyFollowing = await isFollowing(fromUsername, toUsername)

  if (!alreadyFollowing) {
    await addFollow(fromUsername, toUsername)
    return { status: "followed" }
  } else {
    return { status: "already_following" }
  }
}

// フォロー解除アクション
export const unfollowUser = async (toUsername: string) => {
  const session = await auth()
  const fromUsername = session?.user?.name
  if (!fromUsername) {
    return { status: "not_logged_in" }
  }
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
  const follows = await getFollowingList(username)
  return follows.map((follow) => follow.toUsername)
}

// フォロワー一覧を取得するアクション
export const fetchFollowerList = async (toUsername: string) => {
  const followers = await getFollowerList(toUsername)
  return followers.map((follower) => follower.fromUsername) // フォロワーのユーザー名のリストを返す
}

// フォローしているかを確認
export const checkIfFollowing = async (
  fromUsername: string,
  toUsername: string,
) => {
  return await isFollowing(fromUsername, toUsername)
}
