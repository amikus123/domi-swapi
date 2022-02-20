import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react"
import React from "react"
import { Ingredient } from "../../../../pages/user/diet"


interface DishRecpipeProps{
  data: Ingredient[]
}

const Dishingredients = ({data}:DishRecpipeProps) => {
  return (
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
  )
}

export default Dishingredients
