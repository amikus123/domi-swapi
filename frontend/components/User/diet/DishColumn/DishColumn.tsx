import { Accordion, Divider, Stack } from "@chakra-ui/react"
import React from "react"
import {  SingleDietDayData, } from "../../../../pages/user/diet"
import DishColumnHeader from "../DishRow/DishColumnHeader"
import DishRow from "../DishRow/DishRow"

interface DishColumnProps {
  diet: SingleDietDayData[]
}

// * if we show more than one day, we hide all of them expect the fisrt
const DishColumn = ({ diet }: DishColumnProps) => {
  return (
    <>
      {diet.map((item, key) => {
        return (
          <Stack w="100%" key={key}>
            <DishColumnHeader data={item} />
          
            {item.dishes.map((dish, index) => {
              return (
                <Accordion
                  defaultIndex={key === 0 ? [0] : []}
                  allowMultiple
                  key={index}
                >
                  <DishRow dish={dish} />
                </Accordion>
              )
            })}
            {key + 1 !== diet.length ? <Divider py={2} /> : null}
          </Stack>
        )
      })}
    </>
  )
}

export default DishColumn
