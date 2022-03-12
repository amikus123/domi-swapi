import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize } from "lodash"
import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { userIdsState } from "../../../api/atoms/userIds"
import { Dish, Ingredient, IngredientPreference } from "../../../api/types"
import { updateIngredients } from "./APIRequest"
import { changeIngredients } from "./functions"
import {
  handleIngredientChange,
  HandleIngredientChangeProps,
} from "./handleInteraction"

interface IndigredientChoiceProps {
  ingredient: Ingredient
  name: string
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const IndigredientChoice = ({
  ingredient,
  name: dishName,
  loading,
  setLoading,
}: IndigredientChoiceProps) => {
  const toast = useToast()
  const { userDataId } = useRecoilValue(userIdsState)
  const { amount, name, replacements, originalName } = ingredient
  const [ingredientPreferences, setIngredientPreferences] = useRecoilState(
    ingredientPreferencesState
  )
  const dishes = useRecoilValue(dishesState)

  const handleClick = async (newName:string) => {
    handleIngredientChange({
      dishName,
      dishes,
      ingredientPreferences,
      newName,
      originalName,
      setIngredientPreferences,
      setLoading,
      toast,
      userDataId,
      loading
    })
  }
  return (
    <>
      {replacements && replacements.length > 0 ? (
        <Flex direction="column">
          <Text w="100%" mb={4} fontWeight={500} fontSize={20}>
            {capitalize(name)} - {capitalize(amount)}
          </Text>
          <Stack alignSelf="flex-end">
            {replacements.map((item, index) => {
              const { name: newName } = item
              return (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  key={index}
                  isLoading={loading}
                  onClick={() => {
                    handleClick(newName)
                  }}
                >
                  {capitalize(item.name)} - {capitalize(item.amount)}
                </Button>
              )
            })}
          </Stack>
        </Flex>
      ) : (
        <></>
      )}
    </>
  )
}

//

export default IndigredientChoice
