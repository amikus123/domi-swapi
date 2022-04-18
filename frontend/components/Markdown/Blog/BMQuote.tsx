import React from "react"
import {  Text } from "@chakra-ui/react"

interface BMQuoteProps {
  children: any
  [x: string]: any
}
const BMQuote = ({ children}: BMQuoteProps) => {
  return (
    <Text as="blockquote" ml={4}  color="gray.600">
      {children}
    </Text>
  )
}

export default BMQuote
