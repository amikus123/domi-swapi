import { Flex, Text } from "@chakra-ui/react"
import { formatISO9075, getISODay } from "date-fns"
import React from "react"
import { SingleDietDayData } from "../../../../pages/user/diet"
import { getKcal } from "../functions"

interface DishColumnHeaderProps {
  data: SingleDietDayData
}

const daysOfWeek = ["","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"]
const DishColumnHeader = ({ data }: DishColumnHeaderProps) => {
  const { date,dishes } = data

  return (
    <Flex
      w="100%"
      direction="row"
      justify="space-between"
      fontWeight={500}
      fontSize={20}
      py={4}
    >
      <Text>{daysOfWeek[getISODay(date)]}</Text>
      <Text>{formatISO9075(date,{ representation: 'date' })}</Text>
      <Text>{getKcal(dishes)} kcal</Text>
    </Flex>
  )
}

export default DishColumnHeader
