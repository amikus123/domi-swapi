import { Stack, Button, useControllableState } from "@chakra-ui/react"
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
import { number } from "yup"
import { Dish, uniqueDishHandler } from "../../lib/helpers/copy"

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
  dishData: any
  dishesData: Record<string, Dish>
}
export interface DateRangeNullable {
  start: Date
  end: Date | null
}

export interface DishColumnData {
  dietDay: DietDay
  date: Date
}

const diet = ({ raw, user, dishData, dishesData }: DietProps) => {
  useEffect(() => {
    console.log(raw)
    console.log(user)
    console.log(dishData)
    console.log(dishesData)
  }, [])
  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <pre>{JSON.stringify(dishesData, null, 2)}</pre>

      <pre>{JSON.stringify(dishData, null, 2)}</pre>

      <pre>{JSON.stringify(raw, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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

  //* getting uniqueDishesId
  const arr = (user: User): number[] => {
    return Object.values(user.userDiet.uniqueDishes).map((i) => {
      return i.id
    })
  }

  // fetch dishes
  const dishQuery = qs.stringify(
    {
      populate: [
        "image",
        "nutrients",
        "ingredients",
        "ingredients.replacements",
        "dishPage",
      ],
      filters: {
        id: {
          $in: arr,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const dishRequest = await fetch(
    `http://localhost:1337/api/dishes?${dishQuery}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const dishData = await dishRequest.json()
  const dishesData = uniqueDishHandler(dishData)
  return {
    props: { raw, user, dishData, dishesData },
  }
}
