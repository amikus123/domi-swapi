import { Flex } from "@chakra-ui/react"
import React from "react"
import Blog from "../../../components/blog/Blog"
import { fetchAPI } from "../../../lib/api"
import { getBlogPost } from "../../../lib/server/fetching/serverSide"
import { BlogPost } from "../../../lib/server/jsonParsers/parseBlog"


interface BlogPostProps{
  category:string,
  blogData: BlogPost
}
const article = ({ blogData, category}:BlogPostProps) => {
  return (
    <Flex width="100%" mx="20" my={4}>
      <Blog data={blogData} category={category} />
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

// gets data for selected page
export async function getStaticProps({ params }) {
  // const blogData = await fetchAPI(`/blogs/`, {
  //   urlParamsObject: {
  //     filters: {
  //       slug: params.slug,
  //     },
  //     populate: {
  //       populate: "*",
  //       mainImage: {
  //         populate: "*",
  //       },
  //       cardData: {
  //         populate: "*",
  //         image: "*",
  //       },
  //       blogCategories: {
  //         populate: "",
  //       },
  //       content: {
  //         populate: {
  //           image: "*",
  //         },
  //       },
  //     },
  //     encodeValuesOnly: true,
  //   },
  // })
  const blogData = await getBlogPost(params.slug)
  return {
    props: { blogData, category: params.category},
    revalidate: 1,
  }
}

export default article
