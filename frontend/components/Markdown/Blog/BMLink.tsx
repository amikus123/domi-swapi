import React from "react"
import { Link } from "@chakra-ui/react"
import NextLink from "next/link"
interface BMHLinkProps {
  children: any;
  [x:string]:any
}
const BMLink = ({ children, ...props }: BMHLinkProps) => {
  return (
    <NextLink href={props.href} passHref>
      <Link {...props} color="blue.500"> {children}</Link>
    </NextLink>
  )
}

export default BMLink
