import { Flex, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { InputTextData } from "../InputColumn"

interface InputItemProps {
  textData: InputTextData
  children: React.ReactNode
}

const InputItem = ({ children, textData }: InputItemProps) => {
  const { end, start } = textData
  return (
    <HStack w="100%">
      <Text textAlign="right" w={100} mr={4}>
        {start}
      </Text>
      {children}
      <Text   pl={2}>{end}</Text>
    </HStack>
  )
}

export default InputItem
