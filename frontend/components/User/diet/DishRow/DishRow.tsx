import {
  Text,
  Flex,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"
import React from "react"
import { DishData } from "../../../../pages/user/diet"
import DishLeft from "../DishColumn/DishLeft"
import DishRight from "../DishColumn/DishRight"

interface DishRowProps {
  dish: DishData
}
const DishRow = ({ dish }: DishRowProps) => {
  const { category, imageData, indigredietnts, name, nutritions, recipe } = dish
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text py={2} fontSize={20} fontWeight={600}>
            {category} - {name}
          </Text>{" "}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Flex px={4} align="flex-start">
          <DishLeft imageData={imageData} name={name} />
          <DishRight
            indigredietnts={indigredietnts}
            nutritions={nutritions}
            recipe={recipe}
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default DishRow
