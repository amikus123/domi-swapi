import { Stack, Heading, Text, Box } from "@chakra-ui/react"
import React from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  mainImage: any
}

interface BlogProps {
  data: BlogPost
}

const Blog = ({ data }: BlogProps) => {
  const { content, date, description, mainImage, title } = data

  // content paragraphs should have margin of 2 em
  return (
    //
    <Box m={3} maxW="700px">
      <Stack
        justify="flex-start"
        align="center"
        w="100%"
        textAlign="left"
        spacing={0}
      >
        <Heading w="100%">{title}</Heading>
        <Text as="span" w="100%" fontSize="2xl" color="gray.600" pt={4}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </Text>
        <BlogDescriptionImage
          // margin={0}
          image={mainImage.image}
          text={mainImage.description}
        />
        <BlogContent data={content} />
      </Stack>
    </Box>
  )
}

export default Blog
