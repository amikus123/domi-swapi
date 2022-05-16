import { getApiUrl } from "../../api"
import { UserFullData } from "../../types/dietPage/userTypes"
import { uniqueDishHandler } from "../jsonParsers/parseDishes"
import qs from "qs"

export const getAllDishes = async () => {
  const dishQuery = qs.stringify(
    {      pagination: {
      page: 1,
      pageSize: 40,
    },
      populate: [
        "image",
        "nutrients",
        "ingredients",
        "ingredients.replacements",
        "dishPage",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  )

  const dishRequest = await fetch(`${getApiUrl()}/api/dishes?${dishQuery}`)
  const dishData = await dishRequest.json()
  return uniqueDishHandler(dishData)
}

// * gets user dishes from user object
export const getDishes = async (user: UserFullData, jwt: string) => {
  const getIds = (user: UserFullData): number[] => {
    return Object.values(user.uniqueDishes).map((i) => {
      return i.id
    })
  }
  const arr = getIds(user)

  const dishQuery = qs.stringify(
    {      pagination: {
      page: 1,
      pageSize: 40,
    },
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
