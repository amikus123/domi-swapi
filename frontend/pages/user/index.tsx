import { Stack,  Text, } from "@chakra-ui/react"
import { parseCookies } from "nookies"
import React, { useEffect, useState } from "react"
import { getDiets, getUser } from "../../lib/server/fetching/serverSide"
import { UserFullData } from "../../components/User/api/types"
import DietCards from "../../components/User/index/cards/DietCards"
import { ParsedDiet } from "../../lib/server/jsonParsers/parseDiets"

interface IndexProps {
  user: UserFullData
  diets: Record<string, ParsedDiet>
  originalDietName: string
}

const index = ({ user, diets, originalDietName }: IndexProps) => {
  useEffect(() => {
    console.log(user)
    console.log(diets)
    console.log(originalDietName)
  }, [user, diets])
  // change crerwetn diet
  const [selectedDietName, setSelectedDietName] = useState(originalDietName)
  return (
    <Stack spacing={8} maxW={1200}>
      <Text fontSize="40" variant="h2"></Text>
      <DietCards diets={diets} selectedDietName={selectedDietName} />


    </Stack>
  )
}

export default index

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const diets = await getDiets()

  // TODO filter diets so only allowed for user are shown
  // * get current  diet from user
  const originalDietName = user.userDiet.diet.name
  return {
    props: { user, diets, originalDietName },
  }
}
