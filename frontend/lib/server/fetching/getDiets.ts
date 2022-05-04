import qs from "qs"
import { getApiUrl } from "../../api"
import { ParsedDiet, ParsedFullDiet } from "../../types/JSON/parsed/parsedDiets"
import { DietsFullJsonWrap } from "../../types/JSON/raw/dietJsonTypes"

import { handleDiets } from "../jsonParsers/parseDiets"
import { handleFullDiets } from "../jsonParsers/parseFullDiets"

// * fetches user Id from cookie
// * Fetches all diets

interface DietsFetchConfig {
  full: boolean
}
export const getDiets = async (
  config?: DietsFetchConfig
): Promise<Record<string, ParsedDiet>> => {
  const { full = false } = config
  const populateArr = ["dietImage"]
  if (full) {
    populateArr.push(
      "dishReplacements.original",
      "dishReplacements.possibleReplacements",
      "days",
      "days.dishes"
    )
  }
  const dishQuery = qs.stringify(
    {
      populate: populateArr,
    },
    {
      encodeValuesOnly: true,
    }
  )

  const dietsRequest = await fetch(`${getApiUrl()}/api/diets?${dishQuery}`, {})
  const dietsDataRaw = (await dietsRequest.json()) as DietsFullJsonWrap

  let diets: Record<string, ParsedDiet> | Record<string, ParsedFullDiet>
  if (full) {
    diets = handleFullDiets(dietsDataRaw)

    // parseFullDiets
  } else {
    diets = handleDiets(dietsDataRaw)
  }

  return diets
}
