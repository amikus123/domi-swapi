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
    console.log(user.userDiet.diet.days[0].dishes[0],"lul")
    console.log(user.userDiet.diet.days[0].dishes[1],"lul")

    console.log(raw,"lu2l")

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
  // "timeCategory": {
  //   "data": {
  //     "id": 2,
  //     "attributes": {
  //       "name": "Obiad",
  //       "createdAt": "2022-02-22T13:23:00.700Z",
  //       "updatedAt": "2022-02-22T13:23:00.700Z"
  //     }
  //   }
  // },

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

const xd = [
  {
    id: 3,
    dishes: {
      data: [
        {
          id: 1,
          attributes: {
            name: "Spaghetti",
            createdAt: "2022-02-22T13:38:04.474Z",
            updatedAt: "2022-02-22T13:52:36.475Z",
            slug: null,
            nutrients: [
              {
                id: 1,
                name: "Kalorie",
                amount: "300 kcal",
              },
              {
                id: 2,
                name: "Białko",
                amount: "20g",
              },
              {
                id: 3,
                name: "Tłuszcz",
                amount: "10g",
              },
              {
                id: 4,
                name: "Witamina A",
                amount: "10ug",
              },
            ],
            ingredients: [
              {
                id: 2,
                name: "Makaron",
                amount: "100g",
                replacements: [
                  {
                    id: 8,
                    name: "Makaron rurki",
                    amount: "100g",
                  },
                  {
                    id: 9,
                    name: "Makaron spaghtetii",
                    amount: "100g",
                  },
                ],
              },
              {
                id: 1,
                name: "Sos pomidorowy",
                amount: "100g",
                replacements: [],
              },
              {
                id: 3,
                name: "Oregano",
                amount: "10g",
                replacements: [
                  {
                    id: 10,
                    name: "Curry",
                    amount: "10g",
                  },
                ],
              },
            ],
            timeCategory: {
              data: null,
            },
          },
        },
        {
          id: 2,
          attributes: {
            name: "Jajecznica",
            createdAt: "2022-02-22T13:49:30.901Z",
            updatedAt: "2022-02-22T13:53:30.242Z",
            slug: null,
            nutrients: [
              {
                id: 11,
                name: "Kalorie",
                amount: "100 kcal",
              },
            ],
            ingredients: [
              {
                id: 4,
                name: "Jaja kurze",
                amount: "3 jaja",
                replacements: [
                  {
                    id: 14,
                    name: "Jaja gęsie",
                    amount: "3",
                  },
                ],
              },
              {
                id: 5,
                name: "Olej",
                amount: "1 łyżka",
                replacements: [
                  {
                    id: 15,
                    name: "Oliwa",
                    amount: "1 łyżka",
                  },
                ],
              },
            ],
            timeCategory: {
              data: null,
            },
          },
        },
      ],
    },
  },
]
