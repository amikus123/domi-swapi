import { Stack, Heading, Text, Box } from "@chakra-ui/react"
import React from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
export interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  mainImage: any
  blogCategories: any[]
}

interface BlogProps {
  data: BlogPost
}

const Blog = ({ data }: BlogProps) => {
  const { content, date, description, mainImage, title, blogCategories } = data
  return (
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
        <BlogTags blogCategories={blogCategories} />
        <BlogDescriptionImage
          margin={0}
          image={mainImage.image}
          text={mainImage.description}
        />
        <BlogContent data={content} />
        <SocialRow/>
      </Stack>
  )
}

export default Blog
