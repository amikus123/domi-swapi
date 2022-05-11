import { Flex } from "@chakra-ui/react"
import React from "react"
import Blog from "../../../components/blog/Blog"
import {
  getBlogPost,
  getIdsOfBlogs,
} from "../../../lib/server/fetching/getBlogPost"
import { BlogPost } from "../../../lib/types/JSON/parsed/parsedBlogs"
import { geStaticBlogPaths } from "../../../lib/server/fetching/getStaticPaths"

interface BlogPostProps {
  category: string
  blogData: BlogPost
  blogIds: Record<number, boolean>
}
const article = ({ blogData, category, blogIds }: BlogPostProps) => {
  return (
    <>
      {blogData === undefined ? null : (
        <Blog data={blogData} category={category} blogIds={blogIds} />
      )}
    </>
  )
}
//aa
export async function getStaticPaths() {
  const paths = await geStaticBlogPaths()
  return {
    paths,
    fallback: true,
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
