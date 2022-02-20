import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Stack,
} from "@chakra-ui/react"
import React from "react"
import { DayData, DayDate, DishData } from "../../../../pages/user/diet"
import DishColumnHeader from "../DishRow/DishColumnHeader"
import DishRow from "../DishRow/DishRow"

interface DishColumnProps {
  data: DayData[]
}

// * if we show more than one day, we hide all of them expect the fisrt
const DishColumn = ({ data }: DishColumnProps) => {
  return (
    <>
      {data.map((item, key) => {
        return (
          <Stack w="100%" key={key}>
            <DishColumnHeader data={item.dayData} />

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
            {key + 1 !== data.length ? <Divider py={2} /> : null}
          </Stack>
        )
      })}
    </>
  )
}

export default DishColumn
