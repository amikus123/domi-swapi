import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize } from "lodash"
import React, { useState } from "react"
import {
  ObjectFrontendIndexes,
  ReplecableIndegredient,
} from "../../../../../pages/user/diet"

interface IndigredientChoiceProps {
  data: ReplecableIndegredient
  indexes: ObjectFrontendIndexes
  replaceIngredient: (IDs: ObjectFrontendIndexes) => void
}
const IndigredientChoice = ({
  data,

  indexes,
  replaceIngredient,
}: IndigredientChoiceProps) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { amount, name, replacements } = data
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
      // change global state
      toast({
        title: "Udało się zmienić składnik",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      replaceIngredient({ ...indexes, replacebleId: replaceableIndex })
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
                    handleClick(index)
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
