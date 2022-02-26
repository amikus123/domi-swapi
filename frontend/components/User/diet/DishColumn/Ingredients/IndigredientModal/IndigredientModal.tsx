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
import { Ingredient } from "../../../api/types"

import IndigredientChoice from "./IndigredientChoice"

interface IndigredientModalProps {
  isOpen: boolean
  onClose: () => void
  ingredients: Ingredient[]
  initialRef: any
}

const IndigredientModal = ({
  isOpen,
  onClose,
  ingredients,
  initialRef,
}: IndigredientModalProps) => {
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
            {ingredients.map((ingredient, index) => {
              return (
                <IndigredientChoice
                ingredient={ingredient}
                  key={index}
                />
              )
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button tabIndex={ingredients.length + 1} variant="ghost">
            Domyślny posiłek
          </Button>
          <Button
            tabIndex={ingredients.length + 2}
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
