import { PreferenceDishIds } from "../../../../../../lib/types/API/requestTypes"
import { DishPreference, Dish } from "../../../../../../lib/types/dietPage/dishTypes"
import { updateDishPreferencesRequest } from "../../../../api/dbInteraction/PUT"


export const resetDishPreferences = async (
  userDataId: number
): Promise<boolean> => {
  const request = await updateDishPreferencesRequest({
    userDataId,
    data: [],
  })
  return request
}

interface UpdateDishesProps {
  userDataId: number
  data: Record<string, DishPreference>
  dishes: Record<string, Dish>
}

export const updateDishes = async ({
  data,
  userDataId,
  dishes,
}: UpdateDishesProps): Promise<boolean> => {
  const compatibleData = makeDBcompatible(data, dishes)
  const request = await updateDishPreferencesRequest({
    userDataId,
    data: compatibleData,
  })

  return request
}

// ! use callback use memo

export const makeDBcompatible = (
  preferenceData: Record<string, DishPreference>,
  dishes: Record<string, Dish>
): PreferenceDishIds[] => {
  const res: PreferenceDishIds[] = []
  Object.keys(preferenceData).forEach((dishName) => {
    const dishPreferenceData = preferenceData[dishName]
    const { originalName, preferedName } = dishPreferenceData
    const a: PreferenceDishIds = {
      base: dishes[originalName].id,
      replacement: dishes[preferedName].id,
    }
    if (a.replacement !== undefined) {
      res.push(a)
    }
  })
  return res
}
