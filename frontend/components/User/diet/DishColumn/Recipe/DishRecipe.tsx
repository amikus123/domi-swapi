import React from "react"
import { Button, Flex, Text, useDisclosure, Stack } from "@chakra-ui/react"
import DishModal from "./DishModal/DishModal"
import { FullDish } from "../../../../../lib/types/dietPage/dishTypes"
import BlogMarkdown from "../../../../Markdown/Blog/BlogMarkdown"

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
        <BlogMarkdown text={recipe} spacing={4} />
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
