import { getStrapiMedia } from "../../lib/media"
import NextImage from "next/image"
import { Box, chakra, Image } from "@chakra-ui/react"

export const getImageWithBestWidth = (
  formats: any,
  idealWidth = 1000
) => {
  // * gets  the  next biggest size
  const sizeNames = Object.keys(formats)
  let smallestDifference = 999999
  let smallestSize = formats[sizeNames[0]]
  sizeNames.forEach((sizeName) => {
    const item = formats[sizeName]
    const offset = item.width - idealWidth

    if (offset > 0 && offset < smallestDifference) {
      smallestDifference = offset
      smallestSize = item
    }
  })
  smallestSize =
    smallestDifference == 999999
      ? formats[sizeNames[sizeNames.length - 1]]
      : smallestSize
  return smallestSize
}
interface ImageProps {
  image: any
  idealWidth?: number
  idealHeight?: number
  variant?: "full" | "fullH" | "fullW"
  [key: string]: any
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
  const { alternativeText = "", formats } = image.data.attributes

  return (
    <>
      {variant === "full" ? (
        <NextImage
          src={getStrapiMedia(getImageWithBestWidth(formats, idealWidth).url)}
          alt={alternativeText}
          layout="fill"
          aria-label={alternativeText}
        />
      ) : variant === "fullH" ? (
        <Box
          className="fullHeightImageWrap"
          style={{ height: "100%" }}
          {...rest}
        >
          <NextImage
            src={getStrapiMedia(
              getImageWithBestWidth(formats, idealHeight).url
            )}
            objectFit="contain"
            alt={alternativeText}
            layout="fill"
            className="fullHeightImage"
            aria-label={alternativeText}
          />
        </Box>
      ) : (
        <BlogImg
          objectFit="contain"
          src={getStrapiMedia(getImageWithBestWidth(formats, idealWidth).url)}
          alt={alternativeText}
          layout="fill"
          className=""
          aria-label={alternativeText}
        />
      )}
    </>
  )
}
