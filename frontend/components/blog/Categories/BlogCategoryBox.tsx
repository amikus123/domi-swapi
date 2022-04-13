import { Flex } from "@chakra-ui/react"
import React from "react"
import { BlogCategory } from "../../../lib/server/exampleData/blogCategories"
import ImageCard from "../../general/ImageCards/ImageCard"

interface BlogCategoryBoxProps {
  categories: Record<string, BlogCategory>
}

const BlogCategoryBox = ({ categories }: BlogCategoryBoxProps) => {
  return (
    <Flex>
      {Object.values(categories).map((item, index) => {
        const { image, name, slug } = item
        return (
          <ImageCard
            name={name}
            image={image}
            key={index}
            href={`/blog/${slug}`}
          />
        )
      })}
    </Flex>
  )
}

export default BlogCategoryBox
