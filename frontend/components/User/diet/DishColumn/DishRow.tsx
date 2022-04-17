import {
  Text,
  Flex,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"
import { capitalize } from "lodash"
import React from "react"
import { FullDish } from "../../api/types"

import DishLeft from "./DishLeft"
import DishRight from "./DishRight"

interface DishRowProps {
  dishData: FullDish
}

const handleTimeCategory = (category: string) => {
  if (category === "sniadanie") {
    return "Śniadanie"
  } else {
    return capitalize(category)
  }
}

const DishRow = ({ dishData }: DishRowProps) => {
  const { dish } = dishData
  const {
    image,
    name,
    timeCategory,
  } = dish
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text py={2} fontSize={20} fontWeight={600}>
            {handleTimeCategory(timeCategory)} - {name}
          </Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Flex px={[0,0,4]} align="flex-start" direction={["column", "column", "row"]}>
          <DishLeft image={image} />
          <DishRight dishData={dishData} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default DishRow
