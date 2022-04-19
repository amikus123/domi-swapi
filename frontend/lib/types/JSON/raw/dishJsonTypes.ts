import { GenericMetaData, ImageRaw } from "../../generalTypes"

// ! TAKE CARE OF DIET PAGES
export interface DishesJson {
  data: DishJson[]
  meta: GenericMetaData
}

export interface DishJson {
  id: number
  attributes: DishJsonAttributes
}

export interface DishJsonAttributes {
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  meal: string
  recipe: string
  description: string
  image: ImageRaw
  nutrients: NameAmountJson[]
  ingredients: IngredientJson[]
  dishPage: DishPageJson
}
export interface DishPageJson {
  data: null | string
}

export interface NameAmountJson {
  id: number
  name: string
  amount: string
}
export interface IngredientJson extends NameAmountJson {
  replacements: NameAmountJson[]
}
