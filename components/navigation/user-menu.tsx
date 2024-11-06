"use client"
import { LogInIcon, LogOutIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  Center,
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
            icon={<Avatar src={session.user.image || ""} boxSize="full" />}
          />
          <MenuList>
            <MenuItem>
              <HStack
                w="full"
                as={Link}
                href={`/contributors/${session.user.name!.toString()}`}
              >
                <Avatar src={session.user.image || ""} boxSize="10" />
                <Text>{session.user.name}</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <HStack w="full">
                <Center boxSize="10">
                  <LogOutIcon fontSize="2xl" />
                </Center>
                <Text>ログアウト</Text>
              </HStack>
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
