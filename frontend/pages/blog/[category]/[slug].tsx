import { Flex } from "@chakra-ui/react"
import React from "react"
import Blog from "../../../components/blog/Blog"
import { fetchAPI, getApiUrl } from "../../../lib/api"
import {
  getBlogPost,
  getIdsOfBlogs,
} from "../../../lib/server/fetching/getBlogPost"
import { BlogPost } from "../../../lib/types/JSON/parsed/parsedBlogs"
import qs from "qs"

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
  const queryString = qs.stringify(
    {
      populate: [ "blogCategories"],
    },

    {
      encodeValuesOnly: false,
    }
  )

  const res = await fetch(`${getApiUrl()}/api/blogs/?${queryString}`)
  const a = await res.json()

  // const articlesRes = await fetchAPI("/blogs", {
  //   urlParamsObject: {
  //     fields: ["slug", "blogCategories"],
  //     populate: {
  //       blogCategories: {
  //         populate: "slug",
  //       },
  //     },
  //     encodeValuesOnly: false,
  //   },
  // })

  const fin = []
  // * to each blog post we generate paths based on categories
  // * for example if post has two categories, it generates 2 paths.
  console.log(a, `${getApiUrl()}/api/blogs/?${queryString}`, "articlesRes")
  a.data.forEach((article) => {
    const { slug, blogCategories } = article.attributes
    console.log(article, "pozno")
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
  const blogIds = await getIdsOfBlogs()

  return {
    props: { blogData, category: params.category, blogIds },
    revalidate: 1,
  }
}

export default article
