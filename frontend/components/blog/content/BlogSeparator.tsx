import React from "react"
import { Box } from "@chakra-ui/react"

import { ChevronDownIcon } from "@chakra-ui/icons"

const BlogSeparator = () => {
  return (
    <Box
      w="100%"
      display="flex"
      align="center"
      justifyContent="center"
      pt="3rem"
      pb="3rem"
      mt="0!important"
      // _css={{ margin: "1.5rem 0 0 0 " }}
    >
      <Box>
        <ChevronDownIcon w={10} h={10} mx={4} />
        <ChevronDownIcon w={10} h={10} mx={4} />
        <ChevronDownIcon w={10} h={10} mx={4} />
      </Box>
    </Box>
  )
}

export default BlogSeparator
