import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import { capitalize, delay, throttle } from "lodash"
import React, { useState } from "react"
import { Ingredient, ReplecableIndegredient } from "../../../../../pages/user/diet"

interface IndigredientChoiceProps {
  name: string
  replacable: Ingredient[]
}
const IndigredientChoice = ({ replacable, name }: IndigredientChoiceProps) => {



  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
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
      {replacable &&
      replacable.length > 0 ? (
        <Flex direction="column">
          <Text w="100%" mb={4} fontWeight={500} fontSize={20}>
            {capitalize(name)}
          </Text>
          <Stack alignSelf="flex-end">
            {replacable.map((item, index) => {
              return (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  key={index}
                  isLoading={loading}
                  onClick={() => {
                    handleClick()
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
