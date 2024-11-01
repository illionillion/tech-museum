"use client"
import { LogInIcon, LogOutIcon } from "@yamada-ui/lucide"
import {
  IconButton,
  Img,
  Link,
  Loading,
  Menu,
  MenuItem,
  MenuList,
} from "@yamada-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export const UserMenu = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session && session.user ? (
        <Menu>
          <MenuList>
            <MenuItem>
              <Link href="/profile">
                <IconButton
                  variant="ghost"
                  fontSize="2xl"
                  icon={
                    <Img src={session.user.image ?? "/default-image.png"} />
                  }
                />
              </Link>
            </MenuItem>
            <MenuItem>
              <AuthButton />
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <div>
          <IconButton
            variant="ghost"
            fontSize="2xl"
            // TODO: 変える
            icon={<LogInIcon />}
            onClick={() => {
              signIn()
            }}
          />
        </div>
      )}
    </div>
  )
}

export const AuthButton = () => {
  const { data: session, status } = useSession()
  return (
    <div>
      {status === "loading" ? (
        <Loading />
      ) : (
        session && (
          <IconButton
            variant="ghost"
            fontSize="2xl"
            icon={<LogOutIcon />}
            onClick={() => signOut()}
          />
        )
      )}
    </div>
  )
}
