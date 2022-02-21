import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { capitalize } from 'lodash'
import React from 'react'
import { Ingredient, TrueIngredients } from '../../../../pages/user/diet'



interface DishNutritionProps{
    data: TrueIngredients
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
  )
}

export default DishNutrition