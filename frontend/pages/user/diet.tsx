import { Stack, Button } from "@chakra-ui/react"
import { isAfter, isBefore, isSameDay, startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import qs from "qs"
import { cloneDeep } from "lodash"
import { dietExample } from "../../components/User/diet/dummyData"
import { fetchAPI } from "../../lib/api"
import { parseCookies } from "nookies"
import {
  DateRange,
  DietDay,
  handleUser,
  User,
} from "../../lib/helpers/jsonToState"
import {
  filterRange,
  filterSingleDay,
  getDietArr,
  stringToDate,
} from "../../lib/helpers/formating"
import { datesFromUser } from "../../components/User/diet/functions"

export interface Ingredient {
  name: string
  amount: string
}

export interface ReplecableIndegredient {
  name: string
  amount: string
  replacements?: Ingredient[]
}

export interface BaseDishData {
  name: string
  image: any
  description: any
}
export interface TrueDishData {
  category: string
  name: string
  imageData: any
  // markdown
  recipe: any
  replacements: BaseDishData[]
  indgredients: ReplecableIndegredient[]
  nutrients: Ingredient[]
  id: number
}
export interface SingleDietDayData {
  date: Date
  dishes: TrueDishData[]
  id: number
}

export interface ObjectFrontendIndexes {
  dayId?: number
  dishId?: number
  indgredientId?: number
  replacebleId?: number
}

interface DietProps {
  user: User
  raw: any
}
export interface DateRangeNullable {
  start: Date
  end: Date | null
}

const diet = ({ raw, user }: DietProps) => {
  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })
  //* edge dates
  const [dateRange, setDateRange] = useState<DateRange>(datesFromUser(user))
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [showRange, setShowRange] = useState(false)

  const [dietData, setDietData] = useState<SingleDietDayData[]>(dietExample)
  // move to separate
  const [fullDietArr, setFullDietArr] = useState<DietDay[]>(
    getDietArr(dateRange, user.userDiet.diet.days)
  )

  const filterHelper = (
    fShowRange: boolean,
    fDates: DateRangeNullable,
    fSingleDate: Date,
    fDateRange: DateRange,
    fFullDierArr: DietDay[]
  ) => {
    if (fShowRange && fDates.end !== null) {
      return filterRange(fDates.start, fDates.end, fDateRange.end, fFullDierArr)
    } else if (fDates.end === null) {
      return filterSingleDay(fDates.start, fDateRange.end, fFullDierArr)
    } else {
      return filterSingleDay(fSingleDate, fDateRange.end, fFullDierArr)
    }
  }

  const [filteredDietDays, setFilteredDietDays] = useState<DietDay[]>(
    filterHelper(showRange, dates, singleDate, dateRange, fullDietArr)
  )

  useEffect(() => {
    setFilteredDietDays(filterHelper(showRange,dates,singleDate,dateRange,fullDietArr))
  }, [singleDate,showRange,dates,dateRange,fullDietArr])

  useEffect(() => {
    console.log(fullDietArr, filteredDietDays, "XDED")
  }, [filteredDietDays])

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      {/* <pre>{JSON.stringify(diet, null, 2)}</pre>
      <p>XD</p> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <pre>{JSON.stringify(filteredDietDays, null, 2)}</pre>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={dateRange}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      {/* <DishColumn
        diet={filterDiet(dietData)}
        replaceIngredient={replaceIngredient}
      /> */}

      <Button>Pobierz</Button>
    </Stack>
  )
}

export default diet

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt

  //* from this call we receive id
  const userData = await fetchAPI(`/users/me`, {
    urlParamsObject: {
      populate: {
        populate: "*",
        role: {
          populate: "*",
        },
        userData: {
          populate: "*",
        },
      },
    },
    jwt,
  })

  const id = userData.id

  const query = qs.stringify(
    {
      populate: [
        "userData",
        "userDiet",
        "userDiet.diet",
        "userDiet.diet.days",
        "userDiet.diet.days.dishes",
        "userDiet.diet.days.dishes.image",
        "userDiet.diet.days.dishes.nutrients",
        "userDiet.diet.days.dishes.ingredients",
        "userDiet.diet.days.dishes.ingredients.replacements",
        "userDiet.diet.days.dishes.timeCategory",
        "userDiet.diet.days.dishes.dishPage",
        "userDiet.timeRange",
        "userDiet.dishPreferences",
        "userDiet.dishPreferences.original",
        "userDiet.dishPreferences.preferred",
        "userDiet.ingredientPreferences",
        "userDiet.ingredientPreferences.dish",
        "userDiet.ingredientPreferences.preferredIngredients",
      ],
      filters: {
        userId: {
          $eq: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  let userDiet = await fetch(
    `http://localhost:1337/api/user-combined-datas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const temp = await userDiet.json()

  const raw = temp.data[0].attributes
  const user = handleUser(raw)
  console.log("!!!!\n", user, "XD")

  return {
    props: { raw, user },
  }
}

// * date controls data passed to the next components
// const replaceIngredient = (indexes: ObjectFrontendIndexes) => {
//   const { dayId, dishId, indgredientId, replacebleId } = indexes
//   const stateCopy = cloneDeep(dietData)
//   const replecable =
//     stateCopy[dayId].dishes[dishId].indgredients[indgredientId]
//   const ogAmount = replecable.amount
//   const ogName = replecable.name
//   const newName = replecable.replacements[replacebleId].name
//   const newAmount = replecable.replacements[replacebleId].amount
//   replecable.name = newName
//   replecable.amount = newAmount
//   replecable.replacements[replacebleId].amount = ogAmount
//   replecable.replacements[replacebleId].name = ogName

//   setDietData(stateCopy)
// }
