import { DishReplacement, FullDish } from "./dishTypes";

export interface DietDay {
  id: number
  uniqeDishDatas: DishUniqueData[]
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


export interface FullDietDay {
    dishes: FullDish[]
    kcalCount: number
  }