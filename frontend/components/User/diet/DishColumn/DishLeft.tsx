import React from "react"
import NextImg from "next/image"
import { Flex, Text, Image, Avatar } from "@chakra-ui/react"

interface DishLeftProps {
  imageData: string
  name: string
}

const DishLeft = ({ imageData, name }: DishLeftProps) => {
  return (
    <Flex w="300px" direction="column">
      <Text fontSize={24} fontWeight={600}>
        {name}
      </Text>
      <Avatar my={8} src={imageData} w="200px" h="200px" />
    </Flex>
  )
}

export default DishLeft
