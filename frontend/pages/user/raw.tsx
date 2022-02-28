import { Stack, Button, useControllableState } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import qs from "qs"
import { fetchAPI, getApiUrl } from "../../lib/api"
import { parseCookies } from "nookies"
import { getUser, getDishes } from "../../components/User/diet/api/serverSide"
import { useRecoilState } from "recoil"
import { dishPreferencesState } from "../../components/User/diet/api/atoms/dishPreferences"
import { ingredientPreferencesState } from "../../components/User/diet/api/atoms/IngredientPreferences"
import {
  DateRange,
  DateRangeNullable,
  Dish,
  FullDietDay,
  Ingredient,
  IngredientPreference,
  NameAmount,
  UserFullData,
} from "../../components/User/diet/api/types"
import { changeDishesInDays, changeDishesIngredients } from "../../components/User/diet/api/dietState"
import { startOfToday } from "date-fns"
import { datesFromUser } from "../../components/User/diet/functions"
import { getDietArr } from "../../components/User/diet/api/timeHelpers"

interface DietProps {
  raw: any
  user: UserFullData
  dishes: Record<string, Dish>
  rawDishes: any
}

const diet = ({ raw, user, dishes: originalDishes, rawDishes }: DietProps) => {
  const {
    userDiet,
    dishPreferences: originalDishPreferences,
    ingredientPreferences: originalIngredientPreferences,
    uniqueDishes,
    userId,
    userPersonalData,
  } = user
  const { diet } = userDiet
  const { days, dishReplacements, name } = diet

  const [dates, setDates] = useState<DateRangeNullable>({
    start: startOfToday(),
    end: startOfToday(),
  })
  const [dateRange, setDateRange] = useState<DateRange>(datesFromUser(user))
  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [showRange, setShowRange] = useState(false)

  const [ingredientPreferences, setIngredientPreferences] = useState(
    originalIngredientPreferences
  )

  const [dishPreferences, setDishPreferences] = useState(
    originalDishPreferences
  )

  const [dishes, setDishes] = useState(
    changeDishesIngredients(originalDishes, originalIngredientPreferences)
  )

  useEffect(() => {
    setDishes(changeDishesIngredients(originalDishes, ingredientPreferences))
    console.log(
      "SET",
      changeDishesIngredients(originalDishes, ingredientPreferences)
    )
  }, [ingredientPreferences, originalDishes])

  const [indexesOfDays, setIndexesOfDays] = useState<number[]>(
    getDietArr(dateRange, days)
  )

  const [fullDietDays, setFullDietDays] = useState<FullDietDay[]>(
    changeDishesInDays(days, dishReplacements, dishPreferences, dishes)
  )

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(raw, null, 2)}</pre> */}
      <pre>{JSON.stringify(dishReplacements, null, 2)}</pre>
      {/* <pre>{JSON.stringify(ingredientPreferences, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(dishPreferences, null, 2)}</pre> */}
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
        "userDiet.timeRange",
        "userDiet.diet.dishReplacements.original",
        "userDiet.diet.dishReplacements.possibleReplacements",
        "userDiet.diet.days",
        "userDiet.diet.days.dishes",
        "dishPreferences",
        "dishPreferences.base",
        "dishPreferences.replacement",
        "ingredientPreferences",
        "ingredientPreferences.dish",
        "ingredientPreferences.preferredReplacements",
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

  console.log(query, "QQQ")
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
  const user = await getUser(jwt)

  const getIds = (user: UserFullData): number[] => {
    return Object.values(user.uniqueDishes).map((i) => {
      return i.id
    })
  }
  const arr = getIds(user)

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

  const dishRequest = await fetch(`${getApiUrl()}/api/dishes?${dishQuery}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const rawDishes = await dishRequest.json()

  const dishes = await getDishes(user, jwt)

  // fetch dishes

  return {
    props: { raw, user, dishes, rawDishes },
  }
}
