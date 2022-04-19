import { Accordion, Stack } from "@chakra-ui/react"
import React from "react"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import DishColumnHeader from "./DishColumnHeader"
import DishRow from "./DishRow"

interface DishColumnProps {
  dishColumnData: DishColumnData[]
}

// * if we show more than one day, we hide all of them expect the fisrt
const DishColumn = ({ dishColumnData }: DishColumnProps) => {
  return (
    <Stack spacing={12} w={[500, 700, 1000]} px={[0, 4, 10]} maxW="95vw">
      {dishColumnData.map((item, key) => {
        const { date, fullDietDay } = item
        const { dishes, kcalCount } = fullDietDay
        return (
          <Stack w="100%" key={key} spacing={4}>
            <DishColumnHeader date={date} kcalCount={kcalCount} />
            {dishes.map((dish, index) => {
              return (
                <Accordion
                  defaultIndex={key === 0 ? [0] : []}
                  allowMultiple
                  key={index}
                >
                  <DishRow dishData={dish} />
                </Accordion>
              )
            })}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default DishColumn
