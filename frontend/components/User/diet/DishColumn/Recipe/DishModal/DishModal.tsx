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
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { dishPreferencesState } from "../../../api/atoms/dishPreferences"
import { FullDish } from "../../../api/types"
import DishModalDish from "./DishModalDish"
import { handleDishChange } from "./functions"

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

  const [dishPreference, setDishPreference] =
    useRecoilState(dishPreferencesState)
  const dishes = useRecoilValue(dishesState)

  const handleClick = (item: string) => {
    handleDishChange({
      originalName: originalDishName,
      newName: item,
      dishPreference,
      setDishPreference,
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
      <ModalContent>
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
              />
            )
          })}
        </ModalBody>

        <ModalFooter>
          <Button
            tabIndex={replacements.length + 1}
            variant="ghost"
            onClick={() => {
              handleDishChange({
                originalName: originalDishName,
                newName: originalDishName,
                dishPreference,
                setDishPreference,
              })
            }}
          >
            Domyślny posiłek
          </Button>

          <Button
            tabIndex={replacements.length + 2}
            colorScheme="blue"
            mr={3}
            onClick={()=>{
            }}
          >
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DishModal
