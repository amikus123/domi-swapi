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
import { cloneDeep, omit } from "lodash"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { dishPreferencesState } from "../../../api/atoms/dishPreferences"
import { FullDish } from "../../../api/types"
import DishModalDish from "./DishModalDish"

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
  const { dish, originalDishName, replacements } = dishData

  const { name: currentName } = dish
  const [dishPreference, setDishPreference] =
    useRecoilState(dishPreferencesState)
  const dishes = useRecoilValue(dishesState)

  const checkIfOriginal = (newName: string) => {
    return originalDishName === newName
  }

  const removePreference = (originalName: string) => {
    let copy = cloneDeep(dishPreference)
    console.log(dishPreference, originalName, "WTF")
    copy = omit(copy, originalName)
    console.log(copy, "res")
    setDishPreference(copy)
  }
  const modifyPreference = (originalName: string, newName: string) => {
    const copy = cloneDeep(dishPreference)
    console.log(copy, originalName, newName, "mod")
    copy[originalName] = {
      preferedName: newName,
      id: 1,
      originalName: originalName,
    }

    setDishPreference(copy)
  }

  const handleClick = (newName: string) => {
    console.log(newName, originalDishName, dishPreference, "XDDD")
    console.log(dish.name)
    if (!checkIfOriginal(newName)) {
      modifyPreference(originalDishName, newName)
    } else {
      removePreference(newName)
      // original - remove preference from array
      // find the preferene in arr and remove it
    }
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
                handleClick={handleClick}
                key={index}
                index={index}
                dish={dishes[item]}
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
