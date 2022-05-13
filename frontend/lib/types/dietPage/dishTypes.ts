import { NameAmount, StrapiImage } from "../generalTypes"
import { FullDietDay } from "./dietTypes"

export interface Dish {
  id: number
  name: string
  slug: string
  nutrients: NameAmount[]
  ingredients: Ingredient[]
  timeCategory: string
  recipe: string
  description: string
  // * if it exists, create url to page
  dishPage: null | string
  // * image object, idk how to type it
  image: StrapiImage
}

export interface Ingredient extends NameAmount {
  //* name and amount shows current values of ingredient
  replacements: NameAmount[]
  originalName: string
}

export interface DishPreference {
  originalName: string
  preferedName: string
  id: number
}

export interface DishReplacement {
  // name of base dish
  original: string
  currrent: string
  replacements: string[]
}

export interface DishColumnData {
  fullDietDay: FullDietDay
  date: Date
  dayId: number
}

export interface FullDish {
  dish: Dish
  replacements: string[]
  originalDishName: string
}
