import {
  IngredientPreferencesData,
  PreferedIngredientRequest,
  updateIngredientPreferencesRequest,
} from "../../../api/dbInteraction/PUT"
import { IngredientPreference, PreferedIngredient } from "../../../api/types"
import Dishingredients from "../Dishingredients"

export const resetIngredients = async (
  userDataId: number
): Promise<Boolean> => {
  const request = await updateIngredientPreferencesRequest({
    userDataId,
    data: [],
  })
  return request
}

interface UpdateIngredientsProps {
  userDataId: number
  data: Record<string, IngredientPreference>
}
export const updateIngredients = async ({
  data,
  userDataId,
}: UpdateIngredientsProps): Promise<Boolean> => {
  const compatibleData = makeDBcompatible(data)
  const request = await updateIngredientPreferencesRequest({
    userDataId,
    data: compatibleData,
  })

  return request
}

export const makeDBcompatible = (
  data: Record<string, IngredientPreference>
): IngredientPreferencesData[] => {
  const res: IngredientPreferencesData[] = []
  Object.keys(data).forEach((dishName) => {
    const dish = data[dishName]
    console.log(dish,"XDD")
    const a: IngredientPreferencesData = {
      dish: dish.id,
      preferredReplacements: getPreferedReplacements(dish.preferredIngredients),
    }
    res.push(a)
    // const a:IngredientPreferencesData ={dish:}
  })
  return res
}

const getPreferedReplacements = (
  replacements: PreferedIngredient[]
): PreferedIngredientRequest[] => {
  const res: PreferedIngredientRequest[] = replacements.map((item) => {
    const { originalName, preferredName } = item
    return {
      originalName,
      preferredName,
    }
  })

  return res
}
