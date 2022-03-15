import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import React from 'react'
import { NameAmount } from '../../../api/types'



interface DishNutritionProps{
    nutrients: NameAmount[]
  }

const DishNutrition = ({nutrients}:DishNutritionProps) => {
  return (
    <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Składnik pokarmowy</Th>
            <Th>Ilość</Th>
          </Tr>
        </Thead>
        <Tbody>
          {nutrients.map((item, index) => {
            return (
              <Tr key={index}>
                
                <Td>{capitalize(item.name)}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
  )
}

export default DishNutrition