import {
  DietDay,
  DishReplacement,
  DishUniqueData,
} from "../../../components/User/api/types"
import { handleDietDays, handleDishReplacements } from "./parseUset"

export const handleFullDiets = (
  initial: any
): Record<string, ParsedFullDiet> => {
  const { data } = initial

  const res: Record<string, ParsedFullDiet> = {}
  const uniqueDishes: Record<string, DishUniqueData> = {}

  data.map((item) => {
    const { attributes, id } = item
    const { dietImage, name, dietDescription, dishReplacements, days } =
      attributes
    const diet: ParsedFullDiet = {
      dietImage,
      id,
      name,
      dietDescription,
      days: handleDietDays(days, uniqueDishes),
      dishReplacements: handleDishReplacements(dishReplacements, uniqueDishes),
    }
    res[name] = diet
  })
  return res
}

export interface DietFullJsonInitial {
  data: DietFullJson[]
}
export interface DietFullJson {
  id: number
  attributes: {
    name: string
    dietImage: any
    dietDescription: string
  }
}
export interface ParsedFullDiet {
  id: number
  name: string
  dietImage: any
  dietDescription: string
  days: DietDay[]
  dishReplacements: Record<string, DishReplacement>
}

