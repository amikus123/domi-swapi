import { Stack, Flex, Text, Button } from "@chakra-ui/react"
import React from "react"
import DietCards from "../../components/User/index/DietCards/DietCards"

const index = () => {
  return (
    <Stack spacing={8} w={800}>
      {/* if user has never saved his data, modal will be shown */}
      <Text fontSize="40" variant="h2">
        Wybierz diete
      </Text>
      <DietCards />

      <Flex w="100%" justify="space-between"></Flex>
      <Flex justify="flex-end"></Flex>

      <Button colorScheme="teal" variant="link">
        Button
      </Button>
    </Stack>
  )
}

export default index
