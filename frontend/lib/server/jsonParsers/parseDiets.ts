import { DietJsonInitial, ParsedDiet } from "../../types/JSON/parsed/parsedDiets"

export const handleDiets = (
  initial: DietJsonInitial,
): Record<string, ParsedDiet> => {
  const { data } = initial

  const res: Record<string, ParsedDiet> = {}
  data.map((item) => {
    const { attributes, id } = item
    const { dietImage, name, dietDescription } = attributes
    const diet: ParsedDiet = {
      dietImage,
      id,
      name,
      dietDescription,
    }
    res[name] = diet
  })
  return res
}

