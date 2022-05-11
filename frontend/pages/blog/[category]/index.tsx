import React from "react"
import { Button, Divider, Heading, Stack } from "@chakra-ui/react"
import { fetchAPI, getApiUrl } from "../../../lib/api"
import CategoryBreadcrumbs from "../../../components/blog/Categories/CategoryBreadcrumbs"
import BlogCardWide from "../../../components/blog/BlogCard/BlogCardWide"
import { capitalize } from "lodash"
import NextLink from "next/link"
import { getBlogCardsFromCategory } from "../../../lib/server/fetching/getBlogCategories"
import { BlogCardFull } from "../../../lib/types/JSON/parsed/parsedBlogs"
import qs from "qs"

interface BlogCategoryPostsProps {
  relatedBlogs: BlogCardFull[]
  category: string
}

const blog = ({ relatedBlogs, category }: BlogCategoryPostsProps) => {
  return (
    <Stack
      width="100%"
      mx="20"
      maxW={1000}
      my={4}
      pb={4}
      spacing={8}
      display="flex"
    >
      ~
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
            <BlogCardWide data={item} categorySlug={category} fullW={true} />

            {index === relatedBlogs.length - 1 ? null : <Divider />}
          </React.Fragment>
        )
      })}
      <Button
        w="60"
        colorScheme="teal"
        size="lg"
        justifySelf="center"
        alignSelf="center"
      >
        <NextLink href="/blog/">Sprawdź inne kategorie</NextLink>
      </Button>
    </Stack>
  )
}

export default blog
const a = "https://domi-strapi.herokuapp.com/uploads/photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg?updated_at=2022-05-11T13:44:37.175Z"
// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  // const articlesRes = await fetchAPI("/blog-categories/", {
  //   urlParamsObject: { fields: ["slug"] },
  // })

  const queryString = qs.stringify(
    {
    },

    {
      encodeValuesOnly: false,
    }
  )

  const res = await fetch(`${getApiUrl()}/api/blog-categories/?${queryString}`)
  const as = await res.json()

  return {
    paths: as.data.map((article) => ({
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
  const relatedBlogs = await getBlogCardsFromCategory(category)

  
  return {
    props: { relatedBlogs, category },
    revalidate: 1,
  }
}
