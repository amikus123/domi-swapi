import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import React from "react"

const IndigredientChoice = () => {
  const replacements = [1, 2, 3]
  return (
    <Flex direction="column">
      <Text w="100%" mb={4} fontWeight={500} fontSize={20}>
        Czerwona papryka - 1 sztuka:
      </Text>
      <Stack alignSelf="flex-end">
        {replacements.map((item, index) => {
          return (
            <Button colorScheme="teal" variant="outline" key={index}>
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
