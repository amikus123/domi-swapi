import React from "react"
import Blog from "../components/blog/Blog"
import { fetchAPI } from "../lib/api"
import { Flex } from "@chakra-ui/react"
import BlogCard from "../components/blog/BlogCard/BlogCard"

const blog = ({ blogData }) => {
  return (
    <>
      {/* <BlogCard  data={blogData.data.attributes}/> */}
      
      <Flex maxW="700px" mx="auto" my={4}>
        <Blog data={blogData.data.attributes} />
      </Flex>
    </>
  )
}

export default blog

export async function getServerSideProps() {
  const imageData = await fetchAPI("/blogs/1", {
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
    props: {
      blogData: imageData,
    },
  }
}
