import { Stack, Heading, Text, Box } from "@chakra-ui/react"
import React from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import { AttributionProps } from "./Atrribution"
import MyNextImage, { FullWidthImage } from "../image"
import BlogContent from "./content/BlogContent"
import BlogMainImage from "./BlogMainImage"
interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  image: any
  attribution: AttributionProps
}

interface BlogProps {
  data: BlogPost
}

const Blog = ({ data }: BlogProps) => {
  const { attribution, content, date, description, image, title } = data

  const { formats } = image.data.attributes

  // content paragraphs should have margin of 2 em
  return (
    <Box maxW="60vw">
      <Stack
        spacing={8}
        justify="flex-start"
        align="center"
        w="100%"
        textAlign="left"
        p="6"
      >
        <Heading>{title}</Heading>
        <Text w="100%" fontSize="2xl" color="gray.600">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </Text>
        <BlogMainImage  image={image} attributionData={attribution}/>
        <BlogContent data={content} />
      </Stack>
    </Box>
  )
}

export default Blog
