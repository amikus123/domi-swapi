import React from "react"
import { Box } from "@chakra-ui/react"
import BlogMarkdown from "../../Markdown/Blog/BlogMarkdown"

interface BlogTextProps {
  text: string
}
const BlogText = ({ text }: BlogTextProps) => {
  return (
    <Box
      w="100%"
      fontSize="2xl"
      css={{
        "> *": {
          marginTop: "1.5rem",
        },
      }}
    >
      <BlogMarkdown text={text} />
    </Box>
  )
}

export default BlogText
