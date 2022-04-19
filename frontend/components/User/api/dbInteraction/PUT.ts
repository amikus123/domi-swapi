import axios from "axios"
import { getApiUrl } from "../../../../lib/api"
import { DishPreferencesAPI, IngredientPreferencesAPI } from "../../../../lib/types/API/requestTypes"


export const updateDishPreferencesRequest = async ({
  userDataId,
  data,
}: DishPreferencesAPI): Promise<boolean> => {
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
}: IngredientPreferencesAPI): Promise<boolean> => {
  const url = `${getApiUrl()}/api/user-combined-datas/${userDataId}`
  const body = {
    data: {
      ingredientPreferences: data,
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
    console.error(e, "IngredientPreferencesAPI Error")
    return false
  }
}
