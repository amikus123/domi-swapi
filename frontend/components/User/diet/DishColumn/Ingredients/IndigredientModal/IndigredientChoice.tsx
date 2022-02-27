import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize } from "lodash"
import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { Ingredient } from "../../../api/types"
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
  const [loading, setLoading] = useState(false)
  const { amount, name, replacements, originalName } = ingredient
  const [ingredientPreferences, setIngredientPreferences] = useRecoilState(
    ingredientPreferencesState
  )

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

  const handleClick = (newName: string) => {
    changeIngredients({
      dishName,
      ingredientPreferences,
      newName,
      originalName,
      setIngredientPreferences,
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
