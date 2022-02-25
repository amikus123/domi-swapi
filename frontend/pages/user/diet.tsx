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
import { changeDishesIngredients } from "../../components/User/diet/api/dietState"
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
} from "../../components/User/diet/api/types"

export interface DateRangeNullable {
  start: Date
  end: Date | null
}

export interface DishColumnData {
  dietDay: DietDay
  date: Date
}

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

  const [dietData, setDietData] = useState<Diet>(diet)
  // * parse diet based on preferences

  // move to separate
  const [fullDietArr, setFullDietArr] = useState<DietDay[]>(
    getDietArr(dateRange, user.userDiet.diet.days)
  )

  const [dishes, setDishes] = useState(
    changeDishesIngredients(originalDishes, ingredientPreferences)
  )
  // useEffect(() => {
  //   setDishes(changeDishesIngredients(originalDishes, ingredientPreferences))
  // }, [ingredientPreferences, originalDishes])

  const filterHelper = (
    fShowRange: boolean,
    fDates: DateRangeNullable,
    fSingleDate: Date,
    fDateRange: DateRange,
    fFullDierArr: DietDay[]
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
    filterHelper(showRange, dates, singleDate, dateRange, fullDietArr)
  )

  useEffect(() => {
    setColumnData(
      filterHelper(showRange, dates, singleDate, dateRange, fullDietArr)
    )
  }, [singleDate, showRange, dates, dateRange, fullDietArr])

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <p>dishes</p>
      <pre>{JSON.stringify(dishes, null, 2)}</pre>
      <p>dietData</p>
      <pre>{JSON.stringify(dietData, null, 2)}</pre>
      <p>dishPreferences</p>
      <pre>{JSON.stringify(dishPreferences, null, 2)}</pre>
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
