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
import {
  fetchMe,
  getDishes,
  getUser,
} from "../../components/User/diet/api/serverSide"

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
  dishes: Record<string, Dish>
}
export interface DateRangeNullable {
  start: Date
  end: Date | null
}

export interface DishColumnData {
  dietDay: DietDay
  date: Date
}

const diet = ({ user, dishes }: DietProps) => {
  useEffect(() => {
    console.log(dishes)
    console.log(user)
  }, [])
  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <pre>{JSON.stringify(dishes, null, 2)}</pre>
    </Stack>
  )
}

export default diet

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const dishes = await getDishes(user, jwt)

  return {
    props: { user, dishes },
  }
}
