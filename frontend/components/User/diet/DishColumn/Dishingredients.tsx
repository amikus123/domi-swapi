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
import { ReplecableIndegredient } from "../../../../pages/user/diet"
import IndigredientModal from "./IndigredientModal/IndigredientModal"

interface DishRecpipeProps {
  data: ReplecableIndegredient[]
}

const checkIfCanReplace = (data: ReplecableIndegredient[]) => {
  for (const i of data) {
    if (i.replacements && i.replacements.length > 0) {
      return true
    }
  }
  return false
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
                <Td>{capitalize(item.name)}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      {checkIfCanReplace(data) ? (
        <Button mt={10} w={60} onClick={onOpen}>
          Zmień składniki
        </Button>
      ) : null}

      <IndigredientModal
        data={data}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
      />
    </Flex>
  )
}

export default Dishingredients
