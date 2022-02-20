import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import { DayDate } from "../../../../pages/user/diet"

interface DishColumnHeaderProps {
  data: DayDate
}
const DishColumnHeader = ({ data }: DishColumnHeaderProps) => {
  const { dateString, dayName, kcalCount } = data
  
  return (
    <Flex
      w="100%"
      direction="row"
      justify="space-between"
      fontWeight={500}
      fontSize={20}
      py={4}
    >
      <Text>{dayName}</Text>
      <Text>{dateString}</Text>
      <Text>{kcalCount} kcal</Text>
    </Flex>
  )
}

export default DishColumnHeader
