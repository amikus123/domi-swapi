import { Tag, HStack } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link"
import { BlogCategory } from "../../lib/types/JSON/parsed/parsedBlogs"
interface BlogTagsProps {
  blogCategories: BlogCategory[]
}
const BlogTags = ({ blogCategories }: BlogTagsProps) => {
  // link to page with blgos of thaht category
  return (
    <HStack
      spacing={0}
      wrap="wrap"
      align="flex-start"
      justify="flex-start"
      shouldWrapChildren={true}
      w="100%"
    >
      {blogCategories.map((item, index) => {
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
            <NextLink href={`/blog/${item.slug}`}>{item.name}</NextLink>
          </Tag>
        )
      })}
    </HStack>
  )
}

export default BlogTags
