import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import React from "react"
import BlogCategoryBox from "../../components/blog/Categories/BlogCategoryBox"
import CategoryBreadcrumbs from "../../components/blog/Categories/CategoryBreadcrumbs"
import { BlogCategory } from "../../lib/server/exampleData/blogCategories"
import { getBlogCategories } from "../../lib/server/fetching/serverSide"

interface IndexProps {
  categories: Record<string, BlogCategory>
}
const index = ({ categories }: IndexProps) => {
  return (
    <>
      <Box alignSelf="flex-start">
        <CategoryBreadcrumbs
          links={[{ href: "/blog/", name: "Kategorie" }]}
        />
      </Box>
      <Flex grow={1} alignContent="center" direction="column" justify="center">
        <BlogCategoryBox categories={categories} />
      </Flex>
    </>
  )
}

export default index

export async function getStaticProps(ctx) {
  const categories = await getBlogCategories()
  return {
    props: { categories: categories },
  }
}
