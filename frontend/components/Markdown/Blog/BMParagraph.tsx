import React from "react"
import { Text } from "@chakra-ui/react"

interface BMParagraphProps {
  children: any
  [x: string]: any
}
const BMParagraph = ({ children, ...props }: BMParagraphProps) => {
  return <Text {...props}>{children}</Text>
}

export default BMParagraph
