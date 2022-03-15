import qs from "qs"
import { getApiUrl } from "../../../lib/api"
import { handleDiets } from "./parseJSON/parseDiets"
import { uniqueDishHandler } from "./parseJSON/parseDishes"
import { handleUser } from "./parseJSON/parseUset"
import { UserFullData } from "./types"

export const fetchMe = async (jwt: string) => {
  const meResponse = await fetch(`${getApiUrl()}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const me = await meResponse.json()
  return me
}

export const getUser = async (jwt: string): Promise<UserFullData> => {
  const me = await fetchMe(jwt)
  const id = me.id
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

  let userDiet = await fetch(
    `${getApiUrl()}/api/user-combined-datas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const temp = await userDiet.json()

  const raw = temp.data[0]
  return handleUser(raw)
}

export const getDishes = async (user: UserFullData, jwt: string) => {
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
  const dishData = await dishRequest.json()
  return uniqueDishHandler(dishData)
}

export const getDiets = async () => {
  const dishQuery = qs.stringify(
    {
      populate: [
        "dietImage"
      ],
    },
    {
      encodeValuesOnly: true,
    }
  )

  const dietRequest = await fetch(`${getApiUrl()}/api/diets?${dishQuery}`, {})
  const dietDataRaw = await dietRequest.json()
  const dietData = handleDiets(dietDataRaw)

  return dietData
}
