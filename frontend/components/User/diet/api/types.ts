export type DishTimeCategory = "Obiad" | "Kolacja" | "Sniadanie"

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

// * user personal information, age height etc
export interface UserData {
  age: number
}

// * these string are in format YYYY-MM-DD
// * they show the days for which diet is prescribed
export interface TimeRange {
  start: string
  end: string
}

export interface DateRange {
  start: Date
  end: Date
}
// * if possible in diet, we should swap the dish for the preffered one
export interface DishPreference {
  id: number
  originalName: string
  preferedName: string
}

export interface UserDiet {
  ingredientPreferences: Record<string, IngredientPreference>
  dishPreferences: DishPreference[]
  timeRange: TimeRange
  diet: Diet
  uniqueDishes: Record<string, DishUniqueData>
}
export interface User {
  userId: number
  userData: UserData
  userDiet: UserDiet
}

export interface Ingredient extends NameAmount {
  replacements: NameAmount[]
  originalName: string
}
export interface NameAmount {
  name: string
  amount: string
}

export interface Dish {
  id: number
  name: string
  slug: string
  nutrients: NameAmount[]
  ingredients: Ingredient[]
  timeCategory: DishTimeCategory
  // * if it exists, create url to page
  dishPage: null | string
  // * image object, idk how to type it
  image: any
}
export interface DietDay {
  id: number
  uniqeDishDatas: DishUniqueData[]
}
export interface DishReplacement {
  // name of base dish
  original: string
  currrent: string
  replacements: string[]
}
export interface DishUniqueData {
  id: number
  name: string
  originalName: string
}
export interface Diet {
  name: string
  days: DietDay[]
  dishReplacements: Record<string, DishReplacement>
}

export interface DateRangeNullable {
  start: Date
  end: Date | null
}

export interface DishColumnData {
  fullDietDay: FullDietDay
  date: Date
}


export interface FullDish {
    dish: Dish
    replacements: Dish[]
    originalDishName: string
  }
export interface FullDietDay{
    dishes: FullDish[]

}