import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize, cloneDeep } from "lodash"
import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { ingredientPreferencesState } from "../../../api/atoms/IngredientPreferences"
import { Ingredient } from "../../../api/types"

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

  const handleClick = async (replaceableIndex: number) => {
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

  const checkIfOriginal = (newName: string) => {
    return originalName === newName
  }

  const removePreference = (originalName: string) => {
    const ingredientPreference = ingredientPreferences[dishName] || {
      dishName,
      id: 11,
      preferredIngredients: [],
    }
    const copy = cloneDeep(ingredientPreference)
    // * removing fromm array
    const arr = copy.preferredIngredients.filter((pref) => {
      return pref.originalName !== originalName
    })
    copy.preferredIngredients = arr
    console.log("removePreference", copy.preferredIngredients)

    setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
  }
  const addPreference = (oldName: string, newName: string) => {
    const ingredientPreference = ingredientPreferences[dishName] || {
      dishName,
      id: 11,
      preferredIngredients: [],
    }
    let copy = cloneDeep(ingredientPreference)
    // * removing fromm array

    copy.preferredIngredients.push({
      id: 1,
      originalName: oldName,
      preferredName: newName,
    })
    console.log("addPreference", copy.preferredIngredients)

    setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
  }
  const modifyPreference = (oldName: string, newName: string) => {
    const ingredientPreference = ingredientPreferences[dishName] || {
      dishName,
      id: 11,
      preferredIngredients: [],
    }
    const copy = cloneDeep(ingredientPreference)
    // * find in arr
    for (const pref of copy.preferredIngredients) {
      console.log("MATCH", oldName, pref.originalName)
      if (pref.originalName === oldName) {
        pref.preferredName = newName
        break
      }
    }
    console.log("modifyPreference", copy.preferredIngredients)
    setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
  }

  const checkIfInside = (oldName: string): Boolean => {
    try {
      for (const pref of ingredientPreferences[dishName].preferredIngredients) {
        if (pref.originalName === oldName) {
          return true
        }
      }
      return false
    } catch (e) {
      return false
    }
  }

  const handleClick2 = (oldName: string, newName: string) => {
    // check if is not roiginal
    // if (ingredientPreferences[dishName] === undefined) {
    //   setIngredientPreferences({
    //     ...ingredientPreferences,
    //     [dishName]:,
    //   })
    // }
    if (!checkIfOriginal(newName)) {
      //check if is already in
      if (checkIfInside(oldName)) {
        // modify
        modifyPreference(originalName, newName)
      } else {
        addPreference(originalName, newName)
        // add new
      }
    } else {
      removePreference(newName)
      // original - remove preference from array
      // find the preferene in arr and remove it
    }
  }

  return (
    <>
      {replacements && replacements.length > 0 ? (
        <Flex direction="column">
          {/* <pre>
            {JSON.stringify(
              ingredientPreferences[dishName].preferredIngredients,
              null,
              2
            )}
          </pre>
          <p>{dishName}</p> */}
          {/* <pre>{JSON.stringify(ingredient, null, 2)}</pre> */}

          <Text w="100%" mb={4} fontWeight={500} fontSize={20}>
            {capitalize(name)} - {capitalize(amount)}
          </Text>
          <Stack alignSelf="flex-end">
            {/* {JSON.stringify(replacements)} */}
            {replacements.map((item, index) => {
              return (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  key={index}
                  isLoading={loading}
                  onClick={() => {
                    handleClick2(name, item.name)
                    // handleClick(index)
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
