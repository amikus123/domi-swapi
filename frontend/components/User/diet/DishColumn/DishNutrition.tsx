import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'
import { Ingredient } from '../../../../pages/user/diet'



interface DishNutritionProps{
    data: Ingredient[]
  }

const DishNutrition = ({data}:DishNutritionProps) => {
  return (
    <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Składnik pokarmowy</Th>
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

export default DishNutrition