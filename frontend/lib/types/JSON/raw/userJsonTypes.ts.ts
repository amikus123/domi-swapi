
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
export interface UserDataJson {
  id: number
  age: number
}
export interface UserDietJson {
  id: number
  timeRange: TimeRangeJson
  diet: DietJsonWrap
}

export interface DietJsonWrap {
  data: {
    id: number
    attributes: DietJson
  }
}
export interface DietJson {
  createdAt: string
  updatedAt: string
  name: string
  dishReplacements: DishReplacementJson[]
  days: DayJson[]
}

export interface DishReplacementJson {
  id: number
  possibleReplacements: StubDishesWrapJson
  original: StubDishWrapJson
}
export interface DayJson {
  id: number
  dishes: StubDishesWrapJson
}
export interface TimeRangeJson {
  start: string
  end: string
  id: number
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

export interface DishPreferencesJson {
  id: number
  replacement: StubDishWrapJson
  base: StubDishWrapJson
}

export interface StubDishWrapJson {
  data: {
    id: number
    attributes: StubDishJson
  }
}

export interface StubDishesWrapJson {
  data: {
    id: number
    attributes: StubDishJson
  }[]
}

export interface StubDishJson {
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  meal: string
  recipe: string
  description: string
}
