import { HStack, Text, Flex, Stack } from "@chakra-ui/react"
import React from "react"
import { DishData } from "../../../../pages/user/diet"
import DishLeft from "../DishColumn/DishLeft"
import DishRight from "../DishColumn/DishRight"

interface DishRowProps{
  dish:DishData,

}
const DishRow = ({dish}:DishRowProps) => {
  const {category,imageData,indigredietnts,name,nutritions,recipe} = dish
  return (
    <Stack maxW="1000px" spacing={8} >
      <Text py={4} fontSize={24} fontWeight={600}>
        {category}
      </Text>
      <Flex px={4}>
        <DishLeft imageData={imageData} name={name}/>
        <DishRight indigredietnts={indigredietnts}  nutritions={nutritions} recipe={recipe}/>
      </Flex>
    </Stack>
  )
}

export default DishRow
