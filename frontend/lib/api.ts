import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ""): string {
  return `${process.env.API_URL || "http://localhost:1337"}${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */

interface FetchApiProps{
  path:string;
  options?:FetchApiOptions
}
interface FetchApiOptions{
  headers?:Record<string,any>
  urlParamsObject?:Record<string,any>
  options?:Record<string,any>
  jwt?:string
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  headers = {},
  options = {}
) {
  // Merge default and user options

  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  }
  console.log(mergedOptions, "P")
  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`
  console.log(requestUrl, "red")
  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
