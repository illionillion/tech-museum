"use client"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  useDisclosure,
} from "@yamada-ui/react"
import { signIn } from "next-auth/react"
import type { FC } from "react"

export const useLoginModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleSignIn = async () => {
    await signIn()
    onClose()
  }

  const LoginModal: FC = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>ログインが必要です</ModalHeader>
        <ModalBody>
          <Text>この機能を利用するにはログインが必要です。</Text>
          <Text>GitHubアカウントを使用してログインしてください。</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>閉じる</Button>
          <Button variant="outline" onClick={handleSignIn}>
            GitHubでログイン
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  return { LoginModal, isOpen, onOpen, onClose }
}
