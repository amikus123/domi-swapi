import qs from "qs"
import { getApiUrl } from "../../api"
import { ParsedDiet } from "../../types/JSON/parsed/parsedDiets"


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

  const dietRequest = await fetch(`${getApiUrl()}/api/diets?${dishQuery}`, {})
  const dietDataRaw = await dietRequest.json()

  let dietData
  if (full) {
    dietData = handleFullDiets(dietDataRaw)

    // parseFullDiets
  } else {
    dietData = handleDiets(dietDataRaw)
  }

  return dietData
}

