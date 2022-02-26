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
import { cloneDeep } from "lodash"
import React from "react"
import { useRecoilState } from "recoil"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { Ingredient } from "../../../api/types"

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
  // ! ADD UNIVERSAL LOADING TIME
  const resetToDefault = () => {
    const dishPreferenceData = ingredientPreferences[name]
    const copy = cloneDeep(dishPreferenceData)

    copy.preferredIngredients = []
    console.log("removePreference", copy.preferredIngredients)

    setIngredientPreferences({ ...ingredientPreferences, [name]: copy })
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
            onClick={() => {
              resetToDefault()
            }}
          >
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
