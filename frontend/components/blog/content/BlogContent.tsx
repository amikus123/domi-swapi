import { Stack } from "@chakra-ui/react"
import React from "react"
import { BlogContent } from "../../../lib/types/JSON/parsed/parsedBlogs"
import BlogDescriptionImage from "./BlogDescriptionImage"
import BlogSeparator from "./BlogSeparator"
import BlogText from "./BlogText"

interface BlogContentProps {
  data: BlogContent[]
}

// based on  propetrt "__copmonents we return  diffrent element

const BlogContentElement = ({ data }: BlogContentProps) => {
  const getElement = (obj: BlogContent) => {
    const { __component: property, description, image, text } = obj
    if (property === "blog.description-image") {
      return (
        <BlogDescriptionImage image={image} text={description} height={400} />
      )
    } else if (property === "blog.image") {
      return <BlogDescriptionImage image={image} text={text} height={400} />
    } else if (property === "blog.text") {
      return <BlogText text={text} />
    } else {
      return <BlogSeparator />
    }
  }
  return (
    <Stack>
      {data.map((item, index) => {
        return <React.Fragment key={index}>{getElement(item)}</React.Fragment>
      })}
    </Stack>
  )
}

export default BlogContentElement
