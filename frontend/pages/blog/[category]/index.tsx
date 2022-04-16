import React from "react"
import { Divider, Heading, Stack } from "@chakra-ui/react"
import { fetchAPI } from "../../../lib/api"
import CategoryBreadcrumbs from "../../../components/blog/Categories/CategoryBreadcrumbs"
import BlogCardWide from "../../../components/blog/BlogCard/BlogCardWide"
import { getBlogFromCategory } from "../../../lib/server/fetching/serverSide"
import { CategoryBlogPost } from "../../../lib/server/jsonParsers/parseBlogCategoryPosts"
import { capitalize } from "lodash"

interface BlogCategoryPostsProps {
  relatedBlogs: CategoryBlogPost[]
  category: string
}

const blog = ({ relatedBlogs, category }: BlogCategoryPostsProps) => {
  return (
    <Stack width="100%" mx="20" my={4} spacing={8}>
      <CategoryBreadcrumbs
        links={[
          { href: "/blog/", name: "Kategorie" },
          { href: `/blog/${category}`, name: category },
        ]}
      />

      <Heading textAlign="center"> {capitalize(category)}</Heading>

      {relatedBlogs.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <BlogCardWide data={item} category={category} />

            {index === relatedBlogs.length-1 ? null : <Divider />}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default blog

// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/blog-categories/", {
    urlParamsObject: { fields: ["slug"] },
  })
  const a = articlesRes.data
  a.forEach((x) => {
    console.log(x.attributes, "xd ")
  })
  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        category: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

// gets data for selected page
export async function getStaticProps({ params }) {
  const { category } = params
  const relatedBlogs = await getBlogFromCategory(category)
  return {
    props: { relatedBlogs, category },
    revalidate: 1,
  }
}
