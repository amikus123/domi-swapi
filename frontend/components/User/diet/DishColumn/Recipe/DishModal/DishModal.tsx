import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { dishPreferencesState } from "../../../api/atoms/dishPreferences"
import { userIdsState } from "../../../api/atoms/userIds"
import { FullDish } from "../../../api/types"
import DishModalDish from "./DishModalDish"
import { changeDishPreference } from "./functions"
import { handlDishChange } from "./handleInteraction"

interface DishModalProps {
  isOpen: boolean
  onClose: () => void
  initialRef: any
  dishData: FullDish
}

const DishModal = ({
  isOpen,
  onClose,
  initialRef,
  dishData,
}: DishModalProps) => {
  const { originalDishName, replacements } = dishData
  const { userDataId } = useRecoilValue(userIdsState)

  const [dishPreference, setDishPreference] =
    useRecoilState(dishPreferencesState)
  const dishes = useRecoilValue(dishesState)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleClick = async (newName: string) => {
    handlDishChange({
      dishPreference,
      dishes,
      newName,
      originalName: originalDishName,
      setDishPreference,
      setLoading,
      toast,
      userDataId,
      loading,
    })
  }

  const handleReset = async () => {
    handlDishChange({
      dishPreference,
      loading,
      dishes,
      newName: originalDishName,
      originalName: originalDishName,
      setDishPreference,
      setLoading,
      toast,
      userDataId,
    })
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent mx={16}>
        <ModalHeader>Wybierz inny posiłek</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {replacements.map((item, index) => {
            return (
              <DishModalDish
                onClose={onClose}
                handleClick={() => {
                  handleClick(item)
                }}
                key={index}
                index={index}
                dish={dishes[item]}
                ref={index === 0 ? initialRef : null}
                loading={loading}
              />
            )
          })}
        </ModalBody>

        <ModalFooter>
          <Button
            tabIndex={replacements.length + 1}
            variant="ghost"
            isLoading={loading}
            mr={4}
            onClick={() => {
              handleReset()
            }}
          >
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
