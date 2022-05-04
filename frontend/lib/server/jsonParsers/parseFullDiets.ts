import { DishUniqueData } from "../../types/dietPage/dietTypes"
import { ParsedFullDiet } from "../../types/JSON/parsed/parsedDiets"
import { DietsFullJsonWrap } from "../../types/JSON/raw/dietJsonTypes"
import { handleImage } from "./parseImage"
import { handleDietDays, handleDishReplacements } from "./parseUset"

export const handleFullDiets = (
  initial: DietsFullJsonWrap
): Record<string, ParsedFullDiet> => {
  const { data } = initial

  const res: Record<string, ParsedFullDiet> = {}
  const uniqueDishes: Record<string, DishUniqueData> = {}

  data.forEach((item) => {
    const { attributes, id } = item
    const { dietImage, name, dietDescription, dishReplacements, days } =
      attributes
    const diet: ParsedFullDiet = {
      dietImage : handleImage(dietImage),
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
