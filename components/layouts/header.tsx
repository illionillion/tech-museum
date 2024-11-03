"use client"

import { GitForkIcon, Moon, Palette, Sun } from "@yamada-ui/lucide"
import type {
  ColorMode,
  IconButtonProps,
  MenuProps,
  PopoverProps,
  CenterProps,
} from "@yamada-ui/react"
import {
  HStack,
  Spacer,
  useColorMode,
  MenuButton,
  IconButton,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuOptionItem,
  Popover,
  PopoverTrigger,
  useDisclosure,
  useTheme,
  PopoverContent,
  PopoverBody,
  Box,
  Center,
  useScroll,
  useMotionValueEvent,
  Heading,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FC } from "react"
import { useRef, useState, memo } from "react"
import { Search, SearchButton } from "../forms/search"
import { UserMenu } from "../navigation/user-menu"

export type HeaderProps = CenterProps

export const Header: FC<HeaderProps> = ({ ...rest }) => {
  const ref = useRef<HTMLHeadingElement>()
  const { scrollY } = useScroll()
  const [y, setY] = useState<number>(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  useMotionValueEvent(scrollY, "change", setY)

  const isScroll = y > height

  return (
    <Center
      ref={ref}
      as="header"
      w="full"
      bg={isScroll ? ["whiteAlpha.500", "blackAlpha.200"] : undefined}
      backdropFilter="auto"
      backdropSaturate="180%"
      backdropBlur="10px"
      shadow={isScroll ? ["base", "dark-sm"] : undefined}
      transitionProperty="common"
      transitionDuration="slower"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="guldo"
      {...rest}
    >
      <HStack
        w="full"
        maxW="9xl"
        py="3"
        px={{ base: "lg", md: "md" }}
        gap={{ base: "md", md: "sm" }}
      >
        <HStack
          as={Link}
          gap="sm"
          href="/"
          aria-label="Tech.museum"
          _hover={{ opacity: 0.7 }}
          transitionProperty="opacity"
          transitionDuration="slower"
          _focus={{ outline: "none" }}
          _focusVisible={{ boxShadow: "outline" }}
          rounded="md"
        >
          <GitForkIcon color="primary" fontSize="4xl" />
          <Heading as="h1" size="md">
            Tech.ms
          </Heading>
        </HStack>
        <Spacer />
        <Search
          display={{ base: "flex", md: "none" }}
          borderColor={isScroll ? "transparent" : "border"}
          bg={
            isScroll ? ["whiteAlpha.600", "blackAlpha.500"] : ["white", "black"]
          }
          backdropFilter="auto"
          backdropSaturate="180%"
          backdropBlur="10px"
        />
        <HStack>
          <SearchButton display={{ base: "none", md: "inline-flex" }} />
          <ThemeSchemeButton />
          <ColorModeButton />
          <UserMenu />
        </HStack>
      </HStack>
    </Center>
  )
}

type ColorModeButtonProps = IconButtonProps & {
  menuProps?: MenuProps
}

const ColorModeButton: FC<ColorModeButtonProps> = memo(
  ({ menuProps, ...rest }) => {
    const { colorMode, internalColorMode, changeColorMode } = useColorMode()

    return (
      <Menu
        restoreFocus={false}
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 32,
                bottom: 32,
                left: 32,
                right: 32,
              },
            },
          },
        ]}
        {...menuProps}
      >
        <MenuButton
          as={IconButton}
          aria-label="Open color mode switching menu"
          variant="ghost"
          colorScheme="gray"
          color="muted"
          icon={
            colorMode === "dark" ? (
              <Sun fontSize="2xl" />
            ) : (
              <Moon fontSize="2xl" />
            )
          }
          {...rest}
        />

        <MenuList>
          <MenuOptionGroup<ColorMode | "system">
            value={internalColorMode}
            onChange={changeColorMode}
            type="radio"
          >
            <MenuOptionItem value="light" closeOnSelect>
              Light
            </MenuOptionItem>
            <MenuOptionItem value="dark" closeOnSelect>
              Dark
            </MenuOptionItem>
            <MenuOptionItem value="system" closeOnSelect>
              System
            </MenuOptionItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    )
  },
)

ColorModeButton.displayName = "ColorModeButton"

type ThemeSchemeButtonProps = IconButtonProps & {
  popoverProps?: PopoverProps
}

const ThemeSchemeButton: FC<ThemeSchemeButtonProps> = memo(
  ({ popoverProps, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { theme, changeThemeScheme } = useTheme()
    const { colorSchemes = [] } = theme

    return (
      <Popover
        {...popoverProps}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnButton={false}
        restoreFocus={false}
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              padding: {
                top: 32,
                bottom: 32,
                left: 32,
                right: 32,
              },
            },
          },
        ]}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Open color mode switching menu"
            variant="ghost"
            colorScheme="gray"
            color="muted"
            icon={<Palette fontSize="2xl" />}
            {...rest}
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverBody
            display="grid"
            gridTemplateColumns={{ base: "repeat(4, 1fr)" }}
          >
            {colorSchemes.map((colorScheme: string) => (
              <Box
                as="button"
                type="button"
                key={colorScheme}
                bg={`${colorScheme}.500`}
                minW={{ base: "12", md: "10" }}
                minH={{ base: "12", md: "10" }}
                rounded="md"
                boxShadow="inner"
                outline="0"
                _hover={{ bg: `${colorScheme}.600` }}
                _active={{ bg: `${colorScheme}.700` }}
                _focusVisible={{ shadow: "outline" }}
                transitionProperty="common"
                transitionDuration="slower"
                onClick={() => {
                  changeThemeScheme(colorScheme)
                  onClose()
                }}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
)

ThemeSchemeButton.displayName = "ThemeSchemeButton"
