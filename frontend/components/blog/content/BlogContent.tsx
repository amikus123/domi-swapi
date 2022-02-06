import { Box, Stack } from "@chakra-ui/react"
import React from "react"
import BlogDescriptionImage from "./BlogDescriptionImage"
import BlogSeparator from "./BlogSeparator"
import BlogText from "./BlogText"

interface BlogContentProps {
  data: any[]
}

const contentTypes = {
  "blog.text": "blog.text",
  "blog.separator": "blog.separator",
  "blog.image": "blog.image",
  "blog.description-image": "blog.description-image",
}
// based on  propetrt "__copmonents we returt deifferent element
{/*  */}
const BlogContent = ({ data }: BlogContentProps) => {
  const getElement = (obj: any) => {
    const property = obj["__component"]
    if (property === contentTypes["blog.description-image"]) {
      return <BlogDescriptionImage image={obj.image} text={obj.description} />
    } else if (property === contentTypes["blog.image"]) {
      return <BlogDescriptionImage image={obj.image} text={""}  />
    } else if (property === contentTypes["blog.text"]) {
      return <BlogText text={obj.text} />
    } else {
      return <BlogSeparator />
    }
  }
  return (
    <Stack>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {getElement(item)}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default BlogContent
