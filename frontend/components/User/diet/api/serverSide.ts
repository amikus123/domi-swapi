import qs from "qs"
import { getApiUrl } from "../../../../lib/api"
import { uniqueDishHandler } from "./parseJSON/parseDishes"
import { handleUser } from "./parseJSON/parseUset"
import { User } from "./types"

export const fetchMe = async (jwt: string) => {
  const meResponse = await fetch(`${getApiUrl()}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const me = await meResponse.json()
  return me
}

export const getUser = async (jwt: string): Promise<User> => {
  const me = await fetchMe(jwt)
  const id = me.id
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
    `${getApiUrl()}/api/user-combined-datas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const temp = await userDiet.json()

  const raw = temp.data[0].attributes
  return handleUser(raw)
}

export const getDishes = async (user: User, jwt: string) => {
  const getIds = (user: User): number[] => {
    return Object.values(user.userDiet.uniqueDishes).map((i) => {
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
  const dishData = await dishRequest.json()
  return uniqueDishHandler(dishData)
}
