import { Stack, Heading, Text } from "@chakra-ui/react"
import React from "react"
import ReactMarkdown from "react-markdown"
import { PossibleData } from "./Atrribution"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism"

import remarkGfm from "remark-gfm"

interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  image: any
  attribution: PossibleData
}

interface BlogProps {
  data: BlogPost
}

const Blog = ({ data }: BlogProps) => {
  const { attribution, content, date, description, image, title } = data
  return (
    <Stack spacing={8}>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Text>
        
        <ReactMarkdown
          source={description}
          escapeHtml={false}
          plugins={[remarkGfm]}
        />
      </Text>
    </Stack>
  )
}

export default Blog
