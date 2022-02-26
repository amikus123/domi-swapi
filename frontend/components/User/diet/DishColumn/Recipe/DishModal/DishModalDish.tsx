import { Flex, Box, Text, Avatar, CSSObject } from "@chakra-ui/react"
import React from "react"
import { Dish } from "../../../api/types"
import NextImage from "next/image"
import { getStrapiMedia } from "../../../../../../lib/media"

interface DishModalDishProps {
  onClose: () => void
  dish: Dish
  index: number
  handleClick: (  newName: string) => void
}

interface ImgProps {
  image: any
}
const Img = ({ image }: ImgProps) => {
  const fixHeight = (w: number, h: number) => {
    const ratio = w / h
    return { h: 150 / ratio, w: 150 }
  }
  const attributes = image.data.attributes
  const { alternativeText, formats } = attributes
  const { height, width, url } = formats.thumbnail
  const { w, h } = fixHeight(width, height)
  return (
    <Box w={w} h={h} overflow="hidden">
      <NextImage
        width={w}
        height={h}
        src={getStrapiMedia(url)}
        alt={alternativeText}
      />
    </Box>
  )
}
const DishModalDish = React.forwardRef(
  ({ dish, onClose, index,handleClick }: DishModalDishProps, ref: any) => {
    let { description, name, image } = dish
    // add nice border and add event on focus
    description =
      "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "


    const selectedStle: CSSObject = { borderColor: "red", outlineWidth: 0 }
    const hoverStyle: CSSObject = {
      ...selectedStle,
      backgroundColor: "gray.200",
    }
    return (
      <Flex
        mb={4}
        align="center"
        tabIndex={index}
        border="1px"
        borderRadius="lg"
        p={4}
        transitionDuration="0.5s"
        borderColor="teal.400"
        _focus={selectedStle}
        _hover={hoverStyle}
        ref={ref}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleClick(name)
          }
        }}
        onClick={()=>{handleClick(name)}}
        cursor="pointer"
      >
        <Flex w="150px">
          <Img image={image} />
        </Flex>
        <Flex direction="column" px={4}>
          <Text fontWeight={500} fontSize={20} pb={2}>
            {name}
          </Text>
          <Text>{description}</Text>
        </Flex>
      </Flex>
    )
  }
)

export default DishModalDish
