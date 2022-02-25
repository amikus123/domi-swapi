import { Stack, Button } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import qs from "qs"
import { dietExample } from "../../components/User/diet/dummyData"
import { fetchAPI } from "../../lib/api"
import { parseCookies } from "nookies"
import {
  DateRange,
  Diet,
  DietDay,
  handleUser,
  User,
} from "../../lib/helpers/jsonToState"
import {
  filterRange,
  filterSingleDay,
  getDietArr,
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

export interface DishColumnData {
  dietDay: DietDay
  date: Date
}

const diet = ({ raw, user }: DietProps) => {
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
      <pre>{JSON.stringify(dietData, null, 2)}</pre>
      <pre>{JSON.stringify(dishPreferences, null, 2)}</pre>
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
      <DishColumn dishColumnData={columnData} />

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
        "userDiet.diet.dishReplacements",
        "userDiet.diet.dishReplacements.original",
        "userDiet.diet.dishReplacements.replacements",
        "userDiet.diet.days",
        "userDiet.diet.days.dishes",
        "userDiet.diet.days.dishes.image",
        "userDiet.diet.days.dishes.nutrients",
        "userDiet.diet.days.dishes.ingredients",
        "userDiet.diet.days.dishes.ingredients.replacements",
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
