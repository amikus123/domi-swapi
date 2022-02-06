import React from "react"
import {  Heading, Text, Box } from "@chakra-ui/react"

import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BMQuote from "../../Markdown/Blog/BMQuote"
import BMHeading from "../../Markdown/Blog/BMHeading"
import BMParagraph from "../../Markdown/Blog/BMParagraph"
import BMLink from "../../Markdown/Blog/BMLink"

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
        }
      }}
    >
      <ReactMarkdown
        components={{
          h1: BMHeading,
          blockquote:BMQuote,
          p:BMParagraph,
          a:BMLink
        }}
        rehypePlugins={[rehypeRaw]}
      >
        {text}
      </ReactMarkdown>
    </Box>
  )
}

export default BlogText
