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
  useToast,
} from "@chakra-ui/react"
import { cloneDeep } from "lodash"
import React, { useState } from "react"
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { userIdsState } from "../../../api/atoms/userIds"
import { Dish, Ingredient, IngredientPreference } from "../../../api/types"
import { updateIngredients } from "./APIRequest"
import { changeIngredients } from "./functions"
import { handleIngredientChange } from "./handleInteraction"

import IndigredientChoice from "./IndigredientChoice"

interface IndigredientModalProps {
  isOpen: boolean
  onClose: () => void
  ingredients: Ingredient[]
  initialRef: any
  name: string
}

const IndigredientModal = ({
  isOpen,
  onClose,
  ingredients,
  initialRef,
  name,
}: IndigredientModalProps) => {
  const [ingredientPreferences, setIngredientPreferences] = useRecoilState(
    ingredientPreferencesState
  )
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const dishes = useRecoilValue(dishesState)
  const { userDataId } = useRecoilValue(userIdsState)

  const resetToDefault = async () => {
    handleIngredientChange({
      dishName: name,
      removeAll: true,
      dishes,
      ingredientPreferences,
      newName: "",
      originalName: "",
      setIngredientPreferences,
      setLoading,
      toast,
      userDataId,
      loading,
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
        <ModalHeader>Zamień składniki</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {ingredients.map((ingredient, index) => {
              return (
                <IndigredientChoice
                  loading={loading}
                  setLoading={setLoading}
                  ingredient={ingredient}
                  name={name}
                  key={index}
                />
              )
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            tabIndex={ingredients.length + 1}
            variant="ghost"
            isLoading={loading}
            onClick={() => {
              resetToDefault()
            }}
            
          >
            Domyślny posiłek
          </Button>
          <Button
            tabIndex={ingredients.length + 2}
            colorScheme="blue"
            ml={4}
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
