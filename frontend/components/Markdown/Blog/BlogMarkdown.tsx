import React from "react"

import { Stack } from "@chakra-ui/react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BMLink from "./BMLink"
import BMParagraph from "./BMParagraph"
import BMQuote from "./BMQuote"
import {
  BMHeading1,
  BMHeading2,
  BMHeading3,
  BMHeading4,
  BMHeading5,
  BMHeading6,
} from "./BMHeading"
import { BMUnordedList } from "./BMLists"

interface BlogMarkdownProps {
  text: string
  spacing?: number
}
const BlogMarkdown = ({ text, spacing = 0 }: BlogMarkdownProps) => {
  return (
    <Stack spacing={spacing}>
      <ReactMarkdown
        components={{
          h1: BMHeading1,
          h2: BMHeading2,
          h3: BMHeading3,
          h4: BMHeading4,
          h5: BMHeading5,
          h6: BMHeading6,
          blockquote: BMQuote,
          p: BMParagraph,
          a: BMLink,
          ul: BMUnordedList,
        }}
        rehypePlugins={[rehypeRaw]}
      >
        {text}
      </ReactMarkdown>
    </Stack>
  )
}

export default BlogMarkdown
