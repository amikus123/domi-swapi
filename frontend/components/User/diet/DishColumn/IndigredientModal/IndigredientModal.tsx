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
import {
  ObjectFrontendIndexes,
  ReplecableIndegredient,
} from "../../../../../pages/user/diet"
import IndigredientChoice from "./IndigredientChoice"

interface IndigredientModalProps {
  isOpen: boolean
  onClose: () => void
  data: ReplecableIndegredient[]
  initialRef: any
  indexes: ObjectFrontendIndexes
  replaceIngredient: (IDs: ObjectFrontendIndexes) => void
}

const IndigredientModal = ({
  isOpen,
  onClose,
  data,
  initialRef,
  indexes,
  replaceIngredient,
}: IndigredientModalProps) => {
  const [dataLength, setLength] = useState(Object.keys(data).length)
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
              return (
                <IndigredientChoice
                  replaceIngredient={replaceIngredient}
                  indexes={{ ...indexes, indgredientId: index }}
                data = {item}
                  key={index}
                />
              )
            })}
          </Stack>
        </ModalBody>

        <ModalFooter >
          <Button tabIndex={dataLength + 1} variant="ghost">
            Domyślny posiłek
          </Button>
          <Button 
            tabIndex={dataLength + 2}
            colorScheme="blue"
            ml={3}
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
