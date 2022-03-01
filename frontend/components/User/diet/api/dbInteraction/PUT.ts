import axios from "axios"
import { getApiUrl } from "../../../../../lib/api"


export interface PreferedIngredientRequest{
  originalName: string
  preferredName: string
}
export interface UserDataRequestData {
  userDataId: number
}

export interface PreferenceDishIds {
  base: number
  replacement: number
}

export interface IngredientPreferencesData {
  dish: number
  preferredReplacements: PreferedIngredientRequest[]
}

export interface DishPreferencesAPI extends UserDataRequestData {
  data: PreferenceDishIds[]
}
export interface IngredientPreferencesAPI extends UserDataRequestData {
  data: IngredientPreferencesData[]
}

export const updateDishPreferencesRequest = async ({
  userDataId,
  data,
}: DishPreferencesAPI): Promise<Boolean> => {
  const url = `${getApiUrl()}/api/user-combined-datas/${userDataId}`
  const body = {
    data: {
      dishPreferences: data,
    },
  }
  try {
    await axios({
      method: "PUT",
      url: url,
      data: body,
    })
    return true
  } catch (e) {
    console.error(e, "removePreferenceBack Error")

    return false
  }
}

export const updateIngredientPreferencesRequest = async ({
  userDataId,
  data,
}: IngredientPreferencesAPI): Promise<Boolean> => {
  const url = `${getApiUrl()}/api/user-combined-datas/${userDataId}`
  
  const body = {
    data: {
      ingredientPreferences: data,
    },
  }
  console.log(body,"XDDD")
  try {
    await axios({
      method: "PUT",
      url: url,
      data: body,
    })
    return true
  } catch (e) {
    console.error(e, "IngredientPreferencesAPI Error")
    return false
  }
}
