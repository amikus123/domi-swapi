import React from "react"
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import DishModal from "./DishModal/DishModal"
import { FullDish } from "../../../api/types"

interface DishRecpipeProps {
  dishData: FullDish
}
const DishRecipe = ({ dishData }: DishRecpipeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const { dish, replacements } = dishData
  const { recipe } = dish
  // TODO handle markdown
  return (
    <Flex direction="column" align="center">
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit
        aliquid provident eius inventore totam architecto eveniet deleniti
        dolore.
        {recipe}
      </Text>
      {replacements && replacements.length > 0 && (
        <>
          <Button mt={10} w={60} onClick={onOpen}>
            Wymień danie
          </Button>
          <DishModal
            dishData={dishData}
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
          />
        </>
      )}
    </Flex>
  )
}

export default DishRecipe
