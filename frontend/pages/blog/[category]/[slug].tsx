import { Flex } from "@chakra-ui/react"
import React from "react"
import Blog from "../../../components/blog/Blog"
import { fetchAPI } from "../../../lib/api"

const article = ({ blogData }) => {
  return (
    <Flex width="100%" mx="20" my={4}>
      <Blog data={blogData.attributes} />
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
  const blogData = await fetchAPI(`/blogs/`, {
    urlParamsObject: {
      filters: {
        slug: params.slug,
      },
      populate: {
        populate: "*",
        mainImage: {
          populate: "*",
        },
        cardData: {
          populate: "*",
        },
        blogCategories: {
          populate: "",
        },
        content: {
          populate: {
            image: "*",
          },
        },
      },
      encodeValuesOnly: true,
    },
  })

  return {
    props: { blogData: blogData.data[0] },
    revalidate: 1,
  }
}

export default article
