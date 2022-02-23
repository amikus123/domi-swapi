import React from "react"
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import DishModal from "./DishModal/DishModal"
import { BaseDishData } from "../../../../pages/user/diet"

interface DishRecpipeProps {
  recipe: string
  replacements: BaseDishData[]
}
const DishRecipe = ({ recipe, replacements }: DishRecpipeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  return (
    <Flex direction="column" align="center">
      <Text>{recipe}</Text>
      {(replacements && replacements.length > 0) || (
        <>
          <Button mt={10} w={60} onClick={onOpen}>
            Wymień danie
          </Button>
          <DishModal
            replacements={replacements}
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
