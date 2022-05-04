import { GenericMetaData, ImageRaw } from "../../generalTypes"

export interface DietsFullJsonWrap {
  data: DietJsonData[]
  meta: GenericMetaData
}
export interface DietJsonData {
  id: number
  attributes: FullDietJson
}
export interface FullDietJson extends DietJson {
  dietDescription: string
  dietImage: ImageRaw
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

