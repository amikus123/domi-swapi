import { DishPreferencesJson, StubDishWrapJson, TimeRangeJson, DietJsonWrap } from "./dietJsonTypes";

export interface UserRequestDataJson{
  attributes:UserJson
  id:number
}
export interface UserJson {
  userId: number
  createdAt: string
  updatedAt: string
  userData: UserDataJson
  userDiet: UserDietJson
  dishPreferences: DishPreferencesJson[]
  ingredientPreferences: IngredientPreferenceJson[]
}

export interface PreferedIngredientReplacementJson {
  id: number
  originalName: string
  preferredName: string
}
export interface IngredientPreferenceJson {
  id: number
  preferredReplacements: PreferedIngredientReplacementJson[]
  dish: StubDishWrapJson
}

export interface UserDataJson {
  id: number
  age: number
}
export interface UserDietJson {
  id: number
  timeRange: TimeRangeJson
  diet: DietJsonWrap
}




