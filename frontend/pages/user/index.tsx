import { Stack, Text } from "@chakra-ui/react"
import { parseCookies } from "nookies"
import React, { useState } from "react"
import DietCards from "../../components/User/index/cards/DietCards"
import { getDiets } from "../../lib/server/fetching/getDiets"
import { getUser } from "../../lib/server/fetching/getUser"
import { UserFullData } from "../../lib/types/dietPage/userTypes"
import { ParsedDiet } from "../../lib/types/JSON/parsed/parsedDiets"

interface IndexProps {
  user: UserFullData
  diets: Record<string, ParsedDiet>
  originalDietName: string
}

const index = ({ diets, originalDietName }: IndexProps) => {
  const [selectedDietName] = useState(originalDietName)
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
