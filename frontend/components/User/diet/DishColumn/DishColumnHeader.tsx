import { Flex, Text } from "@chakra-ui/react"
import { formatISO9075, getISODay } from "date-fns"
import React from "react"

interface DishColumnHeaderProps {
  date: Date
  kcalCount:number
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
const DishColumnHeader = ({ date,kcalCount }: DishColumnHeaderProps) => {
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
      <Text w={[ "unset","unset",40]}
      display={["none","inline-block"]}
      textAlign="end" >
        {kcalCount} kcal
      </Text>
    </Flex>
  )
}

export default DishColumnHeader
