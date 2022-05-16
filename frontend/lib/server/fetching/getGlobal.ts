import qs from "qs"
import { getApiUrl } from "../../api"
import { parseGlobalImage } from "../jsonParsers/parseGlobal"

export const getGlobal = async () => {
  const queryString = qs.stringify(
    {
      populate: ["favicon"],
      filters: {},
    },

    {
      encodeValuesOnly: true,
    }
  )

  const request = await fetch(`${getApiUrl()}/api/global?${queryString}`, {})
  const rawJSON = (await request.json())  
  const data = parseGlobalImage(rawJSON)
  return data
}
