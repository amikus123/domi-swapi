import { Accordion, Divider, Stack } from "@chakra-ui/react"
import React from "react"
import diet from "../../../../pages/user/diet"
import { DishColumnData } from "../api/types"

import DishColumnHeader from "./DishColumnHeader"
import DishRow from "./DishRow"

interface DishColumnProps {
  dishColumnData: DishColumnData[]
}

// * if we show more than one day, we hide all of them expect the fisrt
const DishColumn = ({ dishColumnData }: DishColumnProps) => {
  return (
    <>
      {dishColumnData.map((item, key) => {
        const { date, fullDietDay } = item
        const { dishes, kcalCount } = fullDietDay
        return (
          <Stack w="100%" key={key}>
            <DishColumnHeader date={date} kcalCount={kcalCount} />

            {dishes.map((dish, index) => {
              return (
                <Accordion
                  defaultIndex={key === 0 ? [0] : []}
                  allowMultiple
                  key={index}
                >
                  <DishRow
                    dish={dish.dish}
                  />
                </Accordion>
              )
            })}
            {key !== diet.length - 1 ? <Divider py={2} /> : null}
          </Stack>
        )
      })}
    </>
  )
}

export default DishColumn
