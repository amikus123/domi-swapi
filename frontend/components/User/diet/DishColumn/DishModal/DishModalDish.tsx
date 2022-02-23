import { Flex, Box, Text, Avatar, CSSObject } from "@chakra-ui/react"
import React from "react"
import { BaseDishData } from "../../../../../pages/user/diet"

const src = "/86400.jpg"

interface DishModalDishProps {
  index: number
  onClose: () => void
  data: BaseDishData
}
const DishModalDish = React.forwardRef(
  ({ index, onClose, data }: DishModalDishProps, ref: any) => {
    // add nice border and add event on focus
    const { description, image, name } = data
    const selectReplacement = () => {
      console.log("selected")
      onClose()
    }

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
            selectReplacement()
          }
        }}
        onClick={selectReplacement}
        cursor="pointer"
      >
        <Flex>
          <Avatar src={src} w={100} h={100} />
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
