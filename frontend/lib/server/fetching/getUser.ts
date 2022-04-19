import qs from "qs"
import { getApiUrl } from "../../api"
import { UserFullData } from "../../types/dietPage/userTypes"
import { handleUser } from "../jsonParsers/parseUset"

export const fetchMe = async (jwt: string) => {
    const meResponse = await fetch(`${getApiUrl()}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const me = await meResponse.json()
    return me
  }
  
  // * fetches user Data, including date
  
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
  
    const userDiet = await fetch(
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