import { Tag, HStack, Text } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"
interface BlogTagsProps {
  blogCategories: any
  pt?:any
}
const BlogTags = ({ blogCategories ,pt=4}: BlogTagsProps) => {
  // link to page with blgos of thaht category
  return (
    <HStack
      spacing={0}
      wrap="wrap"
      align="flex-start"
      justify="flex-start"
      shouldWrapChildren={true}
      w="100%"
      pt={pt}
    >
      {blogCategories.data.map((item, index) => {
        return (
          <Tag
            size="lg"
            key={index}
            variant="solid"
            borderRadius="full"
            colorScheme="green"
            my={1}
            mr={1}
          >
            <NextLink href="#">{item.attributes.name}</NextLink>
          </Tag>
        )
      })}
    </HStack>
  )
}

export default BlogTags

