import { DishUniqueData } from "../../types/dietPage/dietTypes"
import { ParsedFullDiet } from "../../types/JSON/parsed/parsedDiets"
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

