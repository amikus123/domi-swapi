import { Diet, DishUniqueData } from "./dietTypes"
import { DishPreference } from "./dishTypes"
import { TimeRange } from "./timeTypes"

export interface UserIds {
  userId: number
  userDataId: number
}

// * user personal information, age height etc
export interface UserPersonalData {
  age: number
}

export interface UserDiet {
  timeRange: TimeRange
  diet: Diet
}

export interface UserFullData {
  userId: number
  userPersonalData: UserPersonalData
  userDiet: UserDiet
  uniqueDishes: Record<string, DishUniqueData>
  ingredientPreferences: Record<string, IngredientPreference>
  dishPreferences: Record<string, DishPreference>
  userDataId: number
}

// * user has array of these, dish name is name of the dish
// * for which prefered ingredienst should be applied
export interface IngredientPreference {
  id: number
  dishName: string
  preferredIngredients: PreferedIngredient[]
}

// * if possible we should swap original ingredient for the preferred one
export interface PreferedIngredient {
  id: number
  originalName: string
  preferredName: string
}
