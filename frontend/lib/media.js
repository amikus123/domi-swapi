import { getStrapiURL } from "./api"

export function getStrapiMedia(url) {
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  console.log("adsads",url,imageUrl,"XD")
  return imageUrl
}
