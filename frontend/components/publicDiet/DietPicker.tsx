import { Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import { BlogCategory } from "../../lib/server/exampleData/blogCategories"
import DietCard from "../blog/DietCard/DietCard"

interface BlogCategoryBoxProps {
  categories: Record<string, BlogCategory>
}

const DietPicker = ({ categories }: BlogCategoryBoxProps) => {
  return (
    <Wrap spacing="30px" py="20px" justify="center" height="fit-content">
      {Object.values(categories).map((item, index) => {
        const { image, name,  description } = item
        return (
          <WrapItem key={index}>
            <DietCard
              image={image}
              name={name}
              slug={"/s"}
              description={description}
            />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

export default DietPicker
