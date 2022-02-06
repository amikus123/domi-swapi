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

const s = {
  data: [
    {
      id: 2,
      attributes: {
        name: "Ćwiczenia",
        slug: "cwiczenia",
        description: "opis kategorii",
        createdAt: "2022-02-03T15:57:13.957Z",
        updatedAt: "2022-02-03T15:57:13.957Z",
      },
    },
    {
      id: 3,
      attributes: {
        name: "Zdrowie psychiczne",
        slug: "zdrowie-psychiczne",
        description: "adsadsad",
        createdAt: "2022-02-03T19:15:11.422Z",
        updatedAt: "2022-02-03T19:15:11.422Z",
      },
    },
  ],
}
