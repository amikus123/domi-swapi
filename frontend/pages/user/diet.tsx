import { Stack, Heading } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import { parseCookies } from "nookies"

import { datesFromUser, noLimits } from "../../components/User/diet/functions"
import { getUser, getDishes } from "../../lib/server/fetching/serverSide"
import {
  changeDishesInDays,
  changeDishesIngredients,
} from "../../components/User/api/dietState"
import {
  getDietArr,
  filterRange,
  filterSingleDay,
} from "../../components/User/api/timeHelpers"
import {
  Dish,
  DateRange,
  DateRangeNullable,
  DishColumnData,
  FullDietDay,
  UserFullData,
  Diet,
} from "../../components/User/api/types"
import { useRecoilState } from "recoil"
import { ingredientPreferencesState } from "../../components/User/api/atoms/IngredientPreferences"
import { dishPreferencesState } from "../../components/User/api/atoms/dishPreferences"
import { dishesState } from "../../components/User/api/atoms/dishes"
import DietLoading from "../../components/User/diet/DietLoading"
import { userIdsState } from "../../components/User/api/atoms/userIds"
import PdfButton from "../../components/User/diet/Pdf/PdfButton"
import { isPublicState } from "../../components/User/api/atoms/isPublic"

interface DietProps {
  user: UserFullData
  originalDishes: Record<string, Dish>
  isPagePublic?: boolean
  diet: Diet
}

const DietComponent = ({
  user,
  originalDishes,
  isPagePublic = false,
  diet,
}: DietProps) => {
  const {
    dishPreferences: originalDishPreferences,
    ingredientPreferences: originalIngredientPreferences,
    userId,
    userDataId,
  } = user
  const { days, dishReplacements, name: dietName } = diet

  //* STATE
  const [userIds, setUserIds] = useRecoilState(userIdsState)
  const [isPublic, setIsPublic] = useRecoilState(isPublicState)

  useEffect(() => {
    setIsPublic(isPagePublic)
  }, [isPagePublic])

  useEffect(() => {
    setUserIds({ userDataId, userId })
  }, [userDataId, userId])

  // * TIME STATE
  // * range of selected dates
  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })
  // * min and max date


  // * if public  we set to hardcoed high values
  const [dateRange, setDateRange] = useState<DateRange>(
    isPublic ? noLimits() : datesFromUser(user)
  )
  //* single selected Date
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  // * boolean to control wheather the calendar works on single or range of data
  const [showRange, setShowRange] = useState(false)

  // * USER PREFERENCES
  // * key is name of the dish, value contains array of prefference

  const [ingredientPreferences, setIngredientPreferences] = useRecoilState(
    ingredientPreferencesState
  )
  useEffect(() => {
    setIngredientPreferences(originalIngredientPreferences)
    setDishPreferences(originalDishPreferences)
  }, [originalDishPreferences, originalIngredientPreferences])
  // * key is the name of the dish, value contains  name of prefered dish
  const [dishPreferences, setDishPreferences] =
    useRecoilState(dishPreferencesState)
  // * DISH STATE
  // * CHANGE DISHES STATE ON change of "ingredientPreferences"
  const [dishes, setDishes] = useRecoilState(dishesState)

  useEffect(() => {
    setDishes(changeDishesIngredients(originalDishes, ingredientPreferences))
  }, [ingredientPreferences, originalDishes])

  // * DIET DAY FUNCITONS
  // * array of indexes for each day, index is index of diet day for N-th day
  // * this is not dependent on state
  const [indexesOfDays, setIndexesOfDays] = useState<number[]>(
    getDietArr(dateRange, days)
  )
  useEffect(() => {
    setIndexesOfDays(getDietArr(dateRange, days))
  }, [days, dateRange])

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
    console.log(res, "asddsadsdsadsa")
    if (res.length > 0 && res[0].dishes !== undefined) {
      setFullDietDays(res)
    } else {
      console.error("should not fire")
    }
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
    console.log(newData, "NEW DATA", [
      showRange,
      dates,
      singleDate,
      dateRange,
      indexesOfDays,
      fullDietDays,
    ])
    setColumData(newData)
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
        fFullDietDays
      )
    } else if (fDates.end === null) {
      return filterSingleDay(
        fDates.start,
        fFullDietDays
      )
    } else {
      return filterSingleDay(
        fSingleDate,
        fFullDietDays
      )
    }
  }

  return (
    <Stack maxW="1000px" justify="center" align="center" spacing={16} pb={20}>
      <Heading mt={8} textAlign={["center", "center", "start"]}>
        Wybrana dieta: {dietName}
      </Heading>
      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={dateRange}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      {columnData.length > 0 &&
      columnData[0].fullDietDay.dishes[0].dish !== undefined ? (
        <>
          <DishColumn dishColumnData={columnData} />
          <PdfButton dishColumnData={columnData} />
        </>
      ) : (
        <DietLoading />
      )}
    </Stack>
  )
}

export default DietComponent

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const dishes = await getDishes(user, jwt)
  const diet = user.userDiet.diet
  return {
    props: { user, originalDishes: dishes, diet },
  }
}
