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
import { Dish } from "../api/types"

import DishLeft from "./DishLeft"
import DishRight from "./DishRight"

interface DishRowProps {
  dish: Dish
}

const handleTimeCategory = (category: string) => {
  if (category === "sniadanie") {
    return "Śniadanie"
  } else {
    return capitalize(category)
  }
}

const DishRow = ({ dish }: DishRowProps) => {
  const {
    dishPage,
    id,
    image,
    ingredients,
    name,
    nutrients,
    slug,
    description,
    recipe,
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
        <Flex px={4} align="flex-start">
          <DishLeft image={image} />
          <DishRight dish={dish} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default DishRow
