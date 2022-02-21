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
import { TrueIngredients } from "../../../../pages/user/diet"
import IndigredientModal from "./IndigredientModal/IndigredientModal"

interface DishRecpipeProps {
  data: TrueIngredients
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
        {Object.keys(data).map((key, index) => {
            return (
              <Tr key={index}>
                
                <Td>{capitalize(key)}</Td>
                <Td>{data[key]}</Td>
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
