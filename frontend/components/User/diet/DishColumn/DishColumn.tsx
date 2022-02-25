import { Accordion, Divider, Stack } from "@chakra-ui/react"
import React from "react"
import { DietDay } from "../../../../lib/helpers/jsonToState"
import diet, {
  DishColumnData,
  ObjectFrontendIndexes,
  SingleDietDayData,
} from "../../../../pages/user/diet"
import DishColumnHeader from "../DishRow/DishColumnHeader"
import DishRow from "../DishRow/DishRow"

interface DishColumnProps {
  dishColumnData: DishColumnData[]
  replaceIngredient?: (IDs: ObjectFrontendIndexes) => void
}

// * if we show more than one day, we hide all of them expect the fisrt
const DishColumn = ({ dishColumnData, replaceIngredient }: DishColumnProps) => {
  return (
    <>
      {dishColumnData.map((item, key) => {
        const { date, dietDay } = item
        return (
          <Stack w="100%" key={key}>
            <DishColumnHeader date={date} dishes={dietDay.dishes} />

            {dietDay.dishes.map((dish, index) => {
              return (
                <Accordion
                  defaultIndex={key === 0 ? [0] : []}
                  allowMultiple
                  key={index}
                >
                  <DishRow
                    dish={dish}
                    replaceIngredient={replaceIngredient}
                    indexes={{ dayId: key, dishId: index }}
                  />
                </Accordion>
              )
            })}
            {key !== diet.length-1 ? <Divider py={2} /> : null}
          </Stack>
        )
      })}
    </>
  )
}

export default DishColumn
