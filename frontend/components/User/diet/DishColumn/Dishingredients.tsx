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
import React from "react"
import { Ingredient } from "../../../../pages/user/diet"
import IndigredientModal from "./IndigredientModal/IndigredientModal"

interface DishRecpipeProps {
  data: Ingredient[]
}

const Dishingredients = ({ data }: DishRecpipeProps) => {
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
          {data.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      <Button mt={10} w={60} onClick={onOpen}>
        Zmień składniki
      </Button>

      <IndigredientModal
        replacements={[]}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
      />
    </Flex>
  )
}

export default Dishingredients
