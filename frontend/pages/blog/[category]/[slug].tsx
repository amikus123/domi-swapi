import { Flex } from "@chakra-ui/react"
import React from "react"
import Blog from "../../../components/blog/Blog"
import { fetchAPI } from "../../../lib/api"
import {
  getBlogPost,
  getIdsOfBlogs,
} from "../../../lib/server/fetching/getBlogPost"
import { BlogPost } from "../../../lib/types/JSON/parsed/parsedBlogs"

interface BlogPostProps {
  category: string
  blogData: BlogPost
  blogIds: Record<number, boolean>
}
const article = ({ blogData, category, blogIds }: BlogPostProps) => {

  return (
    <Flex>
      <Blog data={blogData} category={category} blogIds={blogIds} />
    </Flex>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/blogs", {
    urlParamsObject: {
      fields: ["slug"],
      populate: {
        blogCategories: {
          populate: "",
        },
      },
      encodeValuesOnly: true,
    },
  })
  const fin = []
  // * to each blog post we generate paths based on categories
  // * for example if post has two categories, it generates 2 paths.
  articlesRes.data.forEach((article) => {
    const { slug, blogCategories } = article.attributes
    const listOfCategories = blogCategories.data
    listOfCategories.forEach((list) => {
      const { slug: category } = list.attributes
      fin.push({
        params: {
          slug,
          category,
        },
      })
    })
  })
  return {
    paths: fin,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blogData = await getBlogPost(params.slug)
  const  blogIds = await getIdsOfBlogs()

  return {
    props: { blogData, category: params.category, blogIds },
    revalidate: 1,
  }
}

export default article
