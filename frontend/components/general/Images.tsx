import { getStrapiMedia } from "../../lib/media"
import { chakra, Image } from "@chakra-ui/react"
import { StrapiImage } from "../../lib/types/generalTypes"

const getBestImage = (
  image: StrapiImage,
  dimension: "width" | "height",
  idealDimension = 1000
) => {
  // * gets  the  next biggest size
  const { formats, url } = image

  if (formats == null) {
    return url
  }
  const sizeNames = Object.keys(formats)
  let smallestDifference = 999999
  let smallestSize = formats[sizeNames[0]]
  sizeNames.forEach((sizeName) => {
    const item = formats[sizeName]
    const imageSize = dimension === "height" ? item.height : item.width
    const offset = imageSize - idealDimension
    if (Math.abs(offset) < Math.abs(smallestDifference)) {
      smallestDifference = offset
      smallestSize = item
    }
  })
  smallestSize =
    smallestDifference == 999999
      ? formats[sizeNames[sizeNames.length - 1]]
      : smallestSize

  return smallestSize.url
}

interface ImageProps {
  image: StrapiImage
  idealWidth?: number
  idealHeight?: number
  variant?: "full" | "fullH" | "fullW"
  [key: string]: string | number | StrapiImage
}

const BlogImg = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["height", "width", "quality", "src", "alt"].includes(prop),
})

export const MyImage = ({
  image,
  idealWidth = 1000,
  idealHeight = 1000,
  variant,
  ...rest
}: ImageProps) => {
  const { alternativeText = "" } = image

  return (
    <>
      {variant === "full" ? (
        <BlogImg
          alt={alternativeText}
          src={getStrapiMedia(getBestImage(image, "width", idealWidth))}
          layout="fill"
          aria-label={alternativeText}
          {...rest}
          lazy
        />
      ) : variant === "fullH" ? (
        <BlogImg
          src={getStrapiMedia(getBestImage(image, "height", idealHeight))}
          alt={alternativeText}
          m="0 auto"
          height={"inherit"}
          aria-label={alternativeText}
          {...rest}
          lazy
        />
      ) : (
        <>
          <BlogImg
            {...rest}
            objectFit="contain"
            // maxH={idealHeight}
            w="100%"
            height="inherit"
            src={getStrapiMedia(getBestImage(image, "width", idealWidth))}
            alt={alternativeText}
            layout="fill"
            className=""
            aria-label={alternativeText}
          />
        </>
      )}
    </>
  )
}
