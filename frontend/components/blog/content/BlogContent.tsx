import { Box } from "@chakra-ui/react"
import React from "react"
import BlogDescriptionImage from "./BlogDescriptionImage"
import BlogSeparator from "./BlogSeparator"
import BlogText from "./BlogText"
import BlogQuote from "./BlogQuoete"
interface BlogContentProps {
  data: any[]
}

const contentTypes = {
  "blog.text": ":blog.text",
  "blog.separator": "blog.separator",
  "blog.quote": "blog.quote",
  "blog.description-image": "blog.description-image",
}
// based on  propetrt "__copmonents we returt deifferent element
const BlogContent = ({ data }: BlogContentProps) => {
  const getElement = (obj: any) => {
    const property = obj["__component"]
    if (property === contentTypes["blog.description-image"]) {
        return <BlogDescriptionImage  />
    } else if (property === contentTypes["blog.quote"]) {
      return  <BlogQuote text={obj.text}/>
    } else if (property === contentTypes["blog.text"]) {
      return   <BlogText text={obj.text}/>
    } else {
    return <BlogSeparator/>
    }
  }
  return (
    <div>
      {/* {data.map((item, key) => {
        return <Box key={key}>{getElement(item)}</Box>
      })} */}
    </div>
  )
}

export default BlogContent
