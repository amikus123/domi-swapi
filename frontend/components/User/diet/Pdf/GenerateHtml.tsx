import { formatISO9075, getISODay } from "date-fns"
import React from "react"
import { DishColumnData } from "../api/types"
import { Flex, Text } from "@chakra-ui/react"

interface GenerateHtmlProps {
  item: DishColumnData
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
  
const GenerateHtml = ({ item }: GenerateHtmlProps) => {
  /*
    DIET NAAE
    */
  const { date, fullDietDay } = item
  return (
    <div className="pdf">
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
        </Flex>
        <p>{formatISO9075(date, { representation: "date" })}</p>

    </div>
  )
}

export default GenerateHtml
