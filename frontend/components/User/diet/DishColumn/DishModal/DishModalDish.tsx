import { Flex, Box, Text, Avatar } from "@chakra-ui/react"
import React from "react"

const src = "/86400.jpg"

interface DishModalDishProps {
  index: number
  onClose: () => void
}
const DishModalDish = React.forwardRef(
  ({ index, onClose }: DishModalDishProps, ref: any) => {
    // add nice border and add event on focus

    const selectReplacement = () => {
      console.log("selected")
      onClose()
    }
    return (
      <Flex
        mb={4}
        align="center"
        tabIndex={index}
        _focus={{ outline: "1px solid red" }}
        ref={ref}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            selectReplacement()
          }
        }}
        onClick={selectReplacement}
      >
        <Flex>
          <Avatar src={src} w={100} h={100} />
        </Flex>
        <Flex direction="column" px={4}>
          <Text fontWeight={500} fontSize={20} pb={2}>
            Jajecznica z jajkiem
          </Text>
          <Text>
            When the modal opens, focus is sent into the modal and set to the
            first tabbable element. If there are no tabbled elements, focus is
            set on ModalContent.
          </Text>
        </Flex>
      </Flex>
    )
  }
)

export default DishModalDish
