import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

interface MyNextImageProps {
  image: any
}

// image is item data from alyouts

export const FullWidthImage = ({ image }: MyNextImageProps) => {
  const { url, alternativeText, width, height } = image

  // const loader = () => {+
  //   return getStrapiMedia(image)
  // }

  return (
    <div className="unset-img">

    <NextImage
      src={getStrapiMedia(url)}
      width="100%"
      height="100%"
      objectFit="contain"
      alt="Brand logo"
      layout="fill"
      className="custom-img"
    />
            </div>

  )
}

const MyNextImage = ({ image }: MyNextImageProps) => {
  const { url, alternativeText, width, height } = image

  // const loader = () => {+
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      src={getStrapiMedia(url)}
      width="100%"
      height="100%"
      objectFit="contain"
      alt="Brand logo"
      layout="fill"
      className="custom-img"
    />
  )
}

export default MyNextImage
