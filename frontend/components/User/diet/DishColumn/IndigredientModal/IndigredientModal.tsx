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
import React, { useState } from "react"
import { ReplecableIndegredient } from "../../../../../pages/user/diet"
import IndigredientChoice from "./IndigredientChoice"

interface IndigredientModalProps {
  isOpen: boolean
  onClose: () => void
  data: ReplecableIndegredient[]
  initialRef: any
}

interface Replacements {
  main: string
  options: string[]
}

const IndigredientModal = ({
  isOpen,
  onClose,
  data,
  initialRef,
}: IndigredientModalProps) => {


  const [dataLength ,setLength] = useState(Object.keys(data).length)
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
            {data.map((item, index) => {
              return <IndigredientChoice name={item.name} replacable={item.replacements} key={index} />
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button tabIndex={dataLength + 1} variant="ghost">
            Domyślny posiłek
          </Button>
          <Button
            tabIndex={dataLength + 2}
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
