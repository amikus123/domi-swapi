export interface PreferedIngredientRequest {
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
