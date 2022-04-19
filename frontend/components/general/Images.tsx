import { getStrapiMedia } from "../../lib/media"
import NextImage from "next/image"
import { Box, chakra, Image } from "@chakra-ui/react"
import { FormatImage, StrapiImage } from "../../lib/types/generalTypes"

export const getImageWithBestWidth = (
  formats: Record<string, FormatImage>,
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
  const { alternativeText = "", formats } = image

  return (
    <>
      {variant === "full" ? (
        <NextImage
          src={getStrapiMedia(getImageWithBestWidth(formats, idealWidth).url)}
          alt={alternativeText}
          layout="fill"
          aria-label={alternativeText}
          {...rest}
        />
      ) : variant === "fullH" ? (
        <Box className="fullHeightImageWrap" style={{ height: "100%" }}>
          <NextImage
            src={getStrapiMedia(
              getImageWithBestWidth(formats, idealHeight).url
            )}
            objectFit="contain"
            alt={alternativeText}
            layout="fill"
            className="fullHeightImage"
            aria-label={alternativeText}
            {...rest}
          />
        </Box>
      ) : (
        <BlogImg
          {...rest}
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
