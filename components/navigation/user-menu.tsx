"use client"
import { LogInIcon, LogOutIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  HStack,
  IconButton,
  Loading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@yamada-ui/react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export const UserMenu = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading fontSize="2xl" />
  }

  return (
    <>
      {session && session.user ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Open user menu"
            variant="ghost"
            fontSize="2xl"
            icon={<Avatar src={session.user.image || ""} />}
          />
          <MenuList>
            <MenuItem>
              <HStack as={Link} href={`${session.user.name!.toString()}`}>
                <IconButton
                  variant="ghost"
                  fontSize="2xl"
                  icon={<Avatar src={session.user.image || ""} />}
                />
                <Text>{session.user.name}</Text>
              </HStack>
            </MenuItem>
            <MenuItem>
              <IconButton
                variant="ghost"
                fontSize="2xl"
                icon={<LogOutIcon />}
                onClick={() => signOut()}
              />
              <Text>ログアウト</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <IconButton
          variant="ghost"
          fontSize="2xl"
          icon={<LogInIcon />}
          onClick={() => signIn()}
        />
      )}
    </>
  )
}
