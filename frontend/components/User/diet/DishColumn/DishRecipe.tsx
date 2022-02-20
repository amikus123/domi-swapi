import React from 'react'
import { Text } from '@chakra-ui/react'

interface DishRecpipeProps{
    recipe:string
}
const DishRecipe = ({recipe}:DishRecpipeProps) => {
  return (
    <Text>
        {recipe}
</Text>
  )
}

export default DishRecipe