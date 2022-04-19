import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react"
import { capitalize } from "lodash"
import React, { RefObject } from "react"
import { Ingredient } from "../../../../../lib/types/dietPage/dishTypes"
import { FocusableElement } from "@chakra-ui/utils"

import IndigredientModal from "./IndigredientModal/IndigredientModal"
// const initialRef = React.useRef() as RefObject<FocusableElement>

interface DishRecpipeProps {
  ingredients: Ingredient[]
  name: string
}

const checkIfCanReplace = (data: Ingredient[]) => {
  for (const i of data) {
    if (i.replacements && i.replacements.length > 0) {
      return true
    }
  }
  return false
}

const Dishingredients = ({ ingredients, name }: DishRecpipeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // * may require changes
  const initialRef = React.useRef() as RefObject<FocusableElement>
  //* if there ar no viable options for replacements, we wont show the modal
  return (
    <Flex direction="column" align="center">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Składnik</Th>
            <Th>Ilość</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>{capitalize(item.name)}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {checkIfCanReplace(ingredients) && (
        <>
          <Button mt={10} w={60} onClick={onOpen}>
            Zmień składniki
          </Button>

          <IndigredientModal
            name={name}
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            ingredients={ingredients}
          />
        </>
      )}
    </Flex>
  )
}

export default Dishingredients
