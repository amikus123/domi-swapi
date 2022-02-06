import React from "react"
import { Heading, Text, Box } from "@chakra-ui/react"

interface BMQuoteProps {
  children: any
  [x: string]: any
}
const BMQuote = ({ children, ...props }: BMQuoteProps) => {
  return (
    <Text as="blockquote" ml={4}  color="gray.600">
      {children}
    </Text>
  )
}

export default BMQuote
