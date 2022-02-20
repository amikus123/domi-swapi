import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
} from "@chakra-ui/react"
import React from "react"
import IndigredientChoice from "./IndigredientChoice"

interface IndigredientModalProps {
  isOpen: boolean
  onClose: () => void
  replacements: any[]
  initialRef: any
}

const IndigredientModal = ({
  isOpen,
  onClose,
  replacements,
  initialRef,
}: IndigredientModalProps) => {
  replacements = [1, 2, 3, 4, 5, 6]
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Zamień składniki</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {replacements.map((item, index) => {
              return <IndigredientChoice key={index} />
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button tabIndex={replacements.length + 1} variant="ghost">
            Domyślny posiłek
          </Button>
          <Button
            tabIndex={replacements.length + 2}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          >
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default IndigredientModal
