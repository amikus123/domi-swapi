import { Flex, Text } from "@chakra-ui/react"
import { formatISO9075, getISODay } from "date-fns"
import React from "react"
import { Dish } from "../../../../lib/helpers/jsonToState"
import { SingleDietDayData } from "../../../../pages/user/diet"
import { getKcal } from "../functions"

interface DishColumnHeaderProps {
  date: Date
  dishes: Dish[]
}

const daysOfWeek = [
  "",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
]
const DishColumnHeader = ({ date, dishes }: DishColumnHeaderProps) => {
  return (
    <Flex
      w="100%"
      direction="row"
      justify="space-between"
      fontWeight={500}
      fontSize={20}
      py={4}
    >
      <Text w={120}>{daysOfWeek[getISODay(date)]}</Text>
      <Text>{formatISO9075(date, { representation: "date" })}</Text>
      <Text w={40} textAlign="end">
        {getKcal(dishes)} kcal
      </Text>
    </Flex>
  )
}

export default DishColumnHeader
