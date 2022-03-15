import { Stack, Flex, Text, Button } from "@chakra-ui/react"
import { parseCookies } from "nookies"
import React, { useEffect } from "react"
import { ParsedDiet } from "../../components/User/api/parseJSON/parseDiets"
import { getDiets, getUser } from "../../components/User/api/serverSide"
import { UserFullData } from "../../components/User/api/types"
import DietCards from "../../components/User/index/DietCards/DietCards"

interface IndexProps {
  user: UserFullData
  diets: ParsedDiet[]
}

const index = ({ user, diets }: IndexProps) => {
  useEffect(() => {
    console.log(user)
    console.log(diets)
  }, [user, diets])
  const { userDiet } = user
  // change crerwetn diet
  return (
    <Stack spacing={8} w={800}>
      <Text fontSize="40" variant="h2"></Text>
      <DietCards diets={diets} />

      <Flex w="100%" justify="space-between"></Flex>
      <Text>{JSON.stringify(diets)}</Text>

      <Flex justify="flex-end"></Flex>
      <Text>{JSON.stringify(userDiet)}</Text>
      <Button colorScheme="teal" variant="link">
        Button
      </Button>
    </Stack>
  )
}

export default index

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const diets = await getDiets()
  return {
    props: { user, diets },
  }
}
