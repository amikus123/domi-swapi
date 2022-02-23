import { Stack, Button } from "@chakra-ui/react"
import {
  addDays,
  isAfter,
  isBefore,
  isSameDay,
  startOfToday,
  subDays,
} from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import { cloneDeep } from "lodash"
import { dietExample } from "../../components/User/diet/dummyData"
import { fetchAPI } from "../../lib/api"
import { parseCookies } from "nookies"
import qs from "qs"
import { fire, handleUser } from "../../lib/helpers/jsonToState"

export interface StartAndEndDate {
  start: Date
  end: Date
}
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

interface UserData {
  id: number
  age: number
}
interface IngredientPreference {}

interface IngredientPreferenceWrap {
  data: IngredientPreference[]
}
interface UserDiet {
  id: number
  ingredientPreferences: IngredientPreferenceWrap
}
interface kms {
  userId: number
  userData: UserData
  userDiet: UserDiet
}

const fixShit = (xd: any) => {
  // unpacking
  // docelowo arraty
  const ingredientPreferences = xd.userDiet.ingredientPreferences.data
  const res = {
    userId: xd.userId,
    userData: xd.userData,
  }

  return res
}

const diet = ({ raw, user }) => {
  const [dates, setDates] = useState<StartAndEndDate>({
    start: startOfToday(),
    end: startOfToday(),
  })
  const minMaxDate: StartAndEndDate = {
    start: subDays(startOfToday(), 4),
    end: addDays(startOfToday(), 4),
  }

  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [showRange, setShowRange] = useState(false)

  const [dietData, setDietData] = useState<SingleDietDayData[]>(dietExample)

  const filterDiet = (diets: SingleDietDayData[]): SingleDietDayData[] => {
    if (showRange) {
      const x = diets.filter((item) => {
        // filtering based on range, this handles edge cases (or at least it should)
        return (
          isSameDay(item.date, dates.start) ||
          (isAfter(item.date, dates.start) && isBefore(item.date, dates.end))
        )
      })
      console.log(x)
      return x
    } else {
      const x = diets.filter((item) => {
        return isSameDay(item.date, singleDate)
      })
      console.log(x, diets, singleDate)
      return x
    }
  }
  // const [dietData, setDietData] = useState<>([])
  // * date controls data passed to the next components

  const replaceIngredient = (indexes: ObjectFrontendIndexes) => {
    // *these are font end only, requesty to db has to use objects ids
    const { dayId, dishId, indgredientId, replacebleId } = indexes
    const stateCopy = cloneDeep(dietData)
    const replecable =
      stateCopy[dayId].dishes[dishId].indgredients[indgredientId]
    const ogAmount = replecable.amount
    const ogName = replecable.name
    const newName = replecable.replacements[replacebleId].name
    const newAmount = replecable.replacements[replacebleId].amount
    replecable.name = newName
    replecable.amount = newAmount
    replecable.replacements[replacebleId].amount = ogAmount
    replecable.replacements[replacebleId].name = ogName

    // * request to db  or sth
    setDietData(stateCopy)
  }

  useEffect(() => {
    console.log(fire())
  }, [])

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      {/* <pre>{JSON.stringify(diet, null, 2)}</pre>
      <p>XD</p> */}
      <pre>{JSON.stringify(raw, null, 2)}</pre>
      <p>sss</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={minMaxDate}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      <DishColumn
        diet={filterDiet(dietData)}
        replaceIngredient={replaceIngredient}
      />
      <Button>Pobierz</Button>
    </Stack>
  )
}

export default diet

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt

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
  console.log("!!!!\n", Object.keys(user), "XD")

  return {
    props: { raw, user },
  }
}
