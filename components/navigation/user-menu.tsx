"use client"
import { LogInIcon, LogOutIcon } from "@yamada-ui/lucide"
import {
  Avatar,
  IconButton,
  Img,
  Link,
  Loading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@yamada-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export const UserMenu = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
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
            icon={<Img src={session.user.image ?? "/default-image.png"} />}
          />
          <MenuList>
            <MenuItem>
              <Link href={`${session.user.id!.toString()}`}>
                <IconButton
                  variant="ghost"
                  fontSize="2xl"
                  icon={
                    <Avatar src={session.user.image ?? "/default-image.png"} />
                  }
                />
              </Link>
            </MenuItem>
            <MenuItem>
              <IconButton
                variant="ghost"
                fontSize="2xl"
                icon={<LogOutIcon />}
                onClick={() => signOut()}
              />
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
