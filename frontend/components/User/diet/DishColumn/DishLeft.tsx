import React from "react"
import NextImage from "next/image"
import { Flex, Box, Image } from "@chakra-ui/react"
import { getStrapiMedia } from "../../../../lib/media"
import { StrapiImage } from "../../../../lib/types/generalTypes"

interface DishLeftProps {
  image: StrapiImage
}

const fixHeight = (w: number, h: number) => {
  const ratio = w / h
  //* w 100 h 300  1/3
  return { h: 200, w: 200 * ratio }
}
const DishLeft = ({ image }: DishLeftProps) => {
  const { alternativeText, formats } = image
  const { height, width, url } = formats.small
  const { w, h } = fixHeight(width, height)
  return (
    <Flex
      w={["100%", "100%", "300px"]}
      direction="column"
      justify="center"
      align="center"
      pt={[0, 0, 12]}
      py={[6, 6, 0]}
    >
      <Box w={w} h={h} overflow="hidden">
        <Image src={getStrapiMedia(url)} alt={alternativeText} />
        {/* <NextImage
          width={w}
          height={h}
          src={getStrapiMedia(url)}
          alt={alternativeText}
        /> */}
      </Box>
    </Flex>
  )
}

export default DishLeft
