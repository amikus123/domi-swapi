import { getStrapiMedia } from "../../lib/media"
import NextImage from "next/image"

interface FullWidthImageProps {
  imageAttributes: any
  idealWidth?: number
  margin?: any
}
// image is item data from alyouts



export const getImageWithBestWidth = (formats: any,idealWidth:number=1000) => {
const sizeNames = Object.keys(formats)
  let smallestDifference = 999999
  let smallestSize = formats[sizeNames[0]]
  sizeNames.forEach((sizeName) => {
    const item = formats[sizeName]
    const offset = Math.abs(item.width - idealWidth)
    if (offset < smallestDifference) {
      smallestDifference = offset
      smallestSize = item
    }
  })
  return smallestSize
}


export const FullWidthImage = ({
  imageAttributes,
  idealWidth = 1000,
  margin = "1.5rem 0",
}: FullWidthImageProps) => {
  const { alternativeText, formats } = imageAttributes


  return (
    <div className="unset-img" style={{ margin: margin }}>
      <NextImage
        src={getStrapiMedia(getImageWithBestWidth(formats,idealWidth).url)}
        objectFit="contain"
        alt={alternativeText || ""}
        layout="fill"
        className="custom-img"
        aria-label={alternativeText || ""}
      />
    </div>
  )
}


interface StrapiImageProps {
  image: any
  idealWidth?: number
  margin?: any
  layout?:"fixed" | "fill" | "intrinsic" | "responsive"
} 


export const StrapiImage =  ({
  image,
  idealWidth = 1000,
  layout="fill"

}: StrapiImageProps) => {
  const { alternativeText, formats } = image.data.attributes
  return (
      <NextImage
        src={getStrapiMedia(getImageWithBestWidth(formats,idealWidth).url)}
        alt={alternativeText || ""}
        layout={layout}
        aria-label={alternativeText || ""}
      />
  )
}