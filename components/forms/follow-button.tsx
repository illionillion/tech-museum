"use client"

import { Button, Center, useSafeLayoutEffect } from "@yamada-ui/react"
import { useSession } from "next-auth/react"
import type { FC } from "react"
import { useState } from "react"
import { useLoginModal } from "../overlay/use-login-modal"
import {
  checkIfFollowing,
  followUser,
  unfollowUser,
} from "@/actions/follow-actions"

interface FollowButtonProps {
  username: string
}

export const FollowButton: FC<FollowButtonProps> = ({ username }) => {
  const { data, status } = useSession()
  const { LoginModal, onOpen } = useLoginModal()

  const isMyself = data?.user?.name === username
  const loading = status === "loading"
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchFollowStatus = async () => {
    if (data?.user?.name && !isMyself) {
      setIsLoading(true)
      const following = await checkIfFollowing(data.user.name, username)
      setIsFollowing(following)
      setIsLoading(false)
    }
  }

  // フォロー状態を確認
  useSafeLayoutEffect(() => {
    fetchFollowStatus()
  }, [data, isMyself, username])

  const handleClick = async () => {
    if (loading || isMyself) return
    if (!data?.user?.name || status !== "authenticated") {
      onOpen() // 未ログイン時にログインモーダルを表示
      return
    }

    setIsLoading(true)
    try {
      if (isFollowing) {
        await unfollowUser(username)
        setIsFollowing(false)
      } else {
        await followUser(username)
        setIsFollowing(true)
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error)
    }
    setIsLoading(false)
  }

  return (
    <Center>
      {!loading && !isMyself && (
        <Button onClick={handleClick} isLoading={isLoading}>
          {isFollowing ? "フォロー解除" : "フォローする"}
        </Button>
      )}
      <LoginModal />
    </Center>
  )
}
