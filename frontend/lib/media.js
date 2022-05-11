import { getStrapiURL } from "./api"

export function getStrapiMedia(url) {
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  console.log("adsads",url,url.startsWith("/"),imageUrl,"XD")
  return imageUrl
}
