import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize } from "lodash"
import React, { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { dishesState } from "../../../api/atoms/dishes"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { userIdsState } from "../../../api/atoms/userIds"
import { Ingredient } from "../../../api/types"
import { updateIngredients } from "./APIRequest"
import { changeIngredients } from "./functions"

interface IndigredientChoiceProps {
  ingredient: Ingredient
  name: string
}
const IndigredientChoice = ({
  ingredient,
  name: dishName,
}: IndigredientChoiceProps) => {
  const toast = useToast()
  const { userDataId } = useRecoilValue(userIdsState)
  const [loading, setLoading] = useState(false)
  const { amount, name, replacements, originalName } = ingredient
  const [ingredientPreferences, setIngredientPreferences] = useRecoilState(
    ingredientPreferencesState
  )
  const dishes = useRecoilValue(dishesState)
  const handleClick22 = async (replaceableIndex: number) => {
    setLoading(true)

    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("foo")
      }, 300)
    })
    const res = await myPromise.then(
      () => true,
      () => false
    )

    if (res) {
      toast({
        title: "Udało się zmienić składnik",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    } else {
      toast({
        title: "Nie udało się zmienić składnik",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  const handleClick = async (newName: string) => {
    const newIngredients = changeIngredients({
      dishName,
      ingredientPreferences,
      newName,
      originalName,
      dishes
    })
    
    const xd = await updateIngredients({ data: newIngredients, userDataId })
    console.log(xd,"SSS")
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
              return (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  key={index}
                  isLoading={loading}
                  onClick={() => {
                    handleClick(item.name)
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
