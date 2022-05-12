import React from "react"
import { Heading } from "@chakra-ui/react"

interface BMHeadingProps {
  children: any
  [x: string]: any
}
export const BMHeading1 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h1" size="2xl" {...props}>
      {children}
    </Heading>
  )
}

export const BMHeading2 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h2" size="xl" {...props}>
      {children}
    </Heading>
  )
}
export const BMHeading3 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h3" size="lg" {...props}>
      {children}
    </Heading>
  )
}
export const BMHeading4 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h4" size="md" {...props}>
      {children}
    </Heading>
  )
}
export const BMHeading5 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h5" size="sm" {...props}>
      {children}
    </Heading>
  )
}

export const BMHeading6 = ({ children, ...props }: BMHeadingProps) => {
  return (
    <Heading as="h6" size="xs" {...props}>
      {children}
    </Heading>
  )
}
