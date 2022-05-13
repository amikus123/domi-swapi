import { Stack, Heading } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { Diet, FullDietDay } from "../../lib/types/dietPage/dietTypes"
import { Dish, DishColumnData } from "../../lib/types/dietPage/dishTypes"
import {
  DateRangeNullable,
  DateRange,
} from "../../lib/types/dietPage/timeTypes"
import { UserFullData } from "../../lib/types/dietPage/userTypes"
import { dishesState } from "../User/api/atoms/dishes"
import { dishPreferencesState } from "../User/api/atoms/dishPreferences"
import { ingredientPreferencesState } from "../User/api/atoms/IngredientPreferences"
import { isPublicState } from "../User/api/atoms/isPublic"
import { userIdsState } from "../User/api/atoms/userIds"
import {
  changeDishesIngredients,
  changeDishesInDays,
} from "../User/api/dietState"
import {
  getDietArr,
  filterRange,
  filterSingleDay,
} from "../User/api/timeHelpers"
import DietLoading from "../User/diet/DietLoading"
import DishColumn from "../User/diet/DishColumn/DishColumn"
import { noLimits, datesFromUser } from "../User/diet/functions"
import MyCalendar from "../User/diet/MyCalendar"
import PdfButton from "../User/diet/Pdf/PdfButton"

interface DietProps {
  user: UserFullData
  originalDishes: Record<string, Dish>
  isPagePublic: boolean
  diet: Diet
}

const DietControl = ({
  user,
  originalDishes,
  isPagePublic,
  diet,
}: DietProps) => {
  const {
    dishPreferences: originalDishPreferences,
    ingredientPreferences: originalIngredientPreferences,
    userId,
    userDataId,
  } = user
  const { days, dishReplacements } = diet
  //* STATE
  useEffect(() => {
    setUpdatedDays(false)
  }, [diet])

  const [updatedDays, setUpdatedDays] = useState(false)
  const setUserIds = useSetRecoilState(userIdsState)
  const [isPublic, setIsPublic] = useRecoilState(isPublicState)

  useEffect(() => {
    setIsPublic(isPagePublic)
  }, [isPagePublic])

  useEffect(() => {
    setUserIds({ userDataId, userId })
  }, [userDataId, userId])

  // * TIME STATE
  // * range of selected dates
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })

  useEffect(() => {
    setDates({ start: singleDate, end: singleDate })
  }, [singleDate])

  // * min and max date

  // * if public  we set to hardcoed high values
  // const [dateRange, setDateRange] = useState<DateRange>()
  const [dateRange, setDateRange] = useState<DateRange>(
    isPagePublic ? noLimits() : datesFromUser(user)
  )

  //* single selected Date
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
    setIndexesOfDays(
      getDietArr({ start: dateRange.start, end: dateRange.end }, days)
    )
  }, [days, dateRange.end, dateRange.start, getDietArr])

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

    setColumData(newData)
    setUpdatedDays(true)
    setGeneratedPdf(false)
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
      return filterRange(fDates.start, fDates.end, fFullDietDays)
    } else if (fDates.end === null) {
      return filterSingleDay(fDates.start, fFullDietDays)
    } else {
      return filterSingleDay(fSingleDate, fFullDietDays)
    }
  }

  const [generatedPdf, setGeneratedPdf] = useState(false)
  return (
    <Stack maxW="1000px" justify="center" align="center" spacing={16} pb={20}>
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
      updatedDays &&
      fullDietDays[0].dishes &&
      fullDietDays[0].dishes[0] &&
      fullDietDays[0].dishes[0].dish &&
      fullDietDays[0].dishes[0].dish.image ? (
        <>
          <DishColumn dishColumnData={columnData} days={fullDietDays} />
          <PdfButton
            dishColumnData={columnData}
            singleDate={singleDate}
            showRange={showRange}
            dates={dates}
            dietName={diet.name}
            days={fullDietDays}
            generatedPdf={generatedPdf}
            setGeneratedPdf={setGeneratedPdf}
          />
        </>
      ) : (
        <DietLoading />
      )}
    </Stack>
  )
}

export default DietControl
