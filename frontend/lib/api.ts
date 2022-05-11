import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = ""): string {
  console.log(process.env.API_URL, "API")
  return `${process.env.API_URL || "http://localhost:1337"}${path}`
}

export const getApiUrl = () => {
  return `${process.env.API_URL || "http://localhost:1337"}`
}
interface FetchApiOptions {
  headers?: Record<string, any>
  urlParamsObject?: Record<string, any>
  options?: Record<string, any>
  jwt?: string
}

export const fetchAPI = async (path: string, parmas: FetchApiOptions = {}) => {
  // Merge default and user options
  const { headers, jwt, options, urlParamsObject } = parmas
  const auth = jwt ? { Authorization: `Bearer ${jwt}` } : {}
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      ...auth,
      ...headers,
    },
    ...options,
  }
  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`
  // Trigger API call

  const response = await fetch(
    `${getApiUrl()}/api/blog-categories?${queryString}`,
    mergedOptions
  )
  console.log(requestUrl, "XDD")
  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error("An error occured please try again")
  }
  const data = await response.json()
  return data
}
