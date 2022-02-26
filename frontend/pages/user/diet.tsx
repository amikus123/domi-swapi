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
  User,
  Dish,
  DateRange,
  DateRangeNullable,
  DishColumnData,
  FullDietDay,
  IngredientPreference,
  DishPreference,
} from "../../components/User/diet/api/types"

interface DietProps {
  user: User
  originalDishes: Record<string, Dish>
}

const DietComponent = ({ user, originalDishes }: DietProps) => {
  const { userDiet } = user
  const {
    diet,
    dishPreferences: originalDishPreferences,
    ingredientPreferences: originalIngredientPreferences,
  } = userDiet
  const { days, dishReplacements, name } = diet
  // * TIME STATE
  // * range of selected dates
  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })
  // * min and max date
  const [dateRange, setDateRange] = useState<DateRange>(datesFromUser(user))
  //* single selected Date
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  // * boolean to control wheather the calendar works on single or range of data
  const [showRange, setShowRange] = useState(false)

  // * USER PREFERENCES
  // * key is name of the dish, value contains array of prefference
  const [ingredientPreferences, setIngredientPreferences] = useState<
    Record<string, IngredientPreference>
  >(originalIngredientPreferences)

  // * key is the name of the dish, value contains  name of prefered dish
  const [dishPreferences, setDishPreferences] = useState<
    Record<string, DishPreference>
  >(originalDishPreferences)

  // * DISH STATE
  // * CHANGE DISHES STATE ON change of "ingredientPreferences"
  const [dishes, setDishes] = useState(
    changeDishesIngredients(originalDishes, ingredientPreferences)
  )
  useEffect(() => {
    setDishes(changeDishesIngredients(originalDishes, ingredientPreferences))
  }, [ingredientPreferences, originalDishes])

  // * DIET DAY FUNCITONS
  // * array of indexes for each day, index is index of diet day for N-th day
  // * this is not dependent on state
  const [indexesOfDays, setIndexesOfDays] = useState<number[]>(
    getDietArr(dateRange, days)
  )

  const [fullDietDays, setFullDietDays] = useState<FullDietDay[]>(
    changeDishesInDays(days, dishReplacements, dishPreferences, dishes)
  )
  useEffect(() => {
    const res = changeDishesInDays(
      days,
      dishReplacements,
      dishPreferences,
      dishes
    )
    console.log(res, "changeDishesInDays")
    setFullDietDays(res)
  }, [days, dishReplacements, dishPreferences, dishes])
  const [columnData, setColumData] = useState<DishColumnData[]>([])

  useEffect(() => {
    const newData = filterHelper(
      showRange,
      dates,
      singleDate,
      dateRange,
      indexesOfDays,
      fullDietDays
    )
    setColumData(newData)
    console.log(newData)
  }, [showRange, dates, singleDate, dateRange, indexesOfDays, fullDietDays])

  const filterHelper = (
    fShowRange: boolean,
    fDates: DateRangeNullable,
    fSingleDate: Date,
    fDateRange: DateRange,
    fIndexesOfDays: number[],
    fFullDietDays: FullDietDay[]
  ) => {
    if (fShowRange && fDates.end !== null) {
      return filterRange(
        fDates.start,
        fDates.end,
        fDateRange.end,
        fIndexesOfDays,
        fFullDietDays
      )
    } else if (fDates.end === null) {
      return filterSingleDay(
        fDates.start,
        fDateRange.end,
        fIndexesOfDays,
        fFullDietDays
      )
    } else {
      return filterSingleDay(
        fSingleDate,
        fDateRange.end,
        fIndexesOfDays,
        fFullDietDays
      )
    }
  }

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={dateRange}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      <DishColumn dishColumnData={columnData} />

      <Button>Pobierz</Button>
    </Stack>
  )
}

export default DietComponent

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const dishes = await getDishes(user, jwt)

  return {
    props: { user, originalDishes: dishes },
  }
}
