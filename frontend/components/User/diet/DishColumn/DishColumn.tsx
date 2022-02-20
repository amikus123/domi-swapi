import { Stack } from "@chakra-ui/react"
import React from "react"
import { DayData, DayDate, DishData } from "../../../../pages/user/diet"
import DishColumnHeader from "../DishRow/DishColumnHeader"
import DishRow from "../DishRow/DishRow"

interface DishColumnProps {
  data: DayData[]
}
const DishColumn = ({ data }: DishColumnProps) => {
  return (
    <>
      {data.map((item, key) => {
        return (
          <Stack w="100%" spacing={8} key={key}>
            <DishColumnHeader data={item.dayData} />
            {item.dishes.map((dish, index) => {
              return <DishRow dish={dish} key={index} />
            })}
          </Stack>
        )
      })}
    </>
  )
}

export default DishColumn
