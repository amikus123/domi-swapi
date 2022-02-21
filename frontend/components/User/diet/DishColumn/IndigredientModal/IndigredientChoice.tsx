import { Button, Flex, Stack, Text, useToast } from "@chakra-ui/react"
import React, { useState } from "react"


interface IndigredientChoiceProps{

}
const IndigredientChoice = ({}:IndigredientChoiceProps) => {
  const replacements = [1, 2, 3]
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(!loading)
    toast({
      title: "Udało się zmienić składnik",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }
  return (
    <Flex direction="column">
      <Text w="100%" mb={4} fontWeight={500} fontSize={20}>
        Czerwona papryka - 1 sztuka:
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
                handleClick()
              }}
            >
              Zółta papryka - 1 sztuka
            </Button>
          )
        })}
      </Stack>
    </Flex>
  )
}

//

export default IndigredientChoice
