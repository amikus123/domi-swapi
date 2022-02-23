import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { BaseDishData } from "../../../../../pages/user/diet"
import DishModalDish from "./DishModalDish"

interface DishModalProps {
  isOpen: boolean
  onClose: () => void
  replacements: BaseDishData[]
  initialRef: any
}

const DishModal = ({
  isOpen,
  onClose,
  replacements,
  initialRef,
}: DishModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      scrollBehavior="inside"
      
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wybierz inny posiłek</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {replacements.map((item, index) => {
            return (
              <DishModalDish
                onClose={onClose}
                key={index}
                index={index}
                data={item}
                ref={index === 0 ? initialRef : null}
              />
            )
          })}
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

export default DishModal
