import {
  IngredientPreferencesData,
  PreferedIngredientRequest,
  updateIngredientPreferencesRequest,
} from "../../../api/dbInteraction/PUT"
import {
  Dish,
  IngredientPreference,
  PreferedIngredient,
} from "../../../api/types"

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
  dishes: Record<string, Dish>
}
export const updateIngredients = async ({
  data,
  userDataId,
  dishes,
}: UpdateIngredientsProps): Promise<Boolean> => {
  const compatibleData = makeDBcompatible(data, dishes)
  console.log(compatibleData, userDataId, "XDD")
  const request = await updateIngredientPreferencesRequest({
    userDataId,
    data: compatibleData,
  })

  return request
}

export const makeDBcompatible = (
  preferenceData: Record<string, IngredientPreference>,
  dishes: Record<string, Dish>
): IngredientPreferencesData[] => {
  const res: IngredientPreferencesData[] = []
  Object.keys(preferenceData).forEach((dishName) => {
    const dishPreferenceData = preferenceData[dishName]
    const dish = dishes[dishName]
    const a: IngredientPreferencesData = {
      dish: dish.id,
      preferredReplacements: getPreferedReplacements(
        dishPreferenceData.preferredIngredients
      ),
    }
    if (a.preferredReplacements.length !== 0) {
      res.push(a)
    }
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
