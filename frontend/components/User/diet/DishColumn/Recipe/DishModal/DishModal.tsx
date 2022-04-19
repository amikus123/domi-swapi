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
import React, { RefObject, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../../api/atoms/dishes"
import { dishPreferencesState } from "../../../../api/atoms/dishPreferences"
import { isPublicState } from "../../../../api/atoms/isPublic"
import { userIdsState } from "../../../../api/atoms/userIds"
import { handlDishChange } from "./handleInteraction"
import { FocusableElement } from "@chakra-ui/utils"
import { FullDish } from "../../../../../../lib/types/dietPage/dishTypes"
import DishModalDish from "./DishModalDish"

interface DishModalProps {
  isOpen: boolean
  onClose: () => void
  initialRef:  RefObject<FocusableElement>
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
  const isPublic = useRecoilValue(isPublicState)

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
      isPublic
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
      isPublic
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
