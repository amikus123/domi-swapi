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

const getDiets = async (
  config?: DietsFetchConfig
): Promise<Record<string, ParsedDiet> | Record<string, ParsedFullDiet>> => {
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

export const getFullDiets = async (): Promise<
  Record<string, ParsedFullDiet>
> => {
  const res = (await getDiets({ full: true })) as Record<string, ParsedFullDiet>
  return res
}

export const getPartialDiets = async (): Promise<
  Record<string, ParsedDiet>
> => {
  const res = (await getDiets({ full: false })) as Record<string, ParsedDiet>
  return res
}
