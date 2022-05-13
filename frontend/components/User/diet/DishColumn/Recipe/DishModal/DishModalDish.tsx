import { Flex, Box, Text, CSSObject, Spinner, Image } from "@chakra-ui/react"
import React from "react"
import { getStrapiMedia } from "../../../../../../lib/media"
import { StrapiImage } from "../../../../../../lib/types/generalTypes"
import { Dish } from "../../../../../../lib/types/dietPage/dishTypes"

interface DishModalDishProps {
  onClose: () => void
  dish: Dish
  index: number
  handleClick: (newName: string) => void
  loading: boolean
}

interface ImgProps {
  image: StrapiImage
}
// ! TO CHANE
const Img = ({ image }: ImgProps) => {
  const fixHeight = (w: number, h: number) => {
    const ratio = w / h
    return { h: 150 / ratio, w: 150 }
  }
  const { alternativeText, formats } = image
  const { height, width, url } = formats.thumbnail
  const { w, h } = fixHeight(width, height)
  return (
    <Box w={w} h={h} overflow="hidden">
      <Image
        width={w}
        height={h}
        src={getStrapiMedia(url)}
        alt={alternativeText}
        loading="lazy"
      />
    </Box>
  )
}

const DishModalDish = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ dish, index, handleClick, loading }: DishModalDishProps, ref: any) => {
    const { description, name, image } = dish
    //  TODO add nice border and add event on focus

    const selectedStle: CSSObject = { borderColor: "red", outlineWidth: 0 }
    const hoverStyle: CSSObject = {
      ...selectedStle,
      backgroundColor: "gray.200",
    }
    return (
      <Flex
        mb={4}
        align="center"
        direction={["column", "column", "row"]}
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
        onClick={() => {
          handleClick(name)
        }}
        cursor={loading ? "not-allowed" : "pointer"}
        overflow="hidden"
        position="relative"
        opacity={loading ? "0.4" : 1}
      >
        <Flex
          w="100%"
          h="100%"
          position="absolute"
          bg="#fff"
          left="0"
          zIndex={20}
          display={loading ? "flex" : "none"}
          direction="column"
          justify="center"
          align="center"
        >
          <Spinner />
        </Flex>

        <Flex
          w={[300, 300, 150]}
          justify="center"
          align="center"
          pb={[4, 4, 0]}
        >
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
DishModalDish.displayName = "DishModalDish"
export default DishModalDish
