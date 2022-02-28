import { Stack, Button, useControllableState } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import qs from "qs"
import { fetchAPI } from "../../lib/api"
import { parseCookies } from "nookies"
import { uniqueDishHandler } from "../../components/User/diet/api/parseJSON/parseDishes"
import { handleUser } from "../../components/User/diet/api/parseJSON/parseUset"
import { User, Dish } from "../../components/User/diet/api/types"

interface DietProps {
  raw: any
}

const diet = ({ raw }: DietProps) => {
  useEffect(() => {
    console.log(raw)
  }, [])
  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <pre>{JSON.stringify(raw, null, 2)}</pre>
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
  const user = {}

  // fetch dishes

  return {
    props: { raw },
  }
}
