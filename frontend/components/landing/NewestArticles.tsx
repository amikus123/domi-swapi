import { Flex, Wrap, WrapItem, Heading } from "@chakra-ui/react"
import React from "react"
import { BlogCardFull } from "../../lib/types/JSON/parsed/parsedBlogs"
import DietCard from "../blog/DietCard/DietCard"

interface NewestArticlesProps {
  cards: BlogCardFull[]
}

const NewestArticles = ({ cards }: NewestArticlesProps) => {
  return (
    <Flex grow={1} alignContent="center" direction="column" justify="center">
      <Heading as={"h2"} fontSize={"4xl"} pb={4} textAlign="center">
        Najnowsze artykuły
      </Heading>
      <Wrap spacing="40px" py="20" justify="center" height="fit-content">
        {cards.map((item, index) => {
          const { slug, description, image, title ,blogCategories} = item
          return (
            <WrapItem key={index}>
              <DietCard
                image={image.image}
                name={title}
                slug={slug}
                description={description}
                blogCategories={blogCategories}
              />
            </WrapItem>
          )
        })}
      </Wrap>
    </Flex>
  )
}

export default NewestArticles
