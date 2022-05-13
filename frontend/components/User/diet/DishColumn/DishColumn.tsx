import { Accordion, Stack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { DietDay } from "../../../../lib/types/dietPage/dietTypes"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import DishColumnHeader from "./DishColumnHeader"
import DishRow from "./DishRow"

interface DishColumnProps {
  dishColumnData: DishColumnData[]
  days: DietDay[]
}

// * if we show more than one day, we hide all of them expect the fisrt

const renderContent = (
  dishColumnData: DishColumnData[],
  days: DietDay[]
): JSX.Element[] => {
  const res = []
  days.forEach((day, index) => {
    const data = dishColumnData[index]

    if (data !== undefined) {
      const { dishes } = data.fullDietDay
      const JSX = (
        <>
          {dishes.map((dish, index) => {
            return (
              <Accordion defaultIndex={[]} allowMultiple key={index}>
                <DishRow dishData={dish} />
              </Accordion>
            )
          })}
        </>
      )
      res.push(JSX)
    }
  })

  return res
}

const DishColumn = ({ dishColumnData, days }: DishColumnProps) => {
  const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>(
    renderContent(dishColumnData, days)
  )
  useEffect(() => {
    setRenderedComponents(renderContent(dishColumnData, days))
  }, [dishColumnData, days])
  return (
    <Stack spacing={12} w={[500, 700, 1000]} px={[0, 4, 10]} maxW="95vw">
      {dishColumnData.map((item, key) => {
        const { date, fullDietDay, dayId } = item
        const { kcalCount } = fullDietDay
        return (
          <Stack w="100%" key={key} spacing={4}>
            <DishColumnHeader date={date} kcalCount={kcalCount} />
            {renderedComponents[dayId]}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default DishColumn
