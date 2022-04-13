import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import BlogCategoryBox from "../../components/blog/Categories/BlogCategoryBox"
import { BlogCategory } from "../../lib/server/exampleData/blogCategories"
import { getBlogCategories } from "../../lib/server/fetching/serverSide"

interface IndexProps {
  categories: Record<string, BlogCategory>
}
const index = ({ categories }: IndexProps) => {
  // * should show all of categories, maybe best articles
  return (
    <Flex>
      {/* <Text>Wybierz kategorie</Text> */}
      <BlogCategoryBox categories={categories} />
    </Flex>
  )
}

export default index

export async function getStaticProps(ctx) {
  const categories = await getBlogCategories()
  return {
    props: { categories: categories },
  }
}
