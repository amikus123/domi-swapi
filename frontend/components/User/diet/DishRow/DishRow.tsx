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
import { Dish } from "../../../../lib/helpers/jsonToState"
import {
  ObjectFrontendIndexes,
  TrueDishData,
} from "../../../../pages/user/diet"
import DishLeft from "../DishColumn/DishLeft"
import DishRight from "../DishColumn/DishRight"

interface DishRowProps {
  dish: Dish
  indexes: ObjectFrontendIndexes
  replaceIngredient: (IDs: ObjectFrontendIndexes) => void
}
const DishRow = ({ dish, indexes, replaceIngredient }: DishRowProps) => {
  const { dishPage, id, image, ingredients, name, nutrients, slug ,timeCategory} = dish
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text py={2} fontSize={20} fontWeight={600}>
            {timeCategory} - {name}
          </Text>{" "}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Flex px={4} align="flex-start">
          <DishLeft image={image}  />
          <DishRight
            replaceIngredient={replaceIngredient}
            indexes={indexes}
            ingredients={ingredients}
            nutrients={nutrients}
            recipe={""}
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default DishRow
