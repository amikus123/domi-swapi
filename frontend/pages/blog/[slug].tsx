import React from "react"
import Blog from "../../components/blog/Blog"
import { fetchAPI } from "../../lib/api"
import { Flex } from "@chakra-ui/react"

const blog = ({ blogData }) => {
  return (
    <Flex width="100%" mx="20" my={4}>
      <Blog data={blogData.attributes} />
    </Flex>
  )
}

export default blog

// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/blogs", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

// gets data for selected page
export async function getStaticProps({ params }) {
  const blogData = await fetchAPI(`/blogs/`, {
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
  })

  return {
    props: { blogData: blogData.data[0] },
    revalidate: 1,
  }
}
