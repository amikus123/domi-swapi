import React from "react"
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import DishModal from "./DishModal/DishModal"

interface DishRecpipeProps {
  recipe: string
}
const DishRecipe = ({ recipe }: DishRecpipeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()

  return (
    <Flex direction="column" align="center">
      <Text>{recipe}</Text>
      <Button mt={10} w={60} onClick={onOpen}>
        Wymień danie
      </Button>
      <DishModal
        replacements={[]}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
      />
    </Flex>
  )
}

export default DishRecipe
