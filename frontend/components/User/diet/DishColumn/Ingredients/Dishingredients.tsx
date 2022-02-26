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
import React from "react"
import { Ingredient } from "../../api/types"

import IndigredientModal from "./IndigredientModal/IndigredientModal"

interface DishRecpipeProps {
  ingredients: Ingredient[]
}

const checkIfCanReplace = (data: Ingredient[]) => {
  for (const i of data) {
    if (i.replacements && i.replacements.length > 0) {
      return true
    }
  }
  return false
}

const Dishingredients = ({ ingredients }: DishRecpipeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
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
