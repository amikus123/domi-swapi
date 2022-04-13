import qs from "qs"
import { getApiUrl } from "../../api"

import { uniqueDishHandler } from "../jsonParsers/parseDishes"
import { UserFullData } from "../../../components/User/api/types"
import { ParsedDiet, handleDiets } from "../jsonParsers/parseDiets"
import { handleUser } from "../jsonParsers/parseUset"
import { handleBlogCategories } from "../jsonParsers/parseDietCategories"
import { BlogCategory } from "../exampleData/blogCategories"

// * fetches user Id from cookie
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

// * gets user dishes from user object
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

// * Fetches all diets
export const getDiets = async (): Promise<Record<string, ParsedDiet>> => {
  const dishQuery = qs.stringify(
    {
      populate: ["dietImage"],
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

export const getBlogCategories = async (): Promise< Record<string, BlogCategory>> => {
  const dishQuery = qs.stringify(
    {
      populate: ["image"],
    },
    {
      encodeValuesOnly: true,
    }
  )

  const blogCategoriesRequest = await fetch(
    `${getApiUrl()}/api/blog-categories?${dishQuery}`,
    {}
  )
  const blogCategoriesRaw = await blogCategoriesRequest.json()
  const blogCategories = handleBlogCategories(blogCategoriesRaw)
  return  blogCategories 
}
