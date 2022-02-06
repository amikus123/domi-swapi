import React from "react"
import { Heading } from "@chakra-ui/react"

interface BMHeadingProps {
  children: any
  [x: string]: any
}
const BMHeading = ({ children, ...props }: BMHeadingProps) => {
  return <Heading {...props}>{children}</Heading>
}

export default BMHeading
