import { Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import { BlogCategoryDataCard } from "../../lib/types/JSON/parsed/parsedBlogs"
import DietCard from "../blog/DietCard/DietCard"

interface BlogCategoryBoxProps {
  categories: Record<string, BlogCategoryDataCard>
}

const DietPicker = ({ categories }: BlogCategoryBoxProps) => {
  return (
    <Wrap spacing="30px" py="20px" justify="center" height="fit-content">
      {Object.values(categories).map((item, index) => {
        const { image, title: name, description, slug } = item
        return (
          <WrapItem key={index}>
            <DietCard
              image={image}
              name={name}
              slug={slug}
              description={description}
            />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

export default DietPicker
