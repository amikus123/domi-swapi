import { Stack, Button } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import { parseCookies } from "nookies"

import { datesFromUser } from "../../components/User/diet/functions"
import { getUser, getDishes } from "../../components/User/diet/api/serverSide"
import {
  changeDishesInDays,
  changeDishesIngredients,
} from "../../components/User/diet/api/dietState"
import {
  getDietArr,
  filterRange,
  filterSingleDay,
} from "../../components/User/diet/api/timeHelpers"
import {
  DietDay,
  User,
  Dish,
  DateRange,
  Diet,
  DateRangeNullable,
  DishColumnData,
  FullDietDay,
} from "../../components/User/diet/api/types"

interface DietProps {
  user: User
  originalDishes: Record<string, Dish>
}

const diet = ({ user, originalDishes }: DietProps) => {
  const { userDiet } = user
  const { diet, dishPreferences, ingredientPreferences } = userDiet

  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })
  //* edge dates
  const [dateRange, setDateRange] = useState<DateRange>(datesFromUser(user))
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [showRange, setShowRange] = useState(false)

  const [dishes, setDishes] = useState(
    changeDishesIngredients(originalDishes, ingredientPreferences)
  )

  const [fullDietDays, setFullDietDays] = useState<FullDietDay[]>(
    changeDishesInDays(
      diet.days,
      diet.dishReplacements,
      dishPreferences,
      dishes
    )
  )

  const [allDietDays, setAllDietDays] = useState<FullDietDay[]>(
    getDietArr(dateRange, fullDietDays)
  )

  useEffect(() => {
    setDishes(changeDishesIngredients(originalDishes, ingredientPreferences))
  }, [ingredientPreferences, originalDishes])

  useEffect(() => {
    console.log(user, originalDishes, "XD")
  }, [])

  const filterHelper = (
    fShowRange: boolean,
    fDates: DateRangeNullable,
    fSingleDate: Date,
    fDateRange: DateRange,
    fFullDierArr: FullDietDay[]
  ) => {
    console.log("XDD")
    if (fShowRange && fDates.end !== null) {
      return filterRange(fDates.start, fDates.end, fDateRange.end, fFullDierArr)
    } else if (fDates.end === null) {
      return filterSingleDay(fDates.start, fDateRange.end, fFullDierArr)
    } else {
      return filterSingleDay(fSingleDate, fDateRange.end, fFullDierArr)
    }
  }

  const [columnData, setColumnData] = useState<DishColumnData[]>(
    filterHelper(showRange, dates, singleDate, dateRange, allDietDays)
  )

  useEffect(() => {
    setColumnData(
      filterHelper(showRange, dates, singleDate, dateRange, allDietDays)
    )
  }, [singleDate, showRange, dates, dateRange, allDietDays])

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <p>dietDays</p>
      <pre>{JSON.stringify(diet.days, null, 2)}</pre>
      <p>disRep</p>
      <pre>{JSON.stringify(diet.dishReplacements, null, 2)}</pre>
      <p>dishes</p>
      <pre>{JSON.stringify(dishes, null, 2)}</pre>
      <p>ingredientPreferences</p>
      <pre>{JSON.stringify(ingredientPreferences, null, 2)}</pre>

      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={dateRange}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      {/* <DishColumn dishColumnData={columnData} /> */}

      <Button>Pobierz</Button>
    </Stack>
  )
}

export default diet

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const dishes = await getDishes(user, jwt)

  return {
    props: { user, originalDishes: dishes },
  }
}
