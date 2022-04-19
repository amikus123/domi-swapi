import { Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import { BlogCard } from "../../../lib/types/JSON/parsed/parsedBlogs"
import DietCard from "../DietCard/DietCard"

interface BlogCategoryBoxProps {
  categories: BlogCard[]
}

const BlogCategoryBox = ({ categories }: BlogCategoryBoxProps) => {
  return (
    <Wrap spacing="30px" py="20px" justify="center" height="fit-content">
      {categories.map((item, index) => {
        const { slug, description, image, title } = item
        return (
          <WrapItem key={index}>
            <DietCard
              image={image}
              name={title}
              slug={slug}
              description={description}
            />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

export default BlogCategoryBox
